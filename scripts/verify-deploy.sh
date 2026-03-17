#!/bin/bash
# scripts/verify-deploy.sh
#
# Coolify deploy gate for supercompute.io
#
# Polls Coolify until the deployment finishes, then runs smoke tests.
# Exits 0 = promote, non-zero = block + file Linear Urgent issue.
#
# Usage:
#   ./scripts/verify-deploy.sh <deployment_uuid>
#   ./scripts/verify-deploy.sh                    # skip poll, run smoke only
#
# Env:
#   COOLIFY_API_TOKEN   — Coolify API token (required for deploy poll)
#   LINEAR_API_KEY      — Linear API key (required for alerting)
#   COOLIFY_API_URL     — Coolify base URL (default: https://app.coolify.io)
#   POLL_TIMEOUT        — max seconds to wait for deploy (default: 600)
#   POLL_INTERVAL       — seconds between polls (default: 10)

set -euo pipefail

DEPLOYMENT_UUID="${1:-}"
COOLIFY_API_URL="${COOLIFY_API_URL:-https://app.coolify.io}"
POLL_TIMEOUT="${POLL_TIMEOUT:-600}"
POLL_INTERVAL="${POLL_INTERVAL:-10}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

FAILED_STEPS=()

# ── Helpers ──────────────────────────────────────────────────────────────────

log()  { echo "[verify-deploy] $*"; }
fail() { echo "[verify-deploy] FAIL: $*"; FAILED_STEPS+=("$*"); }

file_linear_issue() {
  local title="$1"
  local body="$2"

  if [ -z "${LINEAR_API_KEY:-}" ]; then
    log "LINEAR_API_KEY not set — skipping Linear alert"
    return
  fi

  local team_resp team_id
  team_resp=$(curl -s -X POST https://api.linear.app/graphql \
    -H "Authorization: $LINEAR_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{"query": "{ teams { nodes { id name } } }"}')
  team_id=$(echo "$team_resp" | jq -r '.data.teams.nodes[0].id // empty')

  [ -z "$team_id" ] && log "WARNING: could not resolve Linear team ID" && return

  local resp issue_url issue_id
  resp=$(curl -s -X POST https://api.linear.app/graphql \
    -H "Authorization: $LINEAR_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$(jq -n \
      --arg title "$title" \
      --arg desc "$body" \
      --arg teamId "$team_id" \
      '{"query":"mutation($input:IssueCreateInput!){issueCreate(input:$input){success issue{identifier url}}}",
        "variables":{"input":{"title":$title,"description":$desc,"teamId":$teamId,"priority":1}}}')")

  issue_url=$(echo "$resp" | jq -r '.data.issueCreate.issue.url // empty')
  issue_id=$(echo "$resp"  | jq -r '.data.issueCreate.issue.identifier // empty')

  if [ -n "$issue_url" ]; then
    log "Linear Urgent issue filed: $issue_id — $issue_url"
  else
    log "WARNING: Linear issue may not have been created."
  fi
}

# ── Step 1: Poll Coolify deployment status ───────────────────────────────────

if [ -n "$DEPLOYMENT_UUID" ]; then
  if [ -z "${COOLIFY_API_TOKEN:-}" ]; then
    fail "COOLIFY_API_TOKEN not set — cannot poll deployment status"
  else
    log "Polling Coolify deployment $DEPLOYMENT_UUID (timeout: ${POLL_TIMEOUT}s)..."
    elapsed=0
    while [ "$elapsed" -lt "$POLL_TIMEOUT" ]; do
      resp=$(curl -s \
        -H "Authorization: Bearer $COOLIFY_API_TOKEN" \
        "$COOLIFY_API_URL/api/v1/deployments/$DEPLOYMENT_UUID")

      status=$(echo "$resp" | jq -r '.status // empty')
      log "  status: $status (${elapsed}s elapsed)"

      case "$status" in
        finished)
          log "Deployment finished successfully."
          break
          ;;
        failed|error)
          fail "Deployment $DEPLOYMENT_UUID failed (status: $status)"
          break
          ;;
        "")
          fail "Empty status response from Coolify API"
          break
          ;;
      esac

      sleep "$POLL_INTERVAL"
      elapsed=$((elapsed + POLL_INTERVAL))
    done

    if [ "$elapsed" -ge "$POLL_TIMEOUT" ]; then
      fail "Deployment poll timed out after ${POLL_TIMEOUT}s"
    fi
  fi
else
  log "No deployment UUID provided — skipping Coolify poll."
fi

# ── Step 2: Smoke tests ──────────────────────────────────────────────────────

log "Running smoke tests..."
if bash "$SCRIPT_DIR/smoke-test.sh"; then
  log "Smoke tests passed."
else
  fail "Smoke tests failed"
fi

# ── Result ───────────────────────────────────────────────────────────────────

TIMESTAMP=$(date -u '+%Y-%m-%d %H:%M UTC')

if [ "${#FAILED_STEPS[@]}" -eq 0 ]; then
  log "All checks passed. Deploy gate: OPEN ✅"
  exit 0
fi

log "Deploy gate: BLOCKED 🚨 — ${#FAILED_STEPS[@]} step(s) failed:"
for step in "${FAILED_STEPS[@]}"; do
  log "  • $step"
done

STEPS_LIST=$(printf -- "- %s\n" "${FAILED_STEPS[@]}")
file_linear_issue \
  "🚨 Deploy gate blocked — supercompute.io ($TIMESTAMP)" \
  "Deploy verification failed at $TIMESTAMP.\n\n**Failed steps:**\n$STEPS_LIST\n\n**Deployment UUID:** ${DEPLOYMENT_UUID:-n/a}"

exit 1
