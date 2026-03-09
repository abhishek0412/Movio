# Prompt: Bug Fix Workflow

> Structured workflow for diagnosing and fixing bugs in this project.

## Instructions

Follow this exact sequence when fixing a bug:

### Phase 1: Reproduce & Understand

1. **Read the bug report** — extract the expected vs. actual behaviour.
2. **Identify affected files** — search for related components, hooks, utils.
3. **Read the code** — understand the current logic before changing anything.
4. **Check for related patterns** — is the same bug present in similar code elsewhere?

### Phase 2: Diagnose

1. **Identify the root cause** — not just the symptom.
2. **Check if it's a**:
   - State management issue (stale closures, missing deps, wrong state shape)
   - Rendering issue (missing keys, wrong conditional, race condition)
   - Type issue (incorrect interface, missing null check)
   - API issue (wrong endpoint, missing error handling, missing abort)
   - CSS issue (Bootstrap class conflict, specificity, responsive breakpoint)

### Phase 3: Fix

1. **Apply the minimal fix** — don't refactor while fixing.
2. **Fix all occurrences** — if the same pattern exists elsewhere, fix those too.
3. **Update types** if the fix changes data shapes.
4. **Never change test expectations** to make tests pass — fix the code.

### Phase 4: Verify

Run all quality gates:

```bash
npx tsc --noEmit          # No type errors introduced
npx eslint .              # No lint violations
npx prettier --check .    # Formatting intact
npm test                  # All tests pass
npm run build             # Build succeeds
```

### Phase 5: Document

In the commit message and PR description:

1. **What** was the bug? (one sentence)
2. **Why** did it happen? (root cause)
3. **How** was it fixed? (what was changed)
4. **Impact** — what other areas were affected?

### Commit Format

```
fix(<scope>): <short description>

<root cause explanation>

Fixes #<issue-number>
```
