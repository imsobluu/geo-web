---
applyTo: "**/env.js"
---

# Environment & Configuration Patterns

This file covers environment variable validation, configuration management, and tooling setup for this T3 Stack project.

## Environment Variable Validation

**Structure** (`src/env.js`):
- Uses `@t3-oss/env-nextjs` + Zod for runtime validation
- Separates server vs client variables
- Prevents invalid builds with type safety

**Server variables** (never exposed to client):
```js
server: {
  NODE_ENV: z.enum(["development", "test", "production"]),
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string(),
}
```

**Client variables** (must have `NEXT_PUBLIC_` prefix):
```js
client: {
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_GISTDA_API_KEY: z.string(),
}
```

**Runtime mapping** (required for Next.js edge compatibility):
```js
runtimeEnv: {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_GISTDA_API_KEY: process.env.NEXT_PUBLIC_GISTDA_API_KEY,
}
```

## Usage Patterns

**Import and use**:
```ts
import { env } from "~/env";

// Type-safe access
const isDev = env.NODE_ENV === "development";
const apiUrl = env.NEXT_PUBLIC_APP_URL;
const gistdaApiKey = env.NEXT_PUBLIC_GISTDA_API_KEY;
```

**Validation benefits**:
- Build fails if required env vars missing
- Type safety prevents typos
- Clear separation of server/client variables
- Runtime validation in all environments

## Biome Configuration

**Setup** (`biome.jsonc`):
- Replaces ESLint + Prettier for better performance
- Handles linting, formatting, and import sorting
- Includes Tailwind class sorting

**Key features**:
```jsonc
{
  "linter": {
    "rules": {
      "nursery": {
        "useSortedClasses": {
          "options": { "functions": ["clsx", "cva", "cn"] }
        }
      }
    }
  }
}
```

**Commands**:
- `pnpm check` - Check for issues
- `pnpm check:write` - Auto-fix issues
- `pnpm check:unsafe` - Apply unsafe fixes

## TypeScript Configuration

**Path aliases** (`tsconfig.json`):
```json
{
  "baseUrl": ".",
  "paths": { "~/*": ["./src/*"] }
}
```

**Strict mode enabled**:
- `strict: true` - Maximum type safety
- `noUncheckedIndexedAccess: true` - Array access safety
- `checkJs: true` - Validate JavaScript files

## Development Tools

**Package scripts**:
```json
{
  "dev": "next dev --turbo",     # Turbopack for faster builds
  "build": "next build",         # Production build
  "typecheck": "tsc --noEmit",   # Type checking only
  "preview": "next build && next start"  # Test production build
}
```

**Key dependencies**:
- Next.js 15+ with React 19
- tRPC v11 with React Query integration
- Tailwind CSS v4 (latest)
- shadcn/ui components

## Configuration Best Practices

1. **Environment variables**: Always validate new env vars in `src/env.js`
2. **Type safety**: Use strict TypeScript settings
3. **Linting**: Run `pnpm check` before commits
4. **Path aliases**: Use `~/` prefix for src imports
5. **ESM modules**: Project uses `"type": "module"` in package.json

## Common Configuration Tasks

**Adding new env var**:
1. Add to appropriate section in `src/env.js`
2. Update `runtimeEnv` mapping
3. Add to `.env.example` file
4. Type will be automatically inferred

**GISTDA API Key Setup**:
1. Get API key from https://sphere.gistda.or.th/
2. For testing, use "test2022"
3. Add to `.env`: `NEXT_PUBLIC_GISTDA_API_KEY="your-key"`
4. Import in components: `import { env } from "~/env"`
5. Use: `env.NEXT_PUBLIC_GISTDA_API_KEY`

**Adding new shadcn component**:
```bash
pnpm dlx shadcn@latest add [component-name]
```

**Updating Biome rules**:
- Modify `biome.jsonc` configuration
- Run `pnpm check:write` to apply changes
- Biome handles both linting and formatting