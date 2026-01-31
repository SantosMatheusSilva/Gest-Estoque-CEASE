# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this repository.

## Project Overview

This is a Next.js 16 stock management application built with:
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL with Neon
- **UI**: HeroUI (fork of NextUI) + Tailwind CSS
- **Styling**: Tailwind CSS with custom configuration
- **Validation**: Zod schemas
- **Package Manager**: pnpm (based on pnpm-lock.yaml)

## Development Commands

### Core Commands
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### Testing
This project currently does not have a test framework configured. When adding tests:
- Prefer Jest + React Testing Library for unit/integration tests
- Use Playwright for E2E tests
- Add test scripts to package.json as needed

## Code Style Guidelines

### File Structure & Naming
- **Components**: PascalCase (e.g., `Button.tsx`, `InputField.tsx`)
- **Pages/Layouts**: kebab-case for directories, `page.tsx` for pages
- **Utilities**: camelCase (e.g., `utils.ts`, `actions.ts`)
- **Types**: PascalCase for types/interfaces (e.g., `Produto`, `CreateProduto`)
- **Database**: kebab-case for table names, snake_case for columns

### Import Organization
```typescript
// 1. React/Next.js imports
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';

// 2. Third-party libraries
import { Button as HeroUIButton } from '@heroui/react';
import { z } from 'zod';

// 3. Internal imports (use @/* path alias)
import { Button } from '@/ui/Button';
import { Produto } from '@/db/definitions';
import { createProduto } from '@/lib/actions';
```

### TypeScript Patterns
- **Strict typing**: Always use TypeScript interfaces/types
- **Database types**: Separate DB types from input/output types
- **Component props**: Extend existing UI library props when possible
- **Server actions**: Use proper return types and error handling

Example:
```typescript
// Database type
export type Produto = {
  idUUID: string;
  nome: string;
  quantidade: number;
  // ...
};

// Input type for creation
export interface CreateProduto {
  nome: string;
  quantidade: number;
  // ...
};

// Component props
interface ButtonProps extends HeroUIButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary';
}
```

### Component Patterns
- **Server Components**: Default for all components unless client interactivity needed
- **Client Components**: Add `"use client";` at top only when necessary
- **UI Wrappers**: Create wrapper components for third-party UI libraries
- **Composition**: Prefer component composition over inheritance

Example:
```typescript
// UI Wrapper Pattern
import { Button as HeroUIButton, ButtonProps } from '@heroui/react';

interface EnhancedButtonProps extends ButtonProps {
  className?: string;
}

export function Button({ className, ...props }: EnhancedButtonProps) {
  return <HeroUIButton {...props} className={className} />;
}
```

### Database & Server Actions
- **SQL Template Literals**: Use tagged template literals for SQL queries
- **Type Safety**: Cast SQL results to proper TypeScript types
- **Error Handling**: Wrap database operations in try-catch blocks
- **Validation**: Use Zod for input validation in server actions

Example:
```typescript
export async function createProduto(produto: CreateProduto): Promise<Produto> {
  const result = await sql`
    INSERT INTO produto (nome, quantidade, preco)
    VALUES (${produto.nome}, ${Number(produto.quantidade)}, ${Number(produto.preco)})
    RETURNING *
  ` as unknown as Produto[];
  return result[0] as Produto;
}
```

### Styling Guidelines
- **Tailwind First**: Use Tailwind classes for all styling
- **Responsive Design**: Mobile-first approach with `sm:`, `md:`, `lg:` prefixes
- **Component Variants**: Use className props for styling variations
- **Dark Mode**: Support dark mode with `dark:` prefixes

### Error Handling
- **Server Actions**: Return error objects with proper structure
- **Form Validation**: Use Zod validation with clear error messages
- **Database Errors**: Log errors and return user-friendly messages
- **Client Errors**: Use error boundaries for graceful degradation

### Internationalization
- **Language**: Portuguese (pt-PT) for user-facing text
- **Currency**: EUR format for currency display
- **Date Formatting**: Use locale-aware date formatting

## Path Aliases

```typescript
"@/*": "./src/*"  // Configured in tsconfig.json
```

Use these aliases consistently:
- `@/ui/` - UI components
- `@/lib/` - Utilities and actions
- `@/db/` - Database-related files
- `@/app/` - Next.js app directory

## Linting & Type Checking

Run these commands before committing:
```bash
pnpm lint         # ESLint for code quality
# Add type checking when TypeScript compiler is configured
```

The project uses ESLint with Next.js recommended configuration for TypeScript and Core Web Vitals.

## Database Schema

Key entities:
- **Produto**: Products with stock management
- **Categoria**: Product categories (hierarchical)
- **Usuario**: User management with role-based access

Always update corresponding TypeScript types in `src/db/definitions.ts` when modifying database schema.

## Security Considerations

- **SQL Injection**: Use parameterized queries (SQL template literals)
- **Input Validation**: Validate all user inputs with Zod schemas
- **Authentication**: Implement proper auth checks in server actions
- **Environment Variables**: Never commit sensitive data to repository