# Prompt: Create New Page

> Scaffolds a new route-level page component with all required integrations.

## Variables

- `{PageName}` — PascalCase (e.g., `Settings`, `Profile`, `Dashboard`)
- `{RoutePath}` — URL path (e.g., `/settings`, `/profile`)
- `{Description}` — Purpose of the page

## Instructions

### 1. Page Component

Create `src/components/pages/{PageName}.tsx`:

```tsx
import { useDocumentTitle } from '@/hooks';

const {
  PageName,
} = () => {
  useDocumentTitle('{PageName} — VideoParlour');

  return (
    <div className="container-fluid py-4">
      <h1 className="mb-4">{PageName}</h1>
      {/* Page content */}
    </div>
  );
};

export default { PageName };
```

### 2. Route Configuration

Add to `src/utils/routes.tsx`:

```tsx
'{PageName}': {
  path: '{RoutePath}',
  name: '{PageName}',
  parent: 'Home',
},
```

### 3. App Router

Add lazy import and route to `src/App.tsx`:

```tsx
const {PageName} = React.lazy(() => import('./components/pages/{PageName}'));

// Inside <Routes>:
<Route path="{RoutePath}" element={
  <Suspense fallback={<Spinner />}>
    <{PageName} />
  </Suspense>
} />
```

### 4. Navigation (if applicable)

If the page should appear in navigation, add entry to `src/constants/nav.tsx`.

### 5. Checklist

- [ ] Page has unique `<h1>` heading
- [ ] `useDocumentTitle` sets browser tab title
- [ ] Route added to `utils/routes.tsx`
- [ ] Lazy-loaded in `App.tsx` with `React.lazy` + `<Suspense>`
- [ ] Loading/error/empty states handled (if data-fetching)
- [ ] Responsive layout using Bootstrap grid
- [ ] Accessibility: heading hierarchy, keyboard navigation
- [ ] Test file created in `src/__tests__/pages/`
- [ ] Quality gates pass
