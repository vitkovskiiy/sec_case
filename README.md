# github-release-notifier

A backend service that watches GitHub repositories for new releases and emails subscribers when a new version drops.

Built with Node.js, TypeScript, and PostgreSQL. Follows Clean Architecture and Domain-Driven Design to keep business logic decoupled from frameworks and infrastructure.

---

## How it works

1. A user subscribes to a repository via the REST API, providing their email and the target repo.
2. The service sends a confirmation email with a unique token. The subscription activates only after the user clicks the link.
3. A background cron job runs on a schedule, querying the GitHub API for each tracked repository.
4. When a new tag or release is detected, the service records it in the database and sends an email notification to all confirmed subscribers of that repo.
5. Users can unsubscribe at any time using a token included in every notification email.

---
## API Endpoints:

### POST /subscribe — Create a new subscription.

### GET /confirm?token=... — Confirm subscription.

### GET /subscriptions?email=... — List active subscriptions.

### POST /unsubscribe — Remove subscription.
## Architecture

The project is split into four layers. Each layer only depends on the one below it — the domain has no external dependencies at all.

**Domain** (`src/domain`)
Contains the core entities (`Subscription`, `Token`), repository interfaces, and custom error classes. No framework code here. This layer defines *what* the system does, not *how*.

**Application** (`src/application`)
Use-case services (`SubscribeService`, `ScannerService`) that orchestrate the domain and infrastructure. This layer knows nothing about HTTP or databases — it only works through the interfaces defined in the domain.

**Infrastructure** (`src/infrastructure`)
Concrete implementations: PostgreSQL repositories via `pg`, `GitHubChecker` via Axios, `Mailer` via Nodemailer, and the cron scheduler via `node-cron`.

**Presentation** (`src/presentation`)
Express controllers, route definitions, and DTOs for validating incoming request payloads.

Dependencies are wired manually in `composition.root.ts` — no DI framework overhead.

---

## Design decisions

**Repository pattern** — all database access goes through interfaces defined in the domain. Swapping PostgreSQL for another database requires only a new infrastructure implementation, with zero changes to business logic.

**Token-based confirmation** — subscriptions are inactive until confirmed. This prevents junk subscriptions and verifies email ownership before any notifications are sent.

**Centralised error handling** — a `DomainError` class carries a user-facing message and an internal code. Controllers catch it and return a clean JSON response; unexpected errors are logged separately and return a generic 500.

**Idempotent scanning** — the scanner stores the last known tag for each repository. On every run it compares the current latest tag from GitHub against the stored one. A notification is only sent when the value changes, so re-runs never produce duplicate emails.

---

## Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 20+ |
| Language | TypeScript |
| HTTP | Express |
| Database | PostgreSQL (`pg`) |
| Email | Nodemailer (SMTP) |
| GitHub API | Axios |
| Scheduler | node-cron |
| Tests | Vitest |
| CI | GitHub Actions |


* **Monitoring**: prom-client (Prometheus metrics)
---

## Getting started

**Prerequisites:** Node.js 20+, a running PostgreSQL instance, an SMTP account.

```bash
git clone https://github.com/your-username/sec_case.git
cd sec_case
npm install
```

Create a `.env` file:

```
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/dbname
GITHUB_TOKEN=your_github_personal_access_token
SMTP_HOST=smtp.gmail.com
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

```bash
npm run dev        # development with hot reload
npm run build      # compile to dist/
npm start          # run compiled build
npm run test       # run all tests
```

---

## Testing

**Unit tests** cover application services and repository logic in isolation. All external dependencies (database, HTTP clients, mailer) are mocked.

**Integration tests** spin up the full Express app and run real HTTP requests against it, verifying that controllers, services, and the database work correctly end to end.

Vitest was chosen for its native TypeScript support and fast execution without a separate compilation step.

## 🚀 Features
* ...
* **Monitoring**: Prometheus-compatible `/metrics` endpoint for real-time service health tracking (CPU, RAM, Event Loop).

