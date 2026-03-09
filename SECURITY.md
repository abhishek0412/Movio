# Security Policy

## Supported Versions

| Version  | Supported |
| -------- | --------- |
| Latest   | ✅ Yes    |
| < Latest | ❌ No     |

Only the latest deployed version on the `main` branch receives security updates.

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please report it responsibly.

### How to Report

1. **DO NOT** open a public GitHub issue for security vulnerabilities.
2. Email the maintainers at: **[security contact — update this]**
3. Or use [GitHub Security Advisories](https://github.com/abhishek0412/videoparlour/security/advisories/new) to report privately.

### What to Include

- **Description** of the vulnerability
- **Steps to reproduce** the issue
- **Impact assessment** — what an attacker could achieve
- **Suggested fix** (if you have one)
- **Your contact information** for follow-up

### Response Timeline

| Action                          | Timeline               |
| ------------------------------- | ---------------------- |
| Acknowledgement of report       | Within 48 hours        |
| Initial assessment              | Within 5 business days |
| Fix development & testing       | Within 30 days         |
| Public disclosure (coordinated) | After fix is deployed  |

### What Happens Next

1. We will acknowledge your report within 48 hours.
2. We will investigate and validate the vulnerability.
3. We will develop and test a fix.
4. We will deploy the fix and notify you.
5. We will coordinate public disclosure with you.

## Security Standards

This project follows these security practices:

### Application Security (OWASP Top 10)

- **Input Validation**: All user inputs are validated and sanitised.
- **XSS Prevention**: React's built-in escaping is used; `dangerouslySetInnerHTML` is prohibited without DOMPurify.
- **Secrets Management**: No API keys or secrets in source code; environment variables with `VITE_` prefix.
- **External Links**: All `target="_blank"` links include `rel="noopener noreferrer"`.
- **Content Security Policy**: Configured in deployment headers.

### Infrastructure Security

- **HTTPS**: Enforced via Azure Static Web Apps.
- **Security Headers**: X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy.
- **Dependencies**: Regularly audited with `npm audit`.
- **Source Maps**: Disabled in production builds.

### Development Security

- **Pre-commit Hooks**: ESLint + Prettier run on every commit via Husky.
- **Code Review**: All changes require PR review before merging.
- **Branch Protection**: `main` branch is protected with required status checks.
- **Dependency Pinning**: Lock file (`package-lock.json`) is committed and reviewed.

## Dependency Updates

- Dependencies are reviewed monthly for known vulnerabilities.
- Critical vulnerability patches are applied within 72 hours.
- Run `npm audit` to check for known vulnerabilities.

## Acknowledgements

We appreciate responsible disclosure and will acknowledge security researchers who report valid vulnerabilities (with your permission).
