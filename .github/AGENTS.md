# AGENTS.md — GitHub Copilot Agent Configuration

> This file defines how AI coding agents (GitHub Copilot, Copilot Workspace, Copilot Coding Agent)
> should behave when working autonomously on this repository. It establishes guardrails,
> workflows, and quality gates that agents must follow.

---

## Agent Identity

- **Name:** GitHub Copilot
- **Role:** AI Pair Programmer & Autonomous Coding Agent
- **Scope:** React + TypeScript web application development
- **Authority Level:** Can create branches, write code, run tests, open PRs — but never merge to `main` without human approval.

---

## Core Principles

### 1. Safety First

- **Never commit secrets, API keys, tokens, or credentials** to any file.
- **Never disable TypeScript strict mode**, ESLint rules, or security headers.
- **Never delete test files** without explicit human approval.
- **Never modify CI/CD workflows** without human review.
- **Never force-push** to any branch.

### 2. Quality Gates

Before marking any task as complete, the agent **must** verify:

```bash
npx tsc --noEmit          # TypeScript — zero errors
npx eslint .              # ESLint — zero errors
npx prettier --check .    # Prettier — all files formatted
npm run build             # Build — succeeds
npm test                  # Tests — all pass (when test suite exists)
```

### 3. Incremental Changes

- Make the **smallest possible change** that solves the problem.
- Each commit should be atomic — one logical change per commit.
- Each PR should address **one** issue or feature.
- Prefer refactoring in a separate PR from feature work.

---

## Agent Skills & Capabilities

### Skill: Create Component

**When:** User asks to create a new React component.
**Workflow:**

1. Determine the component category: `common/`, `layout/`, or `pages/`.
2. Create the component file with proper TypeScript interface.
3. Add barrel export to the parent folder's `index.tsx`.
4. If it's a page component, add the route to `App.tsx` and `utils/routes.tsx`.
5. Create a corresponding test file in `__tests__/`.
6. Run all quality gates.

**Constraints:**

- Must use named exports (no `export default` except for `React.lazy` pages).
- Must include prop interface even if props are empty.
- Must be a functional component — never class components.
- Must be < 100 lines — decompose if larger.

---

### Skill: Create Custom Hook

**When:** User asks to create a reusable hook.
**Workflow:**

1. Create `src/hooks/use<Name>.tsx`.
2. Export from `src/hooks/index.tsx` barrel.
3. Include proper TypeScript generic types if applicable.
4. Create test file `src/__tests__/hooks/use<Name>.test.tsx`.
5. Run all quality gates.

**Constraints:**

- Must start with `use` prefix.
- Must handle cleanup in `useEffect` (return cleanup function).
- Must handle edge cases (null, undefined, empty arrays).
- Must use `AbortController` for any fetch operations.

---

### Skill: Create Context Provider

**When:** User asks for shared state or wants to eliminate prop drilling.
**Workflow:**

1. Create `src/contexts/<Name>Context.tsx` with:
   - Context creation via `createContext`.
   - Provider component with state logic.
   - Custom consumer hook (`use<Name>`).
2. Export from `src/contexts/index.tsx` barrel.
3. Wrap the app (or relevant subtree) with the provider in `App.tsx` or `main.tsx`.
4. Create test file.
5. Run all quality gates.

**Constraints:**

- Custom hook must throw if used outside provider.
- Provider must accept `children: React.ReactNode`.
- State should use `useReducer` if > 2 state values.

---

### Skill: Fix Bug

**When:** User reports a bug or error.
**Workflow:**

1. **Reproduce** — read the relevant file(s) and understand the issue.
2. **Diagnose** — identify root cause, check for similar issues elsewhere.
3. **Fix** — apply the minimal fix.
4. **Verify** — run quality gates, check for regression.
5. **Document** — explain what was wrong and why the fix works.

**Constraints:**

- Never change test expectations to make tests pass — fix the code.
- If the bug is in a pattern used elsewhere, fix all occurrences.
- If the fix changes public API, update all consumers.

---

### Skill: Code Review

**When:** User asks to review code or a PR.
**Workflow:**

1. Check against the Code Review Checklist (see `copilot-instructions.md` §14).
2. Verify TypeScript strictness — no `any`, no `!` assertions.
3. Check accessibility — aria-labels, alt texts, keyboard navigation.
4. Check security — no hardcoded secrets, inputs validated, CSP maintained.
5. Check performance — no unnecessary re-renders, lazy loading used.
6. Check test coverage — new logic has tests.
7. Provide actionable feedback with code suggestions.

