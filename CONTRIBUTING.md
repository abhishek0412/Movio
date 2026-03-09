# Contributing to VideoParlour

Thank you for your interest in contributing! This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

---

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behaviour to the maintainers.

---

## Getting Started

### Prerequisites

| Tool    | Version | Check Command    |
| ------- | ------- | ---------------- |
| Node.js | 20+     | `node --version` |
| npm     | 10+     | `npm --version`  |
| Git     | 2.40+   | `git --version`  |

### Development Setup

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/<your-username>/videoparlour.git
cd videoparlour

# 3. Install dependencies
npm install

# 4. Create environment file
cp .env.example .env

# 5. Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Development Workflow

### 1. Find or Create an Issue

- Check [existing issues](https://github.com/abhishek0412/videoparlour/issues) before creating a new one.
- Use the appropriate issue template (Bug Report, Feature Request, or Story).
- Wait for the issue to be triaged and assigned before starting work.

### 2. Create a Branch

```bash
# Always branch from the latest main
git checkout main
git pull origin main

# Create your branch following the naming convention
git checkout -b feature/<issue-number>-<short-description>
# Examples:
#   feature/42-add-dark-mode
#   bugfix/58-fix-nav-crash
#   chore/update-dependencies
```

### 3. Make Your Changes

- Follow the [Coding Standards](#coding-standards) below.
- Keep commits small and focused.
- Use [Conventional Commits](https://www.conventionalcommits.org/) format.

### 4. Test Your Changes

```bash
# Type checking
npx tsc --noEmit

# Linting
npx eslint .

# Formatting
npx prettier --check .

# Tests
npm test

# Build
npm run build
```

All four must pass before submitting a PR.

### 5. Submit a Pull Request

- Push your branch and open a PR against `main`.
- Fill out the PR template completely.
- Link the related issue.
- Request a review.

---

## Coding Standards

### TypeScript

- **Strict mode** is enabled — no `any`, no `!` assertions.
- Use `interface` for object shapes, `type` for unions and intersections.
- Explicitly type function parameters and return values for exported functions.

### React

- **Functional components only** — no class components.
- **Named exports** — no `export default` (exception: `React.lazy` pages).
- **One component per file** — max 100 lines per component.
- **Props interface** — define for every component, even if empty.

### Styling

- **Bootstrap first** — use utility classes before writing custom CSS.
- **CSS Modules** for component-scoped styles (`.module.css`).
- **No inline styles** except for truly dynamic values.

### Accessibility (WCAG 2.1 AA)

- All images have `alt` text.
- All interactive elements are keyboard accessible.
- All form inputs have `<label>` elements.
- Heading hierarchy is sequential.
- Colour contrast meets 4.5:1 ratio.

### File Naming

| Item       | Convention        | Example             |
| ---------- | ----------------- | ------------------- |
| Components | PascalCase `.tsx` | `MovieCard.tsx`     |
| Hooks      | camelCase `.tsx`  | `useFetch.tsx`      |
| Utils      | camelCase `.ts`   | `formatDate.ts`     |
| Types      | camelCase `.ts`   | `api.ts`            |
| Tests      | `*.test.tsx/ts`   | `useFetch.test.tsx` |

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

feat(books):     add search filter to Books page
fix(nav):        resolve dropdown not closing on mobile
refactor(hooks): extract useDebounce from SearchButton
test(hooks):     add useFetch unit tests
docs(readme):    update setup instructions
chore(deps):     bump vite to 7.4.0
```

---

## Pull Request Process

### Requirements

1. **PR references a GitHub Issue** — every PR must be linked to an issue.
2. **All checks pass** — lint, type-check, format, tests, build.
3. **PR template completed** — all sections filled out.
4. **Small PRs** — reviewable in < 15 minutes.
5. **Squash-merge** — to keep `main` history clean.

### Review Criteria

Reviewers will check:

- [ ] TypeScript strict compliance
- [ ] Accessibility requirements met
- [ ] Security standards followed
- [ ] Error states handled
- [ ] Tests added for new logic
- [ ] No console.log statements
- [ ] Responsive on all viewports
- [ ] Performance — no unnecessary re-renders

---

## Issue Guidelines

### Bug Reports

- Use the **Bug Report** template.
- Include steps to reproduce, expected vs. actual behaviour.
- Include browser and device information.
- Add screenshots if applicable.

### Feature Requests

- Use the **Feature Request** template.
- Describe the problem, not just the solution.
- Include acceptance criteria.

### Stories

- Use the **Story** template.
- Follow the "As a [role], I want [feature] so that [benefit]" format.
- Include acceptance criteria and technical notes.

---

## Questions?

If you have questions, open a [Discussion](https://github.com/abhishek0412/videoparlour/discussions) or comment on the relevant issue.

Thank you for contributing! 🎬
