# GitHub Copilot — Project Instructions

> These instructions are automatically loaded by GitHub Copilot for every interaction in this workspace.
> They define the coding standards, architecture, and best practices for this React + TypeScript project.

---

## 1. Tech Stack

| Layer         | Technology                           | Version  |
| ------------- | ------------------------------------ | -------- |
| Language      | TypeScript (strict mode)             | ~5.9+    |
| UI Framework  | React (functional components only)   | 19+      |
| Build Tool    | Vite                                 | 7+       |
| CSS Framework | Bootstrap                            | 5.3+     |
| Routing       | React Router DOM                     | 7+       |
| Linting       | ESLint + eslint-plugin-jsx-a11y      | 9+       |
| Formatting    | Prettier                             | 3+       |
| Git Hooks     | Husky + lint-staged                  | 9+ / 16+ |
| Testing       | Vitest + React Testing Library       | Latest   |
| Deployment    | Azure Static Web Apps / Azure Portal | —        |
| Repository    | GitHub                               | —        |

---

## 2. Project Structure

```
src/
├── assets/              # Static files: images, fonts, SVGs
├── components/
│   ├── common/          # Reusable UI components (Button, Card, Spinner, Alert)
│   ├── layout/          # App shell components (Layout, Nav, Footer, Breadcrumb)
│   └── pages/           # Route-level page components
├── constants/           # App-wide constants and configuration
├── contexts/            # React Context providers and consumers
├── hooks/               # Custom React hooks
├── services/            # API service layers and HTTP clients
├── types/               # Shared TypeScript interfaces and type definitions
├── utils/               # Pure utility/helper functions
├── __tests__/           # Test files mirroring src/ structure
├── App.tsx              # Root component with route definitions
└── main.tsx             # Application entry point
```

### Barrel Exports

Every folder (`hooks/`, `constants/`, `types/`, `utils/`, `contexts/`) **must** have an `index.tsx` barrel file that re-exports all public members.

```tsx
// src/hooks/index.tsx
export { useFetch } from './useFetch';
export { useDarkMode } from './useDarkMode';
```

---

## 3. File Naming & Organisation

| Item                   | Convention                     | Example                |
| ---------------------- | ------------------------------ | ---------------------- |
| React components       | PascalCase `.tsx`              | `MovieCard.tsx`        |
| Custom hooks           | camelCase `use*.tsx`           | `useFetch.tsx`         |
| Context providers      | PascalCase `*Context.tsx`      | `ThemeContext.tsx`     |
| Utility / helper files | camelCase `.ts`                | `formatDate.ts`        |
| Type definition files  | camelCase `.ts`                | `api.ts`               |
| Constants              | camelCase `.ts`                | `api.ts`, `nav.ts`     |
| Test files             | `*.test.tsx` or `*.test.ts`    | `useFetch.test.tsx`    |
| Style files            | Component-scoped `.module.css` | `MovieCard.module.css` |

### Rules

- **One component per file.** No multi-component files.
- **Only files containing JSX** use the `.tsx` extension.
- **Non-JSX files** (types, constants, utils) use `.ts`.
- **No default exports.** Always use named exports for better refactoring and IDE support.
  - Exception: Page components may use `export default` when required by React.lazy().
- **Co-locate** tests alongside source files OR in a mirrored `__tests__/` folder.

---

## 4. TypeScript Standards

### Strict Configuration

The project uses `"strict": true` in `tsconfig.app.json`. Never weaken these checks.

### Type Rules

```tsx
// ✅ DO: Use interfaces for object shapes (extendable)
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ DO: Use type aliases for unions, intersections, and utility types
type Status = 'idle' | 'loading' | 'success' | 'error';
type ApiResponse<T> = { data: T; status: number };

// ❌ DON'T: Use `any` — use `unknown` and narrow instead
// ❌ DON'T: Use non-null assertions (!) — use proper null checks
// ❌ DON'T: Use @ts-ignore or @ts-expect-error without a JIRA/issue reference
```

### Function Signatures

- Always type function parameters and return types explicitly for exported functions.
- Use `React.FC` sparingly — prefer explicit prop interfaces.
- Prefer `interface Props` over inline types.

