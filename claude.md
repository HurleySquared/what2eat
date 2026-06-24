# CLAUDE.md — What2Eat

## Project Overview

**What2Eat** is a full-stack web application built with Next.js (App Router), TypeScript, and Tailwind CSS. The project is located at `/Activities/what2eat`. Follow all instructions in this file when generating, modifying, or reviewing code.

---

## Tech Stack

| Layer          | Technology                        |
| -------------- | --------------------------------- |
| Framework      | Next.js 14+ (App Router)         |
| Language       | TypeScript (strict mode)         |
| Styling        | Tailwind CSS                     |
| Database       | MySQL                            |
| ORM            | Prisma                           |
| Authentication | NextAuth.js (Auth.js v5)         |
| Package Mgr    | npm                              |

---

## Project Structure

```
what2eat/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Migration history
│   └── seed.ts                # Seed data
├── public/                    # Static assets (images, icons)
├── src/
│   ├── app/                   # App Router (routes, layouts, pages)
│   │   ├── (auth)/            # Auth route group (login, register)
│   │   ├── (main)/            # Protected route group (dashboard, meals, recipes)
│   │   ├── api/               # API route handlers
│   │   │   └── auth/[...nextauth]/
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing / home page
│   │   └── globals.css        # Global styles & Tailwind directives
│   ├── components/
│   │   ├── ui/                # Reusable primitives (Button, Input, Modal, Card)
│   │   └── features/          # Feature-specific composed components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/
│   │   ├── auth.ts            # NextAuth config & helpers
│   │   ├── db.ts              # Prisma client singleton
│   │   ├── utils.ts           # General utility functions (cn, formatDate, etc.)
│   │   └── validations/       # Zod schemas for forms & API inputs
│   ├── types/                 # Shared TypeScript types & interfaces
│   └── styles/                # Additional style files if needed
├── .env.local                 # Local environment variables (never commit)
├── .env.example               # Template for required env vars
├── claude.md                  # This file — project rules & conventions
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json
```

---

## Code Style & Conventions

### General Rules

- Always use TypeScript. Never use `any` — use `unknown` and narrow the type instead.
- Prefer `const` over `let`. Never use `var`.
- Use named exports, not default exports (exception: Next.js pages/layouts require default exports).
- Keep files focused and under ~250 lines. Extract logic when a file grows beyond that.
- Use absolute imports via the `@/` alias (e.g., `import { Button } from "@/components/ui/Button"`).

### Naming Conventions

| Item               | Convention                  | Example                    |
| ------------------ | --------------------------- | -------------------------- |
| Components         | PascalCase                  | `UserProfile.tsx`          |
| Hooks              | camelCase, `use` prefix     | `useAuth.ts`               |
| Utilities          | camelCase                   | `formatDate.ts`            |
| Types/Interfaces   | PascalCase                  | `UserSession`              |
| Constants          | UPPER_SNAKE_CASE            | `MAX_RETRY_COUNT`          |
| Route files        | lowercase (Next.js default) | `page.tsx`, `layout.tsx`   |
| CSS classes        | Tailwind utilities only     | `className="flex gap-4"`   |
| Env variables      | UPPER_SNAKE_CASE            | `DATABASE_URL`             |

### File & Component Patterns

- One component per file. File name matches the component name.
- Colocate tests, types, and helpers with the feature when possible.
- Place shared types in `src/types/`. Place component-specific types at the top of the component file.

---

## React & Next.js Patterns

### Components

- Default to **Server Components**. Only add `"use client"` when the component needs interactivity, hooks, or browser APIs.
- Keep client components small and push them to the leaves of the component tree.
- Use the `children` prop for composition. Avoid deeply nested prop drilling — use React Context or server-side data fetching instead.

```tsx
// Prefer this pattern for interactive islands:
// ServerWrapper.tsx (server component)
export default function ServerWrapper() {
  const data = await getData();
  return <ClientInteractive initialData={data} />;
}

// ClientInteractive.tsx
"use client";
export function ClientInteractive({ initialData }: Props) { ... }
```

### Data Fetching

- Fetch data in **Server Components** using `async/await` directly.
- Use Next.js `fetch` with appropriate caching/revalidation options.
- For mutations, use **Server Actions** (`"use server"` functions).
- Validate all inputs with **Zod** before processing.

```tsx
// Server Action example
"use server";

import { z } from "zod";

const CreatePostSchema = z.object({
  title: z.string().min(1).max(200),
  body: z.string().min(1),
});

export async function createPost(formData: FormData) {
  const parsed = CreatePostSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten() };
  }

  // ... db operation
}
```

### Error Handling

- Use `error.tsx` boundary files for route-level error handling.
- Use `loading.tsx` or `<Suspense>` for loading states.
- Server Actions return `{ success, data?, error? }` result objects — never throw from actions.
- API routes return proper HTTP status codes and consistent JSON shapes.

---

## UI Components (shadcn/ui)

