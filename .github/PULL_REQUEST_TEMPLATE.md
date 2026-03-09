## Description

<!-- Provide a clear and concise description of what this PR does. -->

## Related Issue

Closes #<!-- issue number -->

## Type of Change

- [ ] 🐛 Bug fix (non-breaking change that fixes an issue)
- [ ] ✨ New feature (non-breaking change that adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to change)
- [ ] ♻️ Refactor (code change that neither fixes a bug nor adds a feature)
- [ ] 📝 Documentation update
- [ ] 🎨 Style/UI update
- [ ] ⚡ Performance improvement
- [ ] ✅ Test update
- [ ] 🔧 Chore (build, CI, dependency updates)

## Changes Made

<!-- List the specific changes made in this PR. -->

-
-
-

## Screenshots / Videos

<!-- If applicable, add screenshots or screen recordings to demonstrate the change. -->

| Before | After |
| ------ | ----- |
|        |       |

## Testing

<!-- Describe the tests you've added or run. -->

- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Tested in light and dark modes
- [ ] Tested on mobile viewport

## Checklist

### Code Quality

- [ ] TypeScript strict mode — no `any`, no `!` assertions
- [ ] All new components have prop interfaces
- [ ] Named exports used (no default exports unless React.lazy)
- [ ] No `console.log` statements (use structured logging or remove)
- [ ] Components are < 100 lines
- [ ] Barrel exports updated for new files

### Accessibility (WCAG 2.1 AA)

- [ ] Images have `alt` text
- [ ] Interactive elements are keyboard accessible
- [ ] Form inputs have associated `<label>` elements
- [ ] Icon-only buttons have `aria-label`
- [ ] Heading hierarchy is sequential
- [ ] Colour contrast meets 4.5:1 ratio

### Security

- [ ] No hardcoded API URLs or secrets
- [ ] User inputs validated and sanitised
- [ ] External links use `rel="noopener noreferrer"`
- [ ] No `dangerouslySetInnerHTML` without sanitisation

### Performance

- [ ] Page components lazy-loaded with `React.lazy`
- [ ] Images use `loading="lazy"`
- [ ] No unnecessary re-renders
- [ ] `useMemo` / `useCallback` used where beneficial

### Error Handling

- [ ] Loading, error, and empty states handled
- [ ] All fetch calls have try/catch
- [ ] User-facing errors are friendly

### Quality Gates

- [ ] `npx tsc --noEmit` — no type errors
- [ ] `npx eslint .` — no lint violations
- [ ] `npx prettier --check .` — formatting correct
- [ ] `npm test` — all tests pass
- [ ] `npm run build` — build succeeds