```tsx
// ✅ Preferred
interface MovieCardProps {
  title: string;
  year: number;
  onSelect: (id: string) => void;
}

const MovieCard = ({ title, year, onSelect }: MovieCardProps) => {
  // ...
};
```

---

## 5. React Patterns & Best Practices

### Component Rules

1. **Functional components only** — no class components.
2. **Keep components < 100 lines.** If larger, decompose into sub-components.
3. **Single Responsibility Principle** — each component does one thing.
4. **Lift state up** only when siblings need to share it.
5. **Use Context** for global state (theme, auth, likes) — not prop drilling.

### Hooks Rules

1. Always follow the [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks).
2. **Custom hooks** must start with `use` and encapsulate reusable stateful logic.
3. **Always include a cleanup** in `useEffect` when subscribing or setting up timers.
4. **Use `useCallback`** for functions passed as props to memoized children.
5. **Use `useMemo`** for expensive computations that depend on specific values.
6. **Use `useReducer`** when state logic involves multiple sub-values or complex transitions.

### Data Fetching

- Use the project's `useFetch` custom hook for consistency.
- Always use `AbortController` for cancellable fetches.
- Handle loading, error, and empty states in every data-fetching component.

```tsx
const { data, loading, error } = useFetch<Book[]>(API_ENDPOINTS.BOOKS);

if (loading) return <Spinner />;
if (error) return <Alert variant="danger" message={error} />;
if (!data?.length) return <p>No results found.</p>;
```

### State Management Hierarchy

Choose the **simplest** tool that works:

```
useState → useReducer → Context API → External Library (if truly needed)
```

---

## 6. Styling Guidelines

### Bootstrap-First Approach

- Use Bootstrap utility classes before writing custom CSS.
- Use Bootstrap's responsive breakpoints: `sm`, `md`, `lg`, `xl`, `xxl`.
- Use `data-bs-theme="dark"` attribute for dark mode — not custom CSS.

### Custom CSS Rules

- Use CSS Modules (`.module.css`) for component-scoped styles.
- Never use inline styles except for truly dynamic values (e.g., computed widths).
- Prefer CSS custom properties (`--var`) over hardcoded values.
- Always support `prefers-reduced-motion` for animations.

---

## 7. Accessibility (WCAG 2.1 AA)

This project **must** meet WCAG 2.1 AA compliance.

### Mandatory Requirements

1. **All images** must have meaningful `alt` text (or `alt=""` if decorative).
2. **All interactive elements** must be keyboard accessible.
3. **All form inputs** must have associated `<label>` elements.
4. **All icon-only buttons** must have `aria-label` attributes.
5. **Heading hierarchy** must be sequential (`h1 → h2 → h3`, no skipping).
6. **One `<h1>` per page** — set by the page component.
7. **Colour contrast** must meet 4.5:1 ratio for normal text.
8. **Focus indicators** must be visible on all interactive elements.
9. **Skip-to-content** link must be the first focusable element.

### ESLint Enforcement

The `eslint-plugin-jsx-a11y` plugin is active. Never disable a11y rules without a documented reason.

---

## 8. Security Standards

### OWASP Top 10 Awareness

1. **Never use `dangerouslySetInnerHTML`** — unless content is sanitized with DOMPurify.
2. **Validate and sanitise all user inputs** — max length, allowed characters, HTML stripping.
3. **API URLs must come from environment variables** — never hardcode secrets or URLs.
4. **Use `VITE_` prefix** for client-side env vars (Vite convention).
5. **Content Security Policy** must be configured in `index.html`.
6. **Sensitive data** must never be stored in localStorage without encryption.
7. **External links** must use `rel="noopener noreferrer"` with `target="_blank"`.
8. **API response shapes** must be validated before rendering (use type guards).

### Environment Variables

```
.env              → Local development (gitignored)
.env.example      → Template for onboarding (committed)
.env.production   → Production values (CI/CD only, never committed)
```

---

## 9. Error Handling

### Principles

