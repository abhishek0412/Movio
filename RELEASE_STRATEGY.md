# Movio — Release & Rollout Strategy

## Overview

Movio is a multi-regional application deployed to **Azure Static Web Apps** across three regions: **US**, **EU**, and **APAC**. Deployments are managed through **Azure DevOps pipelines** with environment-specific approval gates.

---

## Environments

| Environment | Regions | Trigger   | Approval Gate |
| ----------- | ------- | --------- | ------------- |
| QA          | US only | Automatic | None          |
| Staging     | All     | On-demand | Manual        |
| Production  | All     | On-demand | Manual        |

---

## Pipelines

### 1. Buddy Pipeline (`pipelines/buddy-pipeline.yml`)

- **Trigger:** Every push to any branch.
- **Purpose:** Fast feedback loop for developers. Validates lint, type-check, format, tests, and build on every check-in.
- **Deploys:** Nothing — validation only.

### 2. PR Pipeline (`pipelines/pr-pipeline.yml`)

- **Trigger:** Pull request raised targeting `main`.
- **Purpose:** Gate-check before merge. Runs full validation and publishes a build artifact for review.
- **Deploys:** Nothing — validation only.

### 3. Official Pipeline (`pipelines/official-pipeline.yml`)

- **Trigger:** Merge to `main`.
- **Purpose:** Official build and progressive rollout through QA → Staging → Production.
- **Stages:**

```
  Build & Test
       │
       ▼
  Deploy QA (US only) ── automatic
       │
       ▼
  Deploy Staging (US, EU, APAC) ── on-demand, manual approval
       │
       ▼
  Deploy Production (US, EU, APAC) ── on-demand, manual approval
```

---

## Rollout Flow

### Step 1 — Build

Every merge to `main` triggers a full build:

1. Install dependencies (`npm ci`)
2. Lint (`npm run lint`)
3. Type check (`npm run typecheck`)
4. Format check (`npm run format:check`)
5. Unit tests (`npm test`)
6. Build (`npm run build`)
7. Publish artifact (`movio-build`)

### Step 2 — QA (Automatic, US only)

- Deploys **automatically** after a successful build.
- Targets **US region only** — keeps QA fast and cost-efficient.
- No approval gate required.
- QA environment is continuously updated with the latest official build.

### Step 3 — Staging (On-demand, All Regions)

- Triggered **on-demand** via manual approval in Azure DevOps.
- Deploys to **all regions in parallel** (US, EU, APAC).
- Used for final validation before production — integration testing, performance checks, stakeholder sign-off.
- Configure approval gate on the `movio-staging` environment in Azure DevOps.

### Step 4 — Production (On-demand, All Regions)

- Triggered **on-demand** via manual approval in Azure DevOps.
- Deploys to **all regions in parallel** (US, EU, APAC).
- Configure approval gate on the `movio-production` environment in Azure DevOps.
- Post-deployment: monitor health dashboards, error rates, and performance metrics.

---

## Multi-Regional Deployment

| Region | Identifier | Azure SWA Token Variable          |
| ------ | ---------- | --------------------------------- |
| US     | `us`       | `AZURE_SWA_DEPLOYMENT_TOKEN_US`   |
| EU     | `eu`       | `AZURE_SWA_DEPLOYMENT_TOKEN_EU`   |
| APAC   | `apac`     | `AZURE_SWA_DEPLOYMENT_TOKEN_APAC` |

- Each region has its own Azure Static Web App instance.
- Region-specific deployment tokens are stored in Azure DevOps variable groups (`movio-qa`, `movio-staging`, `movio-prod`).
- Staging and Production deploy to all three regions **in parallel** within the same stage.
- QA deploys to **US only**.

---

## Azure DevOps Configuration

### Variable Groups

Create three variable groups in Azure DevOps → Pipelines → Library:

| Variable Group  | Variables                                       |
| --------------- | ----------------------------------------------- |
| `movio-qa`      | `AZURE_SWA_DEPLOYMENT_TOKEN_US`                 |
| `movio-staging` | `AZURE_SWA_DEPLOYMENT_TOKEN_US`, `_EU`, `_APAC` |
| `movio-prod`    | `AZURE_SWA_DEPLOYMENT_TOKEN_US`, `_EU`, `_APAC` |

### Environments & Approval Gates

Create three environments in Azure DevOps → Pipelines → Environments:

| Environment        | Approval Gate            |
| ------------------ | ------------------------ |
| `movio-qa`         | None (auto-deploy)       |
| `movio-staging`    | Manual approval required |
| `movio-production` | Manual approval required |

To add approval gates:

1. Go to **Pipelines → Environments → (select environment)**.
2. Click **Approvals and checks → Add check → Approvals**.
3. Add required approvers.

---

## Rollback Strategy

- **Immediate rollback:** Re-run the official pipeline for a previous successful build from Azure DevOps → Pipelines → Runs → select previous run → Re-run stage.
- **Hotfix:** Create a `hotfix/*` branch, push fix, merge to `main` — triggers the official pipeline automatically.
- All regions roll back simultaneously for Staging and Production.

---

## Environment Files

| File              | Purpose                        | Committed |
| ----------------- | ------------------------------ | --------- |
| `.env.example`    | Template for local development | Yes       |
| `.env`            | Local development values       | No        |
| `.env.qa`         | QA environment config          | No        |
| `.env.staging`    | Staging environment config     | No        |
| `.env.production` | Production environment config  | No        |

> **Note:** Runtime environment variables for deployed environments are injected via Azure DevOps variable groups and Azure Portal Application Settings — not via `.env` files.
