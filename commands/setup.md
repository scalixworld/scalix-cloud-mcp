---
description: Connect this workspace to Scalix Cloud — verify the API key, test the MCP endpoint, and optionally install the CLI
---

Walk the user through connecting to Scalix Cloud. Follow these steps in order and report each result plainly:

1. **Check for a key.** Look for `SCALIX_API_KEY` in the environment. If absent, tell the user to create one at https://console.scalix.world/org/keys?utm_source=claude-plugin&utm_medium=skill and export it as `SCALIX_API_KEY`. Never echo the key's value back.
2. **Verify the endpoint.** Call the open MCP discovery (no auth needed): `curl -s -X POST https://api.scalix.world/v1/mcp -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'` and confirm the 55-tool catalog comes back. This proves connectivity independent of the key. (The plain-HTTP `GET /api/v1/mcp` listing requires auth — don't use it for this step.)
3. **Verify the key.** Make one authenticated call (for example `POST https://api.scalix.world/api/v1/sql` with `{"query": "SELECT 1"}`). A `401` means a bad or missing key — say so and stop; anything else confirms the connection.
4. **MCP tools.** Remind the user this plugin already ships the MCP server config; after setting the env var they may need to restart Claude Code for the `scalix` server to connect.
5. **CLI (optional).** If the user wants the terminal workflow: `npm install -g scalix-cloud`, then `scalix-cloud login` and `scalix-cloud whoami`.

If every step passes, summarise what is now available: 55 platform MCP tools, the REST API, and the CLI if installed.
