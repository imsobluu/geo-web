---
applyTo: "**/*.tsx"
---

React component conventions (project-aware)

Context

-   Stack: T3 Stack with Next.js App Router, React + TypeScript (strict), tRPC, Tailwind CSS v4, shadcn/ui. Alias `~/* -> src/*` (see `tsconfig.json`).
-   Router: Next.js App Router with file-system based routing in `src/app`.
-   UI set in `src/components/ui/*` follows shadcn/ui patterns using `cn` from `~/lib/utils`.
-   Server Components by default, use `"use client"` directive for client components.

1. Naming and placement

-   Pages: `src/app/<route>/page.tsx`
    -   Component must be named `Page` and exported default.
    -   File-system routing: `src/app/about/page.tsx` automatically creates `/about` route.
    -   Use `layout.tsx` for shared layouts, `loading.tsx` for loading UI, `error.tsx` for error boundaries.
    -   Server Components by default - add `"use client"` at top if client-side features needed.
-   Page-specific components: `src/app/<route>/_components/<ComponentName>.tsx`
    -   Use underscore prefix to prevent routing. PascalCase, descriptive, default export.
-   Shared components: `src/components/<ComponentName>.tsx`
    -   PascalCase, descriptive, default export (e.g., `Card`, `Header`). One component per file.
-   Exception: `src/components/ui/*` may keep named exports (e.g., `Button`, `buttonVariants`). Do not refactor shadcn/ui files.

2. Props and file layout

-   Declare the props type at the very top and name it exactly `Props`.
-   If props are shared externally, move them to `types.ts` in the component folder; otherwise keep `Props` local.
-   Do NOT nest helper functions, subcomponents, or additional types in the main component file:
    -   Component-local helpers → `./utils.ts` in the component folder.
    -   Shared helpers → `src/lib/*.ts` and import via `~/lib/...`.
    -   Subcomponents → separate `.tsx` files in same folder or `_components` subfolder.

3. Styling and classNames

-   Use Tailwind utilities. Compose conditional classes with `cn(...)` from `~/lib/utils` (see `src/components/ui/button.tsx`).

4. Imports/exports

-   Prefer alias imports `~/...` over deep relatives.
-   Server Components: Import tRPC via `~/trpc/server`, Client Components: Import via `~/trpc/react`.
-   Default export for pages and regular components. Keep named exports in `ui/` as-is.

5. T3 Stack specific patterns

-   **Server Components** (default): Can directly call tRPC procedures, access database, read env vars.
    -   Use `await api.posts.getAll()` from `~/trpc/server`
    -   No React hooks, no browser APIs, no event handlers
-   **Client Components**: Need `"use client"` directive, can use React hooks and browser APIs.
    -   Use `api.posts.getAll.useQuery()` from `~/trpc/react`
    -   Required for interactivity, state, effects, event handlers
-   **tRPC patterns**: 
    -   Queries: `api.posts.getAll.useQuery()` (client) or `await api.posts.getAll()` (server)
    -   Mutations: `api.posts.create.useMutation()` (client only)
-   **Environment variables**: Access via `env` object from `~/env`

6. Minimal skeletons (copy-paste)

-   Server Component Page
    -   `interface Props {}` at top
    -   `export default function Page(_: Props) { return <div className="min-h-screen" /> }`
-   Client Component Page
    -   `"use client"` at very top
    -   `interface Props {}` 
    -   `export default function Page(_: Props) { return <div className="min-h-screen" /> }`
-   Component
    -   `interface Props { className?: string }`
    -   `export default function Card({ className }: Props) { return <div className={cn("rounded", className)} /> }`

Repo references

-   Page example: `src/app/page.tsx` (homepage).
-   Page-specific component: `src/app/_components/post.tsx`.
-   UI example: `src/components/ui/button.tsx` (shadcn/ui + Tailwind + `cn`, named exports allowed in `ui/`).
-   tRPC usage: Server Components use `~/trpc/server`, Client Components use `~/trpc/react`.
