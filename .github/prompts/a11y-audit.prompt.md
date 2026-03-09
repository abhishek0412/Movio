# Prompt: Accessibility Audit (WCAG 2.1 AA)

> Full accessibility audit based on WCAG 2.1 AA standards and WAI-ARIA best practices.

## Instructions

Audit the codebase against each WCAG criterion below. For each failure, report:

- **Criterion**: WCAG reference (e.g., 1.1.1)
- **Level**: A or AA
- **File**: Exact file and line
- **Issue**: What fails
- **Fix**: Specific code change

---

### Perceivable

#### 1.1.1 Non-text Content (Level A)

- [ ] All `<img>` tags have meaningful `alt` text
- [ ] Decorative images use `alt=""`
- [ ] SVG icons have `aria-label` or `aria-hidden="true"`
- [ ] Background images with meaning have text alternatives

#### 1.3.1 Info and Relationships (Level A)

- [ ] Heading hierarchy is sequential (h1 → h2 → h3, no skipping)
- [ ] One `<h1>` per page
- [ ] Lists use `<ul>`/`<ol>` — not styled `<div>`s
- [ ] Tables have `<th>` headers with `scope`
- [ ] Form inputs have associated `<label>` elements

#### 1.4.3 Contrast (Level AA)

- [ ] Normal text: ≥ 4.5:1 contrast ratio
- [ ] Large text (18px+ bold or 24px+): ≥ 3:1
- [ ] UI components and icons: ≥ 3:1

#### 1.4.11 Non-text Contrast (Level AA)

- [ ] Focus indicators have ≥ 3:1 contrast
- [ ] Form field borders have ≥ 3:1 contrast

---

### Operable

#### 2.1.1 Keyboard (Level A)

- [ ] All interactive elements focusable via Tab
- [ ] Custom controls operable via Enter/Space
- [ ] Dropdown menus navigable via arrow keys
- [ ] No keyboard traps

#### 2.4.1 Skip Navigation (Level A)

- [ ] "Skip to main content" link as first focusable element

#### 2.4.3 Focus Order (Level A)

- [ ] Tab order follows visual layout
- [ ] Modal/dialog traps focus within

#### 2.4.7 Focus Visible (Level AA)

- [ ] All interactive elements have visible focus indicator
- [ ] Custom focus styles use `:focus-visible`
- [ ] Focus ring visible in both light and dark modes

---

### Understandable

#### 3.1.1 Language of Page (Level A)

- [ ] `<html>` has `lang` attribute

#### 3.3.1 Error Identification (Level A)

- [ ] Form errors identified by text (not just colour)
- [ ] Error messages are descriptive

#### 3.3.2 Labels or Instructions (Level A)

- [ ] Required fields are marked
- [ ] Input format expectations are stated

---

### Robust

#### 4.1.2 Name, Role, Value (Level A)

- [ ] Custom components have appropriate ARIA roles
- [ ] Icon-only buttons have `aria-label`
- [ ] Toggle buttons use `aria-pressed`
- [ ] Expandable sections use `aria-expanded`
- [ ] Live regions use `aria-live` for dynamic content

---

### Automated Testing

```bash
# ESLint a11y plugin (already configured)
npx eslint . --rule 'jsx-a11y/*'

# Lighthouse accessibility audit
# Run in Chrome DevTools → Lighthouse → Accessibility
```
