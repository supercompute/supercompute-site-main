#!/bin/bash
# scripts/smoke-test.sh
#
# Smoke test for supercompute.io — checks HTTP 200, files a Linear Urgent issue on failure.
#
# Usage:
#   ./scripts/smoke-test.sh
#   ./scripts/smoke-test.sh https://supercompute.io   # override URL
#
# Env:
#   LINEAR_API_KEY   — Linear personal API key (required for alerting)
#   LINEAR_TEAM_ID   — Linear team ID to file issue against (default: MOLT team)
#   SMOKE_URL        — URL to test (default: https://supercompute.io)

set -euo pipefail

URL="${1:-${SMOKE_URL:-https://supercompute.io}}"
MAX_RETRIES=3
RETRY_DELAY=5

# ── Check ────────────────────────────────────────────────────────────────────

echo "Smoke test: $URL"

for i in $(seq 1 $MAX_RETRIES); do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "$URL")
  if [ "$STATUS" = "200" ]; then
    echo "OK: $URL → HTTP $STATUS"
    exit 0
  fi
  echo "Attempt $i/$MAX_RETRIES: got HTTP $STATUS (expected 200)"
  [ "$i" -lt "$MAX_RETRIES" ] && sleep $RETRY_DELAY
done

echo "FAIL: $URL returned HTTP $STATUS after $MAX_RETRIES attempts"

# ── Alert ────────────────────────────────────────────────────────────────────

if [ -z "${LINEAR_API_KEY:-}" ]; then
  echo "LINEAR_API_KEY not set — skipping Linear alert"
  exit 1
fi

TIMESTAMP=$(date -u '+%Y-%m-%d %H:%M UTC')
TITLE="🚨 supercompute.io down — HTTP $STATUS ($TIMESTAMP)"
BODY="Smoke test failed after $MAX_RETRIES attempts.\n\n- **URL:** $URL\n- **Status:** HTTP $STATUS (expected 200)\n- **Time:** $TIMESTAMP\n- **Source:** GitHub Actions smoke-test cron"

# Resolve team ID
if [ -z "${LINEAR_TEAM_ID:-}" ]; then
  TEAM_RESP=$(curl -s -X POST https://api.linear.app/graphql \
    -H "Authorization: $LINEAR_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{"query": "{ teams { nodes { id name } } }"}')
  LINEAR_TEAM_ID=$(echo "$TEAM_RESP" | jq -r '.data.teams.nodes[0].id // empty')
fi

if [ -z "$LINEAR_TEAM_ID" ]; then
  echo "ERROR: Could not resolve Linear team ID. Alert not filed."
  exit 1
fi

# Create Urgent issue (priority 1)
ISSUE_QUERY=$(jq -n \
  --arg title "$TITLE" \
  --arg desc "$BODY" \
  --arg teamId "$LINEAR_TEAM_ID" \
  '{
    "query": "mutation($input: IssueCreateInput!) { issueCreate(input: $input) { success issue { id identifier url } } }",
    "variables": {
      "input": {
        "title": $title,
        "description": $desc,
        "teamId": $teamId,
        "priority": 1
      }
    }
  }')

ISSUE_RESP=$(curl -s -X POST https://api.linear.app/graphql \
  -H "Authorization: $LINEAR_API_KEY" \
  -H "Content-Type: application/json" \
  -d "$ISSUE_QUERY")

ISSUE_URL=$(echo "$ISSUE_RESP" | jq -r '.data.issueCreate.issue.url // empty')
ISSUE_ID=$(echo "$ISSUE_RESP" | jq -r '.data.issueCreate.issue.identifier // empty')

if [ -n "$ISSUE_URL" ]; then
  echo "Linear issue filed: $ISSUE_ID — $ISSUE_URL"
else
  echo "WARNING: Linear issue may not have been created. Response: $ISSUE_RESP"
fi

exit 1
