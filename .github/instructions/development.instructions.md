---
applyTo: "**/*"
---

# Development Workflows & Debugging

This file covers essential development workflows, debugging techniques, and common troubleshooting patterns for this T3 Stack project.

## Development Workflow

**Starting development**:
```bash
pnpm dev  # Starts Next.js with Turbopack (faster than Webpack)
```

**Code quality checks**:
```bash
pnpm check        # Biome linting and formatting check
pnpm check:write  # Auto-fix linting/formatting issues
pnpm typecheck    # TypeScript compilation check
```

**Production testing**:
```bash
pnpm preview      # Build and start production server locally
```

## Debugging Patterns

**tRPC request debugging**:
- Development console shows: `[TRPC] posts.getAll took 156ms to execute`
- Artificial delays (100-500ms) help identify request waterfalls
- Check Network tab for `/api/trpc` requests

**Server vs Client debugging**:
- Server Component errors: Check terminal/server console
- Client Component errors: Check browser console
- Hydration mismatches: Look for SSR/client content differences

**Environment variable issues**:
- Build fails if required env vars missing (good!)
- Check `src/env.js` for validation schema
- Use `env.VARIABLE_NAME` not `process.env.VARIABLE_NAME`

## Common Issues & Solutions

**"use client" directive placement**:
```ts
"use client"; // Must be at very top of file
import { useState } from "react";
// Component code...
```

**tRPC type errors**:
- Restart TypeScript server if types seem stale
- Check router is exported from `src/server/api/root.ts`
- Verify input Zod schemas match usage

**Import alias issues**:
- Use `~/` not `@/` for src imports
- Configure editors to recognize `~/*` alias
- Check `tsconfig.json` paths configuration

## Performance Optimization

**React Query caching** (automatic with tRPC):
- Queries cached by default
- Mutations invalidate related queries
- Use `prefetch` for Server Component data

**Server Component benefits**:
- Zero client JavaScript for data fetching
- Direct database/API access
- Better Core Web Vitals scores

**Bundle optimization**:
- Server Components reduce client bundle size
- Dynamic imports for heavy client components
- shadcn/ui components are tree-shakable

## Testing Workflows

**API testing** (manual):
1. Add console.log in tRPC procedures
2. Call from Server Component: `await api.post.getAll()`
3. Call from Client Component: `api.post.getAll.useQuery()`
4. Check timing logs and data structure

**Component testing**:
- Server Components: Test data rendering
- Client Components: Test interactivity and state
- Use React DevTools for component inspection

## Hot Reloading

**What triggers reloads**:
- File changes in `src/` directory
- Environment variable changes (restart required)
- Configuration changes (restart required)

**Turbopack benefits**:
- Faster than Webpack for development
- Better error messages and stack traces
- Optimized for Next.js App Router

## Production Deployment

**Build process**:
```bash
pnpm build  # Validates types, env vars, and creates optimized build
```

**Build validation**:
- TypeScript compilation must pass
- Environment variables must be valid
- tRPC procedures must be properly typed

**Common deployment issues**:
- Missing environment variables in production
- Database connection issues
- API route configuration problems

## Monitoring & Logging

**Development logging**:
- tRPC execution times in console
- Error boundaries catch component errors
- Biome reports code quality issues

**Production considerations**:
- Error logging via tRPC onError handler
- Performance monitoring for API routes
- Type safety prevents many runtime errors