1. **Never swallow errors silently** — always log or display them.
2. **Use Error Boundaries** to catch rendering errors gracefully.
3. **Every `fetch` call** must have error handling (try/catch or .catch()).
4. **Image elements** must have `onError` fallback handlers.
5. **User-facing errors** must be friendly — never show stack traces or raw API errors.

### Pattern

```tsx
try {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data: T = await response.json();
  return data;
} catch (error) {
  if (error instanceof DOMException && error.name === 'AbortError') return;
  console.error('Fetch failed:', error);
  throw error;
}
```

---

## 10. Testing Standards

### Framework: Vitest + React Testing Library

- **Test behaviour, not implementation** — test what the user sees and does.
- **Every custom hook** must have unit tests.
- **Every shared component** must have rendering + interaction tests.
- **Mock external dependencies** (fetch, localStorage, router).
- **Aim for 80%+ coverage** on shared code.

### Test File Naming

```
src/hooks/useFetch.tsx        → src/__tests__/hooks/useFetch.test.tsx
src/components/common/Card.tsx → src/__tests__/components/Card.test.tsx
```

### Testing Pattern

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MovieCard } from '../components/common/MovieCard';

describe('MovieCard', () => {
  it('renders the movie title', () => {
    render(<MovieCard title="Inception" year={2010} onSelect={vi.fn()} />);
    expect(screen.getByText('Inception')).toBeInTheDocument();
  });
});
```

---

## 11. Git & Version Control

### Branch Naming

```
feature/<issue-number>-<short-description>    → feature/42-add-dark-mode
bugfix/<issue-number>-<short-description>     → bugfix/58-fix-nav-crash
hotfix/<issue-number>-<short-description>     → hotfix/99-security-patch
chore/<short-description>                     → chore/update-dependencies
```

### Commit Messages (Conventional Commits)

```
<type>(<scope>): <description>

feat(auth):     add login page with OAuth flow
fix(nav):       resolve dropdown not closing on mobile
refactor(hooks): extract useDebounce from SearchButton
test(hooks):    add useFetch unit tests
docs(readme):   update setup instructions
chore(deps):    bump vite to 7.4.0
style(lint):    apply prettier formatting
perf(home):     lazy-load below-fold images
ci(actions):    add build and test workflow
```

### Pull Request Rules

- Every PR must reference a GitHub Issue.
- Every PR must pass: lint, type-check, format-check, tests, build.
- Every PR should be reviewable in < 15 minutes (keep PRs small).
- Squash-merge to `main` to keep history clean.

---

## 12. Performance Guidelines

1. **Lazy-load page components** with `React.lazy()` + `<Suspense>`.
2. **Lazy-load images** with `loading="lazy"` attribute.
3. **Memoize expensive computations** with `useMemo`.
4. **Memoize components** with `React.memo` when re-renders are costly.
5. **Avoid creating objects/arrays in render** — define outside or memoize.
6. **Debounce search inputs** — minimum 300ms delay.
7. **Keep bundle size small** — check with `npx vite-bundle-visualizer`.

---

## 13. Azure Deployment

### Azure Static Web Apps

- Build output: `dist/` (Vite default).
- Build command: `npm run build`.
- Environment variables: configured in Azure Portal → Configuration → Application Settings.
- Custom domains: configured in Azure Portal → Custom Domains.
- Routing fallback: `index.html` (SPA routing) — configure in `staticwebapp.config.json`.

### Deployment Config

```json
// staticwebapp.config.json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/assets/*", "/api/*"]
  },
  "globalHeaders": {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
  }
}
```

---

## 14. Code Review Checklist

Before approving any PR, verify:

- [ ] TypeScript strict mode — no `any`, no `!` assertions
- [ ] All new components have prop interfaces
- [ ] Accessibility — aria-labels, alt texts, keyboard navigation
- [ ] Error states handled — loading, error, empty
- [ ] No hardcoded strings for API URLs or secrets
- [ ] Tests written for new logic
- [ ] No console.log (use structured logging or remove)
- [ ] Responsive — works on mobile, tablet, desktop
- [ ] Performance — no unnecessary re-renders
- [ ] Security — inputs validated, external links safe