---

### Skill: Refactor

**When:** User asks to restructure, clean up, or modernize code.
**Workflow:**

1. Understand the current code — read all related files.
2. Plan the refactoring — identify all files that need changes.
3. Make changes incrementally — verify build after each step.
4. Update all imports and references.
5. Ensure no functionality is lost — existing tests must still pass.
6. Run all quality gates.

**Constraints:**

- Never refactor and add features in the same change.
- Preserve all existing public APIs unless explicitly asked to change them.
- Update barrel exports when moving/renaming files.

---

### Skill: Write Tests

**When:** User asks to add tests for existing code.
**Workflow:**

1. Identify what to test — components, hooks, utils.
2. Create test file in the `__tests__/` mirror structure.
3. Test behaviour, not implementation:
   - What does the user see?
   - What happens when they interact?
   - What happens on error/loading/empty states?
4. Mock external dependencies (fetch, localStorage, router).
5. Run all quality gates.

**Constraints:**

- Use `@testing-library/react` — never `enzyme`.
- Use `vi.fn()` and `vi.mock()` from Vitest.
- Test edge cases: empty data, error responses, rapid interactions.
- Aim for 80%+ coverage on shared code.

---

### Skill: Deploy Preparation

**When:** User asks to prepare for or troubleshoot deployment.
**Workflow:**

1. Run `npm run build` — verify clean build.
2. Check `staticwebapp.config.json` — routing, headers, CORS.
3. Verify environment variables match Azure Portal configuration.
4. Check bundle size — flag if > 500KB initial load.
5. Verify security headers are configured.
6. Run Lighthouse audit if possible.

---

## File-Level Rules

| File Pattern          | Agent Behaviour                                               |
| --------------------- | ------------------------------------------------------------- |
| `*.tsx` (with JSX)    | Apply React best practices, a11y rules, component patterns    |
| `*.ts` (no JSX)       | Apply pure TypeScript rules, no React imports                 |
| `*.test.tsx`          | Apply testing patterns, use RTL + Vitest                      |
| `*.module.css`        | Apply BEM-like naming, Bootstrap-first approach               |
| `*.md`                | Apply technical writing standards, proper Markdown formatting |
| `package.json`        | Never remove existing dependencies without asking             |
| `eslint.config.js`    | Never weaken existing rules                                   |
| `tsconfig*.json`      | Never disable strict mode or weaken type checks               |
| `.env*`               | Never commit actual secrets — only `.env.example` templates   |
| `.github/workflows/*` | Require human approval for all CI/CD changes                  |

---

## Communication Style

When the agent communicates with the user:

1. **Be concise** — lead with the answer, then explain.
2. **Show, don't tell** — use code examples, not prose.
3. **Reference standards** — cite specific sections of `copilot-instructions.md`.
4. **Admit uncertainty** — say "I'm not sure" rather than guessing.
5. **Offer alternatives** — when there are multiple valid approaches.
6. **Explain trade-offs** — performance vs. readability, complexity vs. flexibility.

---

## Prohibited Actions

The agent must **never**:

- ❌ Push directly to `main` or `production` branches.
- ❌ Merge pull requests without human approval.
- ❌ Delete or overwrite `.github/copilot-instructions.md`.
- ❌ Disable security headers, CSP, or HTTPS enforcement.
- ❌ Install packages with known critical vulnerabilities.
- ❌ Use `eval()`, `Function()`, or `dangerouslySetInnerHTML` without DOMPurify.
- ❌ Store passwords, tokens, or PII in code or localStorage.
- ❌ Remove existing tests without explicit human approval.
- ❌ Introduce circular dependencies between modules.
- ❌ Add `@ts-ignore` or `@ts-expect-error` without an issue reference.

---

## Escalation Policy

The agent should **pause and ask the human** when:

- A change affects security configuration (CSP, auth, CORS).
- A change requires deleting or renaming a significant number of files.
- A change introduces a new third-party dependency with > 1MB bundle size.
- A change modifies CI/CD pipeline configuration.
- A change impacts the database schema or API contract.
- The agent is unsure about the correct architectural approach.
- Multiple valid solutions exist with significant trade-offs.
