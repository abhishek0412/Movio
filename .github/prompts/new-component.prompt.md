# Prompt: Create New React Component

> Reusable prompt for scaffolding a new React component following project standards.

## Usage

Invoke this prompt and provide the component details.

## Variables

- `{ComponentName}` — PascalCase name (e.g., `MovieCard`)
- `{Category}` — One of: `common`, `layout`, `pages`
- `{Description}` — Brief description of the component's purpose

## Instructions

Create a new React component with the following requirements:

### 1. Component File

Create `src/components/{Category}/{ComponentName}.tsx`:

```tsx
interface {ComponentName}Props {
  // Define props based on the component's purpose
}

export const {ComponentName} = ({ ...props }: {ComponentName}Props) => {
  return (
    // JSX using Bootstrap classes
  );
};
```

### 2. Checklist

- [ ] TypeScript interface for all props (even if empty: `interface Props {}`)
- [ ] Named export only (no `export default` unless needed for React.lazy)
- [ ] Functional component — never class-based
- [ ] Bootstrap utility classes used before any custom CSS
- [ ] All images have `alt` text
- [ ] All interactive elements are keyboard-accessible
- [ ] All icon-only buttons have `aria-label`
- [ ] Component is < 100 lines — decompose if larger
- [ ] Error, loading, and empty states handled (if data-dependent)
- [ ] Added to barrel export in `src/components/{Category}/index.tsx`

### 3. Test File

Create `src/__tests__/components/{ComponentName}.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { {ComponentName} } from '@/components/{Category}/{ComponentName}';

describe('{ComponentName}', () => {
  it('renders without crashing', () => {
    render(<{ComponentName} />);
    // Assert visible output
  });
});
```

### 4. Route Registration (pages only)

If `{Category}` is `pages`:

- Add route entry to `src/utils/routes.tsx`
- Add lazy import + `<Route>` to `src/App.tsx`

### 5. Quality Gates

Run after creation:

```bash
npx tsc --noEmit && npx eslint . && npx prettier --check .
```
