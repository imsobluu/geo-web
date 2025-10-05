# Copilot instructions for this repo

This is a T3 Stack project bootstrapped with create-t3-app, featuring Next.js App Router, TypeScript, Tailwind CSS v4, tRPC, shadcn/ui, and Biome for linting and formatting. It uses class-variance-authority + Radix Slot for UI patterns. Use the ~ path alias for imports from src.

## Architecture & routing

-   Entry: Next.js App Router with `src/app/layout.tsx` as root layout and `src/app/page.tsx` as homepage.
-   Routes live in `src/app` using the file-system based routing. Create folders for route segments.
-   Add a page by creating `src/app/<segment>/page.tsx` exporting a default React component.
-   Use `layout.tsx` files for shared UI between route segments.
-   Server Components by default, use `"use client"` directive for client components when needed.
-   API routes in `src/app/api` folder, following Next.js App Router conventions.

## Project layout, naming, and React conventions

-   App directory: `src/app`. Each subdirectory = route path with `page.tsx` files.
    -   Example: `src/app/about/page.tsx` => `/about`.
    -   Use `layout.tsx` for shared layouts, `loading.tsx` for loading UI, `error.tsx` for error boundaries.
-   Page-scoped components: `src/app/<segment>/_components/<ComponentName>.tsx` (underscore prefix prevents routing).
-   Shared components: `src/components/<domain>/<ComponentName>.tsx`.
    -   Existing example: `src/components/ui/button.tsx` (shared components use PascalCase filenames).
-   Server-side code: `src/server` folder containing API logic, database connections, and tRPC routers.
    -   tRPC routers: `src/server/api/routers/<RouterName>.ts`
    -   Database/auth logic: `src/server/auth.ts`, `src/server/db.ts`
-   tRPC client setup: `src/trpc` folder for React Query integration and server/client utilities.
-   Types local to a page: `src/app/<segment>/types.ts`; shared types: `src/types/<Name>.ts`.
-   Naming: React components and their files/directories use PascalCase, descriptive names.
-   Follow T3 Stack patterns: Server Components by default, tRPC for type-safe APIs, functional components + hooks.

## Styling & UI patterns

-   Tailwind v4 with design tokens in `src/styles/globals.css` and config in `tailwind.config.ts`.
    -   Use tokens like `bg-background`, `text-foreground`, and `dark` class for dark mode.
-   Reusable UI uses `cva` for variants and `cn` from `src/lib/utils.ts` for class merging.
    -   Import pattern: `import { Button } from "~/components/ui/button"`.
    -   Define component variants with `cva(...)` and export `VariantProps<typeof variants>` when needed.
-   shadcn/ui components are pre-configured and can be added using `pnpm dlx shadcn@latest add <component>`.

## Imports, TS, and linting

-   Path alias: `~` => `src` (configured in `tsconfig.json`). Prefer alias imports (e.g., `~/lib/utils`).
-   TypeScript is strict (no unused locals/params). Fix or prefix with `_` if intentionally unused.
-   Biome handles linting and formatting (replaces ESLint + Prettier). Use `pnpm run check` for linting, `pnpm run check:write` to auto-fix.
-   Environment variables are validated with `@t3-oss/env-nextjs` in `src/env.js`.

## Dev workflows

-   Start: `pnpm dev` (Next.js development server with Turbopack).
-   Build: `pnpm build` (Next.js production build).
-   Preview: `pnpm preview` (build + start production server).
-   Type check: `pnpm typecheck` (TypeScript compilation check).
-   Lint: `pnpm check` (Biome linting).
-   Format: `pnpm check:write` (Biome auto-fix and format).

## tRPC & API patterns

-   Type-safe APIs using tRPC. Server procedures defined in `src/server/api/routers/`.
-   Create new routers in `src/server/api/routers/<name>.ts` and export from `src/server/api/root.ts`.
-   Use `publicProcedure` for public endpoints, extend with auth for protected routes.
-   Client usage: Import `api` from `~/trpc/react` for React components, `~/trpc/server` for Server Components.
-   Mutations automatically revalidate queries. Use React Query patterns for optimistic updates.

## Server-side patterns

-   Server Components: Use `~/trpc/server` to call tRPC procedures directly on the server.
-   Server Actions: Define server functions with `"use server"` directive for form handling.
-   Database: Access via `src/server/db.ts` (Prisma) or `src/server/db/index.ts` (Drizzle).
-   Authentication: Configure in `src/server/auth.ts`, access via `getServerSession()` or similar.

## Examples

-   New route: create `src/app/about/page.tsx` exporting a default component (no manual routing needed).
-   New tRPC router: create `src/server/api/routers/posts.ts`, export from `src/server/api/root.ts`.
-   Shared component: `src/components/forms/TextField.tsx` exporting `function TextField(...) { ... }` and import via `~/components/forms/TextField`.
-   Client component with tRPC: `"use client"` + `api.posts.getAll.useQuery()` from `~/trpc/react`.
-   Server component with tRPC: `await api.posts.getAll()` from `~/trpc/server`.

If any section is unclear or you want stricter rules (e.g., code-splitting routes), tell me and I’ll refine these instructions.
