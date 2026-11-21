---
name: scalix-platform
description: Connect to and operate Scalix Cloud through the remote MCP endpoint, the plain-HTTP tool surface, and the CLI. Use when the user wants to set up Scalix, connect an agent or MCP client to Scalix Cloud, list available platform tools, or asks how Scalix auth and API keys work.
---

# Operate Scalix Cloud

Scalix Cloud is an agent-operable cloud platform: databases, AI inference, functions, computers, storage, KV, auth, and billing behind one API with one token. Everything a human does in the console is available to an agent as tools.

## Authentication

Scalix Cloud MCP (`https://api.scalix.world/v1/mcp`) supports **OAuth 2.1 browser consent** (for VS Code, GitHub Copilot, Claude, ChatGPT, and other OAuth-capable MCP clients) and **API key Bearer tokens** (for headless CLI, CI, or `.mcp.json` configs).

For an API key, create one in the console at https://console.scalix.world/org/keys (a Full Access Key has prefix `scalix_at_`; keys can be pinned to a project), then:

```bash
export SCALIX_API_KEY=scalix_at_...
```

All authenticated API calls use `Authorization: Bearer $SCALIX_API_KEY` (or an OAuth access token minted through `https://console.scalix.world/oauth/consent`). Never print, log, or commit the key or token. If a REST call returns `401`, the key is missing or invalid — ask the user to check the env var (or re-authenticate via OAuth) before debugging anything else.

## MCP endpoint

This plugin ships the MCP server config (`.mcp.json`), pointing at the hosted endpoint:

- **Endpoint**: `https://api.scalix.world/v1/mcp` (JSON-RPC 2.0 over Streamable HTTP)
- **Authentication**: All `POST` / `GET` requests to `/v1/mcp` require a valid Bearer credential (`OAuth 2.1` access token or `scalix_at_...` API key). Unauthenticated requests return HTTP `401` with an RFC 9728 `WWW-Authenticate` challenge pointing to `https://api.scalix.world/.well-known/oauth-protected-resource` so OAuth-capable clients automatically launch the browser consent flow.
- 53 tools across 16 families, measured live (`db 9 · computer 9 · storage 6 · run 5 · crew 3 · domain 3 · fn 3 · kv 3 · ai 2 · build 2 · events 2 · project 2 · auth 1 · cron 1 · sandbox 1 · status 1`). Counts move with deploy gates: `scalix_search` and `scalix_usage` are withheld when their flags are off, and the computer/crew families appear only when `SCALIX_COMPUTERS_ENABLED` / `SCALIX_CREW_ENABLED` are on. Do not quote a fixed number in public material — measure it with `tools/list` (the org repo's `ops/tools/registry-health.py` guards the registry description against the live count). Every tool call runs with the permissions, metering, and audit trail of the OAuth token or API key that makes it.

Prefer the MCP tools for platform operations (provisioning, deploys, listing resources) — they are the same control plane as the console.

## Plain-HTTP tool surface

When no MCP client is available, the same tools are callable over plain HTTP (**requires Bearer auth on every call**):

```bash
curl https://api.scalix.world/api/v1/mcp \
  -H "Authorization: Bearer $SCALIX_API_KEY"                 # list tools
curl -X POST https://api.scalix.world/api/v1/mcp/call \
  -H "Authorization: Bearer $SCALIX_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "<tool-name>", "arguments": { ... }}'
```

Or check credential-free OAuth metadata and list tools with a Bearer token over JSON-RPC:

```bash
curl -sf https://api.scalix.world/.well-known/oauth-protected-resource
curl -X POST https://api.scalix.world/v1/mcp \
  -H "Authorization: Bearer $SCALIX_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'        # 53 tools (measure; gates move it)
```

## CLI

The CLI is a native binary named `scalix-cloud`:

```bash
npm install -g scalix-cloud     # or: brew install scalixworld/tap/scalix-cloud
scalix-cloud login              # authenticate with the API key
scalix-cloud whoami             # verify identity
```

Command groups: `db`, `fn`, `storage`, `kv`, `ai`. It does not self-update; update with `npm update -g scalix-cloud`.

## SDKs

- TypeScript/JavaScript: `npm install @scalix-world/sdk`
- Python: `pip install scalix-sdk`

Both are generated from the platform OpenAPI spec and cover every service with the same single token.

## Ground rules

- Full documentation lives at https://docs.scalix.world — link users there rather than guessing at behaviour not covered here.
- For pricing questions, point to the live pricing pages on https://scalix.world — never quote figures from memory.
