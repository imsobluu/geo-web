# T3 Stack Copilot Instructions

This is a T3 Stack project featuring Next.js App Router, TypeScript, tRPC, Tailwind CSS v4, shadcn/ui, and Biome. Built for type-safe, full-stack development with modern React patterns.

## Architecture Overview

**Core Stack:**
- **Next.js App Router** (`src/app/`) - File-system routing, Server Components by default
- **tRPC** (`src/server/api/`, `src/trpc/`) - Type-safe APIs with React Query integration
- **TypeScript** - Strict mode enabled, `~/*` import alias for `src/*`
- **Tailwind CSS v4** + **shadcn/ui** - Utility-first styling with pre-built components
- **Biome** - Fast linting and formatting (replaces ESLint + Prettier)

**Key Directories:**
```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage (Server Component)
│   ├── layout.tsx         # Root layout with providers
│   ├── _components/       # Page-specific components
│   └── api/trpc/[trpc]/   # tRPC API route handler
├── server/
│   └── api/
│       ├── root.ts        # Main tRPC router
│       ├── trpc.ts        # tRPC configuration
│       └── routers/       # Feature-specific routers
├── trpc/
│   ├── server.ts          # Server-side tRPC client
│   ├── react.tsx          # Client-side tRPC provider
│   └── query-client.ts    # React Query configuration
├── components/ui/         # shadcn/ui components
├── lib/utils.ts          # Utility functions (cn, etc.)
└── env.js                # Environment variable validation
```

## Critical Patterns

### Server vs Client Components
- **Server Components** (default): Direct tRPC calls via `~/trpc/server`, no React hooks
- **Client Components**: Require `"use client"`, use `~/trpc/react` for queries/mutations
- Example Server Component: `src/app/page.tsx` - calls `await api.post.hello()`
- Example Client Component: `src/app/_components/post.tsx` - uses `api.post.getLatest.useSuspenseQuery()`

### tRPC Integration
- **Server routers**: Define in `src/server/api/routers/`, export from `src/server/api/root.ts`
- **API endpoint**: `src/app/api/trpc/[trpc]/route.ts` handles all tRPC requests
- **Type safety**: Router types auto-inferred, shared between client/server
- **Middleware**: Built-in timing middleware adds artificial dev delay for waterfall detection

### Environment & Configuration
- **Environment variables**: Validated in `src/env.js` using `@t3-oss/env-nextjs` + Zod
- **TypeScript**: Configured with strict mode, `~/*` alias, ESM modules
- **Biome**: Handles linting/formatting, includes Tailwind class sorting

## Development Workflows

**Essential Commands:**
```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Production build
pnpm check        # Biome linting
pnpm check:write  # Auto-fix linting issues
pnpm typecheck    # TypeScript compilation check
```

**Adding Features:**
1. **New page**: Create `src/app/[route]/page.tsx` (auto-routes)
2. **New API**: Add router to `src/server/api/routers/`, export from `root.ts`
3. **New component**: Use shadcn/ui (`pnpm dlx shadcn@latest add <component>`) or create custom in `src/components/`

**tRPC Development Pattern:**
1. Define procedures in router with Zod input validation
2. Server Components: `await api.router.procedure()`
3. Client Components: `api.router.procedure.useQuery()`
4. Mutations: `api.router.procedure.useMutation()` with optimistic updates

## Integration Points

**tRPC Provider Setup** (`src/app/layout.tsx`):
- Root layout wraps children with `TRPCReactProvider`
- Enables React Query integration and SSR hydration

**API Route Handler** (`src/app/api/trpc/[trpc]/route.ts`):
- Single endpoint handles all tRPC procedures
- Configured with error logging in development
- Uses `fetchRequestHandler` for App Router compatibility

**Key Files for AI Understanding:**
- `src/server/api/trpc.ts` - Core tRPC configuration, middleware, procedures
- `src/trpc/server.ts` - Server-side tRPC client with RSC integration
- `src/trpc/react.tsx` - Client-side provider with React Query setup
- `src/app/_components/post.tsx` - Example client component with mutations
- `src/server/api/routers/post.ts` - Example router with query/mutation patterns

This architecture enables type-safe, full-stack development with automatic API generation, optimized performance through Server Components, and excellent DX with hot reloading and type checking.
