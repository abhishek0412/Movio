# Prompt: Code Review

> Structured code review prompt based on industry standards.
> Use this when reviewing PRs or when asked to review code quality.

## Instructions

Review the code against each category below. For each issue found, provide:

- **File and line reference**
- **Category** (Type Safety, Security, A11y, Performance, etc.)
- **Severity** (🔴 Critical, 🟡 Warning, 🟢 Suggestion)
- **Specific fix** with code example

---

### 1. TypeScript & Type Safety

- [ ] No `any` types — use `unknown` and narrow
- [ ] No non-null assertions (`!`) — use proper null checks
- [ ] No `@ts-ignore` without issue reference
- [ ] All function params and returns explicitly typed
- [ ] Generic types used where applicable
- [ ] Interfaces used for object shapes, types for unions

### 2. React Patterns

- [ ] Functional components only — no classes
- [ ] Props interface defined (even if empty)
- [ ] Hooks follow Rules of Hooks
- [ ] `useEffect` has proper dependency array
- [ ] `useEffect` has cleanup for subscriptions/timers
- [ ] `useMemo` / `useCallback` used where beneficial
- [ ] State updates don't cause infinite loops
- [ ] Keys provided for list rendering (not array index unless static)

### 3. Security (OWASP Top 10)

- [ ] No `dangerouslySetInnerHTML` without DOMPurify
- [ ] User inputs validated and sanitised
- [ ] No hardcoded API URLs or secrets
- [ ] External links have `rel="noopener noreferrer"`
- [ ] No sensitive data in localStorage without encryption
- [ ] API response shapes validated before rendering

### 4. Accessibility (WCAG 2.1 AA)

- [ ] Images have meaningful `alt` text
- [ ] Interactive elements are keyboard accessible
- [ ] Form inputs have associated labels
- [ ] Icon-only buttons have `aria-label`
- [ ] Heading hierarchy is sequential (h1 → h2 → h3)
- [ ] One `<h1>` per page
- [ ] Focus indicators visible
- [ ] Colour contrast ≥ 4.5:1 for normal text

### 5. Performance

- [ ] No objects/arrays created inside render without memoization
- [ ] Heavy computations wrapped in `useMemo`
- [ ] Images use `loading="lazy"`
- [ ] Page components use `React.lazy` + `<Suspense>`
- [ ] No unnecessary re-renders (check with React DevTools Profiler)

### 6. Error Handling

- [ ] All fetch calls have try/catch or .catch()
- [ ] Loading, error, and empty states handled
- [ ] Images have `onError` fallback
- [ ] User-facing errors are friendly (no stack traces)
- [ ] Error boundaries wrap critical sections

### 7. Code Quality

- [ ] Components < 100 lines
- [ ] Single Responsibility Principle followed
- [ ] No dead code (unused imports, variables, functions)
- [ ] No duplicate logic — extracted into hooks/utils
- [ ] Consistent naming conventions followed
- [ ] Barrel exports updated for new files

### 8. Testing

- [ ] New logic has corresponding test(s)
- [ ] Tests test behaviour, not implementation
- [ ] Edge cases covered (empty, null, error)
- [ ] Mocks are minimal and realistic
- [ ] Tests are deterministic (no random, no timing)
