# Prompt: Security Audit

> Comprehensive security audit prompt based on OWASP Top 10 and frontend security best practices.
> Use this to audit the project for vulnerabilities.

## Instructions

Audit the entire codebase against each security category below. For each finding, report:

- **Severity**: 🔴 Critical | 🟡 High | 🟠 Medium | 🟢 Low | ℹ️ Info
- **File & Location**: Exact file path and code section
- **Vulnerability**: What the issue is (CWE reference if applicable)
- **Risk**: What an attacker could exploit
- **Remediation**: Specific code fix

---

### 1. Input Validation (CWE-20)

- [ ] All user inputs have max length limits
- [ ] HTML tags are stripped from text inputs
- [ ] Special characters are escaped before display
- [ ] URL parameters are validated before use
- [ ] Search queries are sanitised

### 2. Cross-Site Scripting / XSS (CWE-79)

- [ ] No `dangerouslySetInnerHTML` without DOMPurify sanitisation
- [ ] No `eval()` or `Function()` constructor usage
- [ ] No `javascript:` URLs in href attributes
- [ ] No inline event handlers with user data
- [ ] React's built-in XSS protection not bypassed

### 3. Sensitive Data Exposure (CWE-200)

- [ ] No API keys, tokens, or secrets in source code
- [ ] No credentials in localStorage without encryption
- [ ] No PII logged to console
- [ ] Environment variables use `VITE_` prefix
- [ ] `.env` files are in `.gitignore`
- [ ] `.env.example` exists with placeholder values

### 4. Security Headers

- [ ] Content-Security-Policy (CSP) configured
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY
- [ ] Referrer-Policy: strict-origin-when-cross-origin
- [ ] Permissions-Policy restricts unused APIs

Check in `staticwebapp.config.json` or `index.html`.

### 5. Third-Party Dependencies

- [ ] No dependencies with known critical vulnerabilities (`npm audit`)
- [ ] Lock file (`package-lock.json`) is committed
- [ ] Dependencies are pinned or use `^` (not `*`)
- [ ] No unnecessary dependencies (bundle size check)

### 6. External Links

- [ ] All `target="_blank"` links have `rel="noopener noreferrer"`
- [ ] External URLs are whitelisted or validated
- [ ] No open redirects via URL parameters

### 7. API Security

- [ ] API base URL comes from environment variable
- [ ] API responses are type-validated before rendering
- [ ] Failed API responses are handled gracefully
- [ ] No sensitive data sent via query parameters
- [ ] AbortController used to prevent data leaks from cancelled requests

### 8. Authentication & Authorisation (if applicable)

- [ ] Tokens stored securely (httpOnly cookies preferred over localStorage)
- [ ] Token expiry is handled with auto-refresh or re-login
- [ ] Protected routes verify auth state before rendering
- [ ] Logout clears all session data

### 9. Build & Deployment

- [ ] Source maps disabled in production (`vite.config.ts`)
- [ ] Debug tools disabled in production
- [ ] Build output doesn't contain `.env` files
- [ ] Azure Static Web Apps config has security headers
- [ ] HTTPS enforced

### 10. Output Format

```markdown
## Security Audit Report

**Date:** YYYY-MM-DD
**Auditor:** GitHub Copilot
**Scope:** Full codebase

### Findings Summary

| #   | Severity | Category | File    | Description |
| --- | -------- | -------- | ------- | ----------- |
| 1   | 🔴       | XSS      | src/... | Description |

### Detailed Findings

#### Finding 1: [Title]

- **Severity:** 🔴 Critical
- **File:** `src/components/...`
- **CWE:** CWE-79
- **Description:** ...
- **Remediation:** ...
```
