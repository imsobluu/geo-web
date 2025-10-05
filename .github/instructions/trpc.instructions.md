---
applyTo: "**/server/api/**/*.ts"
---

# tRPC Server Development Patterns

This file covers tRPC-specific patterns for building type-safe APIs in this T3 Stack project.

## Router Architecture

**Main router structure** (`src/server/api/root.ts`):
```ts
export const appRouter = createTRPCRouter({
  post: postRouter,
  // Add new routers here
});
export type AppRouter = typeof appRouter;
```

**Feature routers** (`src/server/api/routers/[feature].ts`):
- Import `createTRPCRouter, publicProcedure` from `~/server/api/trpc`
- Use Zod for input validation: `.input(z.object({...}))`
- Export named router: `export const postRouter = createTRPCRouter({...})`

## Procedure Patterns

**Query procedures** (data fetching):
```ts
getAll: publicProcedure.query(async () => {
  // Return data directly, no input needed
  return await db.posts.findMany();
}),

getById: publicProcedure
  .input(z.object({ id: z.number() }))
  .query(async ({ input }) => {
    return await db.posts.findUnique({ where: { id: input.id } });
  }),
```

**Mutation procedures** (data modification):
```ts
create: publicProcedure
  .input(z.object({ name: z.string().min(1) }))
  .mutation(async ({ input }) => {
    return await db.posts.create({ data: input });
  }),
```

## Middleware Usage

**Timing middleware** (already configured):
- Adds artificial delay in development (100-500ms)
- Logs execution time: `[TRPC] posts.getAll took 156ms`
- Helps identify request waterfalls during development

**Custom middleware** example:
```ts
const authMiddleware = t.middleware(async ({ next, ctx }) => {
  // Add auth logic here
  return next({ ctx: { ...ctx, user: authenticatedUser } });
});

const protectedProcedure = publicProcedure.use(authMiddleware);
```

## Type Safety Patterns

**Input validation** with Zod:
- Always validate inputs: `.input(z.object({...}))`
- Use refinements for complex validation: `.refine((data) => ...)`
- Leverage TypeScript inference from Zod schemas

**Output types** automatically inferred:
- Router outputs typed from return values
- Use `RouterOutputs` type for client-side typing
- Database models automatically propagate types

## Server vs Client Usage

**Server Components** (`~/trpc/server`):
```ts
import { api } from "~/trpc/server";

export default async function Page() {
  const posts = await api.post.getAll();
  // Direct async calls, no hooks
}
```

**Client Components** (`~/trpc/react`):
```ts
"use client";
import { api } from "~/trpc/react";

export function ClientComponent() {
  const { data } = api.post.getAll.useQuery();
  const createPost = api.post.create.useMutation();
  // React Query hooks for state management
}
```

## Development Workflow

1. **Create router**: `src/server/api/routers/[feature].ts`
2. **Export from root**: Add to `src/server/api/root.ts`
3. **Types auto-update**: No manual type exports needed
4. **Test in components**: Server or client usage patterns
5. **Monitor timing**: Watch console for performance insights

## Common Patterns

**Optimistic updates**:
```ts
const utils = api.useUtils();
const createPost = api.post.create.useMutation({
  onSuccess: () => utils.post.getAll.invalidate(),
});
```

**Prefetching** (Server Components):
```ts
void api.post.getAll.prefetch(); // Prefetch for client hydration
```

**Error handling**:
- Server: Throw `TRPCError` with appropriate codes
- Client: Handle via React Query error states
- Development: Errors logged to console automatically