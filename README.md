# ICEMAN BOT — Control Center

Private admin dashboard for a learning/development platform, contextual Practice AI, projects, encrypted backups, and optional Baileys phone-number pairing.

## Honest feature status

The 49 learning areas and 16 tool categories are catalogued. Implemented starter features include password-only admin login, responsive dashboard, saved text projects, progress records, encrypted settings, encrypted server backup/download/restore, Gemini/OpenAI official API host integration, basic HTML preview and a basic HTML requirements checker, and Baileys pairing routes. Arbitrary code execution, a production-grade code sandbox, local LLM inference/model downloads, Word/Excel engines, and video generation are not included and must not be advertised as available. AI feedback is not a substitute for a real runtime/test result.

## Flat-file layout

All application files are at the repository root to make individual GitHub uploads easier. The server only serves the five named frontend assets; it does not expose server modules or private data as static files.

## Run locally

Requires Node.js 20+. Set environment variables before starting. Copy `.env.example` as a reference; this app does not load `.env` automatically.

Generate a session secret and encryption key separately:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Use one output for `SESSION_SECRET` and another for `SETTINGS_ENCRYPTION_KEY`. The encryption key must be exactly 64 hex characters. Set `ADMIN_PASSWORD` to a unique password of at least 12 characters, then run:

```bash
npm install
npm start
```

Open `http://localhost:3000`.

## Render

The included blueprint expects a persistent disk at `/var/data`. Review current Render plan/storage costs. Set `ADMIN_PASSWORD` and `SETTINGS_ENCRYPTION_KEY`; the blueprint generates `SESSION_SECRET`. Do not commit real secrets. This is the flat-file edition: keep all source files at repository root. Its start command is `node server.js`, and frontend assets are explicitly allowlisted so backend files are not exposed as static files.

## Security and sale-readiness

Only pair a WhatsApp account whose owner intentionally completes pairing. Keep session files and backups private. Do not add unrestricted shell execution or arbitrary `eval`. Before selling, perform a security audit, test session expiry, backup/restore, provider errors, WhatsApp reconnects, storage capacity, accessibility, dependency licences, and implement/test a real sandbox and remaining tools. This starter has not been independently audited.
