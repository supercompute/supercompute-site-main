# SUPERCOMPUTE Site

Production site for [supercompute.io](https://supercompute.io) — 1 builder, 13 agents, building in public on Base.

**Stack:** Next.js 16 (App Router) · Cloudflare Pages (edge) · Cloudflare D1 · Sanity · RainbowKit · wagmi · viem

---

## Architecture

```
supercompute-site-main (GitHub)
    ↓ push to main
GitHub Actions (.github/workflows/deploy.yml)
    → npx @cloudflare/next-on-pages   (builds + transforms for CF edge)
    → wrangler pages deploy            (pushes to supercompute-site CF Pages project)
    ↓
supercompute.io (Cloudflare Pages)
    ├── Static pages (HTML pre-rendered at build time)
    └── Edge Functions (API routes + middleware — run on CF edge workers)
```

### Key services

| Service | Purpose | Config |
|---------|---------|--------|
| Cloudflare Pages | Hosts the site | Project: `supercompute-site` |
| Cloudflare D1 | Database (`supercompute-db`) | DB ID: `e3c7c7f9-df4a-4e1b-9bc7-97f1faadf282` |
| Cloudflare Workers | `supercompute-api` (separate worker) | `supercompute-api.supercompute.io` |
| Sanity | CMS for blog posts, token data | `lib/sanity.ts` |

---

## Local Development

```bash
npm install
npm run dev        # Next.js dev server at localhost:3000
```

Environment variables go in `.env.local` (never commit this file):

```bash
SESSION_SECRET=<random 32+ char string>
CF_ACCOUNT_ID=c830485ab81a0f5c9ccece564e9b74c5
CF_API_TOKEN=<cloudflare api token with D1:Edit>
CF_D1_DB_ID=e3c7c7f9-df4a-4e1b-9bc7-97f1faadf282
NEXT_PUBLIC_SANITY_PROJECT_ID=<sanity project id>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<sanity write token>
```

---

## Deployment

Deployments are automatic — **push to `main` triggers GitHub Actions → CF Pages deploy**.

### Manual deploy (if needed)

```bash
npm run pages:build        # builds + transforms for CF Pages edge
# then in CF dashboard: manually trigger or use wrangler CLI
```

### GitHub Actions secrets required

Set these in `github.com/supercompute/supercompute-site-main` → Settings → Secrets:

| Secret | Value |
|--------|-------|
| `CLOUDFLARE_API_TOKEN` | CF API token with Pages:Edit permission |
| `CLOUDFLARE_ACCOUNT_ID` | `c830485ab81a0f5c9ccece564e9b74c5` |

### CF Pages environment variables (already set in dashboard)

`SESSION_SECRET`, `CF_ACCOUNT_ID`, `CF_API_TOKEN`, `CF_D1_DB_ID` — set in CF Pages project settings under Production environment.

---

## Authentication (SIWE)

Sign-In with Ethereum (EIP-4361) — no passwords, no email, wallet-only.

**Flow:**
1. User connects wallet via RainbowKit (`/signin`)
2. Frontend fetches nonce from `/api/auth/nonce`
3. User signs EIP-4361 message with their wallet
4. Signature posted to `/api/auth/verify` — verified via viem on Base chain
5. Server issues `sc_session` JWT cookie (HMAC-SHA256, 7-day TTL)
6. `middleware.ts` reads the cookie and protects routes server-side

**Auth files:**
- `lib/auth.ts` — JWT create/verify (Web Crypto API, edge-compatible)
- `middleware.ts` — route protection, redirects to `/signin`
- `context/AuthContext.tsx` — React context, polls `/api/auth/me` on mount
- `app/signin/page.tsx` — two-step sign-in UI

**Protected routes** (require valid session): `/admin`, `/dashboard`, `/assets`, `/alerts`, `/projects`, `/live`

**Admin-only route**: `/admin/*` — requires `role: "admin"` in D1 `users` table. Set manually in D1.

---

## Routes

### Public
| Route | Status | Notes |
|-------|--------|-------|
| `/` | Live | Homepage |
| `/token` | Live | $SCOM token info |
| `/store` | Live | Store page |
| `/blog` | Live | Blog list (Sanity) |
| `/blog/[slug]` | Live | Blog post (Sanity, edge) |
| `/community` | Live | Community page |
| `/consulting` | Live | Consulting page |
| `/school` | Live | Web3 School |
| `/signin` | Live | SIWE wallet sign-in |

### Protected (requires wallet sign-in)
| Route | Status | Notes |
|-------|--------|-------|
| `/dashboard` | Stub | Phase 2 — Live Monitor |
| `/assets` | Stub | Phase 2 — Portfolio tracker |
| `/newsdesk` | Stub | Phase 2 — NewsDesk |
| `/alerts` | Stub | Phase 2 — Alerts |
| `/live` | Stub | Phase 3 — LiveStream |
| `/projects` | Live | Project list (D1) |
| `/projects/[id]` | Live | Project detail + edit (D1, edge) |

### Admin only
| Route | Status | Notes |
|-------|--------|-------|
| `/admin` | Live | Admin overview |
| `/admin/projects` | Live | Project CRUD |

---

## API Routes (Edge Functions)

All API routes run as Cloudflare Edge Functions.

```
/api/auth/nonce       GET  — Returns a random nonce for SIWE message construction
/api/auth/verify      POST — Verifies SIWE signature, issues sc_session cookie
/api/auth/me          GET  — Returns session state from cookie
/api/auth/logout      POST — Clears sc_session cookie

/api/content/tokens        GET/PUT/POST/DELETE — Token data via Sanity
/api/content/projects      GET/POST/PUT/DELETE — Projects via D1
/api/content/projects/[id] GET/PUT/DELETE      — Single project via D1
/api/content/protocols     GET/POST/PUT/DELETE — Protocols via D1
```

---

## Database (Cloudflare D1)

Database name: `supercompute-db`

Access is via REST API (`lib/d1.ts`) — no Wrangler binding, works from any runtime.

**Key tables:** `users` (wallet_address, role), `projects`, `protocols`

To query directly:
```bash
wrangler d1 execute supercompute-db --command "SELECT * FROM users LIMIT 10"
```

To promote a wallet to admin:
```bash
wrangler d1 execute supercompute-db \
  --command "UPDATE users SET role='admin' WHERE wallet_address='0xyouraddress'"
```

---

## Build notes

- **`@cloudflare/next-on-pages`** v1.13.16 supports Next.js ≤15.5.2 — we use `legacy-peer-deps=true` in `.npmrc` to install with Next.js 16. The build works at runtime.
- All dynamic routes and API routes must export `export const runtime = "edge"` — CF Pages does not support Node.js runtime.
- The `siwe` npm package requires `ethers` (Node.js-only). It was replaced with `viem/siwe` everywhere.
- `middleware.ts` will show a deprecation warning in Next.js 16 (renamed to `proxy.ts` in that version) but `@cloudflare/next-on-pages` requires the old `middleware.ts` convention.

---

## What's next (Phase 2)

- [ ] Build out `/dashboard` — live monitor (on-chain activity, agent status)
- [ ] Build out `/assets` — portfolio tracker pulling wallet holdings
- [ ] Build out `/alerts` — price/event alerts with email/push
- [ ] Build out `/newsdesk` — AI-generated news feed
- [ ] Upgrade `@cloudflare/next-on-pages` when Next.js 16 support lands
- [ ] Rename `middleware.ts` → `proxy.ts` once next-on-pages supports it
- [ ] Add role-based content gating (admin dashboard vs user dashboard)