shadcn/ui is the default component library for this project. Components are copied into the codebase (not imported from a package) and live in `src/components/ui/`.

### Adding components

Use the shadcn CLI to add new components:

```bash
npx shadcn add <component>
# e.g. npx shadcn add button dialog input card
```

This copies the component source into `src/components/ui/` where it can be freely modified.

### Usage

Import components from the `@/components/ui/` path:

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
```

### Conventions

- **Prefer shadcn components** for all standard UI primitives: buttons, inputs, dialogs, cards, badges, tooltips, dropdowns, etc.
- **Do not** rewrite a shadcn component from scratch when one already exists — add the component via the CLI first.
- **Customize via `className`** using `cn()`. Do not edit the base component file unless you need a structural change.
- **Compose** shadcn primitives into feature components in `src/components/features/` rather than duplicating markup.
- The `cn()` utility (`src/lib/utils.ts`) is already wired — always use it for conditional or merged class names.

---

## Styling Rules (Tailwind CSS)

- Use Tailwind utility classes exclusively. Do not write custom CSS unless absolutely necessary.
- Extract repeated class combinations into reusable components, not `@apply` directives.
- Use `cn()` (a `clsx` + `twMerge` helper in `lib/utils.ts`) for conditional classes:

```tsx
import { cn } from "@/lib/utils";

export function Button({ variant, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-md px-4 py-2 font-medium transition-colors",
        variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "ghost" && "text-gray-700 hover:bg-gray-100",
        className
      )}
      {...props}
    />
  );
}
```

- Use the Tailwind config to define the design system (colors, spacing, fonts). Reference tokens from the config rather than using arbitrary values.
- Responsive design: mobile-first. Use `sm:`, `md:`, `lg:` breakpoints as needed.
- Dark mode: use the `dark:` variant. Ensure all UI works in both themes.

---

## Database & Prisma

- Define all models in `prisma/schema.prisma`.
- Use a **singleton Prisma client** in `src/lib/db.ts`:

```ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
```

- Always reference the client as `db`, not `prisma`, throughout the codebase.
- Use Prisma migrations for schema changes. Never edit the database manually.
- Add `@map` and `@@map` annotations to use snake_case table/column names in MySQL while keeping PascalCase model names in code.

---

## Authentication (NextAuth / Auth.js)

- Configure NextAuth in `src/lib/auth.ts` and expose the route handler at `src/app/api/auth/[...nextauth]/route.ts`.
- Protect routes using middleware (`middleware.ts` at the project root) or by checking the session in layouts/pages.
- Use the `auth()` helper in Server Components to get the current session.
- Never trust client-side session data for authorization — always verify on the server.

---

## API Routes

- Place route handlers in `src/app/api/` following the Next.js file convention (`route.ts`).
- Always validate request bodies with Zod.
- Return consistent response shapes:

```ts
// Success
return Response.json({ success: true, data: result });

// Error
return Response.json({ success: false, error: "Description" }, { status: 400 });
```

- Use proper HTTP methods: `GET` for reads, `POST` for creation, `PATCH` for updates, `DELETE` for removal.
- Prefer Server Actions over API routes for form submissions and mutations from the UI.

---

## Error & Loading States

- Every route group should have an `error.tsx` and `loading.tsx`.
- Wrap async UI sections in `<Suspense>` with meaningful skeleton fallbacks.
- Display user-friendly error messages. Log detailed errors server-side only.

---

## Environment Variables

- Store secrets in `.env.local` (never committed).
- Maintain an `.env.example` with placeholder values and comments.
- Access server-side env vars directly via `process.env`.
- For client-side env vars, prefix with `NEXT_PUBLIC_` and keep them non-sensitive.

---

## Do NOT

- Do not use the Pages Router (`pages/` directory). This project uses App Router only.
- Do not use `getServerSideProps`, `getStaticProps`, or `getInitialProps`.
- Do not install CSS-in-JS libraries (styled-components, emotion, etc.).
- Do not use `any` in TypeScript.
- Do not store secrets or credentials in code or commit `.env.local`.
- Do not use `eval()` or dangerously set inner HTML without sanitization.
- Do not write raw SQL — use Prisma's query builder.
- Do not disable ESLint or TypeScript checks.

---

## Dependencies to Prefer

When functionality is needed, prefer these libraries:

| Need                | Use                          |
| ------------------- | ---------------------------- |
| Validation          | `zod`                        |
| Class merging       | `clsx` + `tailwind-merge`    |
| Date handling       | `date-fns`                   |
| Icons               | `lucide-react`               |
| Forms               | React Hook Form + Zod        |
| Toast / Alerts      | `sonner`                     |
| State (client)      | React Context or `zustand`   |
| Fetching (client)   | `swr` or `@tanstack/query`   |
| UI components       | `shadcn/ui` (copy-paste)     |

Do not add dependencies without justification. Prefer the standard library and built-in Next.js/React features first.