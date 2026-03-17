# AGENTS.md — SUPERCOMPUTE

## Session Startup Protocol (REQUIRED — every session)

Before writing any code, creating any file, or taking any action:

1. **Read the Infrastructure Reference**
   https://linear.app/supercompute/document/supercompute-infrastructure-reference-acccf3374c36
   This document contains: all repo names, domains, Coolify UUIDs, server IP,
   secrets locations, active services, wallet addresses, and ENS structure.
   Do not ask Orami for any information that exists in this document.

2. **Read the Architecture Decision: Data Ownership Policy**
   https://linear.app/supercompute/document/architecture-decision-data-ownership-and-anti-vendor-lock-in-policy-48454cbae195
   Before adopting any new service, SDK, or platform — check this document first.

3. **Check the briefing doc in Linear**
   Pull the three living documents from the Claude Code Agent updates project
   in Linear to orient to current state before starting work.

---

## Standing Rules

### One Strike Pivot Rule
If a tool, command, or approach stalls or fails once — pivot immediately.
Do NOT retry the same approach. Use a simpler alternative (curl instead of
a broken MCP tool, direct API call instead of a broken SDK, etc.).
Retrying stalled tools is a session failure mode. Pivot and proceed.

### No Questions If the Answer Exists in Linear
Before asking Orami any question, search Linear for the answer.
Before asking about repos, domains, UUIDs, or server details — read the
Infrastructure Reference document linked above.
Questions that could have been answered from Linear waste human time.

### Coolify Is the Deployment Platform
All deployments go to Coolify on Hetzner (5.78.146.1).
No Vercel. No VibesSDK. No other deployment platform.
Primary database: Postgres on Coolify. Not D1, not Supabase.

### Secrets Come From 1Password
Never hardcode secrets. Never read from .env files committed to git.
Use: `op item get <item> --vault SCOM` or Coolify environment variable injection.

### Context7 for All Code Generation
Add `use context7` to prompts when writing code against any external library.
Priority libraries: OpenZeppelin, Coolify API, Resend, ethers.js, viem.

---

