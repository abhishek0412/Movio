# Prompt: Performance Audit

> Comprehensive performance audit for React + Vite applications.
> Use this to identify and fix performance bottlenecks.

## Instructions

Audit the codebase for performance issues across these categories:

---

### 1. Bundle Size

- [ ] Page components use `React.lazy()` + `<Suspense>`
- [ ] No large libraries imported that could be tree-shaken
- [ ] Dynamic `import()` used for heavy, rarely-used features
- [ ] Bundle analysed with `npx vite-bundle-visualizer`
- [ ] Total initial JS bundle < 200KB (gzipped)

### 2. Rendering Performance

- [ ] `React.memo()` wraps components that re-render with same props
- [ ] `useMemo()` wraps expensive computations
- [ ] `useCallback()` wraps callbacks passed to memoized children
- [ ] No objects/arrays created inline in JSX (`style={{}}`, `options={[]}`)
- [ ] List keys are stable IDs — not array indices (unless list is static)
- [ ] State is co-located — lifted only when siblings need it

### 3. Data Fetching

- [ ] `AbortController` cancels in-flight requests on unmount
- [ ] Search inputs are debounced (≥ 300ms)
- [ ] Concurrent API calls use `Promise.all` or similar
- [ ] API responses are typed and validated
- [ ] Stale data is handled (loading indicators, optimistic updates)

### 4. Image Optimisation

- [ ] All images have `loading="lazy"` attribute
- [ ] Images have explicit `width` and `height` (prevents layout shift)
- [ ] Images use modern formats (WebP/AVIF) where supported
- [ ] Hero/above-fold images use `fetchpriority="high"`
- [ ] Broken images have `onError` fallback

### 5. CSS Performance

- [ ] CSS Modules used for component styles (no global style leaks)
- [ ] `prefers-reduced-motion` respected for animations
- [ ] No `!important` declarations
- [ ] Bootstrap utility classes preferred over custom CSS
- [ ] No unused CSS (tree-shake or purge)

### 6. Core Web Vitals Targets

| Metric                          | Target  | How to Measure              |
| ------------------------------- | ------- | --------------------------- |
| LCP (Largest Contentful Paint)  | < 2.5s  | Lighthouse, Chrome DevTools |
| INP (Interaction to Next Paint) | < 200ms | Chrome DevTools Performance |
| CLS (Cumulative Layout Shift)   | < 0.1   | Lighthouse                  |

### 7. Output Format

For each issue found, provide:

- **Category**: (Bundle / Rendering / Fetching / Images / CSS)
- **File**: Path and line
- **Impact**: High / Medium / Low
- **Current**: What the code does now
- **Recommended**: What it should do (with code)
