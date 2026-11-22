---
description: Connect this workspace to Scalix Cloud — verify OAuth 2.1 or API key auth, test the MCP endpoint, and optionally install the CLI
---

Walk the user through connecting to Scalix Cloud. Follow these steps in order and report each result plainly:

1. **Verify endpoint discovery & OAuth 2.1 (no key required).** Confirm unauthenticated OAuth 2.1 resource metadata discovery works:
   `curl -sf https://api.scalix.world/.well-known/oauth-protected-resource`
   Verify `"resource":"https://api.scalix.world/v1/mcp"` comes back (an unauthenticated `POST /v1/mcp` returns HTTP `401` with `WWW-Authenticate` so OAuth-capable clients open browser consent at `https://console.scalix.world/oauth/consent`).
2. **Test the MCP connection.** If you connected via OAuth 2.1 in your editor/agent, call the `scalix_status` MCP tool to verify access to the active project. If running headless without OAuth, check for `SCALIX_API_KEY` (create one at `https://console.scalix.world/org/keys` if absent — never echo its value back) and list tools via JSON-RPC:
   `curl -s -X POST https://api.scalix.world/v1/mcp -H "Authorization: Bearer $SCALIX_API_KEY" -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'`
   Report the actual count returned rather than hardcoding a fixed number.
3. **Verify REST / SQL access (optional headless check).** If `SCALIX_API_KEY` is set, run one lightweight check (`POST https://api.scalix.world/api/v1/sql` with `{"query": "SELECT 1"}`). A `401` means the key is invalid or expired.
4. **CLI (optional).** If the user wants the terminal workflow: `npm install -g scalix-cloud`, then `scalix-cloud login` and `scalix-cloud whoami`.

If every step passes, summarise what is now available: the active project via MCP, browser OAuth or API key authentication, and the CLI if installed.
