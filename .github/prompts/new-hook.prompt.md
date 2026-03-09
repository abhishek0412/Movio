# Prompt: Create Custom React Hook

> Reusable prompt for scaffolding a custom React hook following project standards.

## Variables

- `{HookName}` — camelCase starting with `use` (e.g., `useDebounce`)
- `{Description}` — What the hook does and when to use it

## Instructions

### 1. Hook File

Create `src/hooks/{HookName}.tsx`:

```tsx
import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * {Description}
 *
 * @example
 * const value = {HookName}(inputValue, 300);
 */
export const {
  HookName,
} = (/* params */) => {
  // Implementation

  // Always clean up effects
  useEffect(() => {
    return () => {
      // cleanup
    };
  }, []);

  return /* return value */;
};
```

### 2. Checklist

- [ ] Name starts with `use`
- [ ] File extension is `.tsx` (project convention)
- [ ] Exported as named export
- [ ] Added to `src/hooks/index.tsx` barrel export
- [ ] TypeScript — all params and return types explicitly typed
- [ ] Generic types used where applicable (`<T>`)
- [ ] `useEffect` has cleanup function when subscribing/timing
- [ ] `AbortController` used for any fetch operations
- [ ] Edge cases handled: null, undefined, empty arrays, rapid calls
- [ ] JSDoc comment with `@example` usage
- [ ] No side effects outside of `useEffect`

### 3. Test File

Create `src/__tests__/hooks/{HookName}.test.tsx`:

```tsx
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { {HookName} } from '@/hooks/{HookName}';

describe('{HookName}', () => {
  it('returns the expected initial value', () => {
    const { result } = renderHook(() => {HookName}(/* params */));
    expect(result.current).toBe(/* expected */);
  });

  it('handles edge case: empty input', () => {
    // Test with empty/null/undefined inputs
  });

  it('cleans up on unmount', () => {
    const { unmount } = renderHook(() => {HookName}(/* params */));
    unmount();
    // Verify cleanup occurred
  });
});
```

### 4. Quality Gates

```bash
npx tsc --noEmit && npx eslint . && npx prettier --check . && npm test
```
