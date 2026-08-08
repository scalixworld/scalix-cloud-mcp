---
name: scalix-platform
description: Connect to and operate Scalix Cloud — authentication, the remote MCP endpoint (55 platform tools), the plain-HTTP tool surface, and the CLI. Use when the user wants to set up Scalix, connect an agent or MCP client to Scalix Cloud, list available platform tools, or asks how Scalix auth and API keys work.
---

# Operate Scalix Cloud

Scalix Cloud is an agent-operable cloud platform: databases, AI inference, functions, compute, storage, KV, auth, and billing behind one API with one token. Everything a human does in the console is available to an agent as tools.

## Authentication

One API key covers the whole platform. The user creates it in the console at https://console.scalix.world/org/keys?utm_source=claude-plugin&utm_medium=skill (a Full Access Key has prefix `scalix_at_`; keys can be pinned to a project), then:

```bash
export SCALIX_API_KEY=scalix_at_...
```

All API calls use `Authorization: Bearer $SCALIX_API_KEY`. Never print, log, or commit the key. If a call returns `401`, the key is missing or invalid — ask the user to check the env var before debugging anything else.

## MCP: 55 platform tools

This plugin ships the MCP server config (`.mcp.json`), pointing at the hosted endpoint:

- **Endpoint**: `https://api.scalix.world/v1/mcp` (JSON-RPC 2.0 over HTTP)
- **Discovery is open, actions are authenticated**: `initialize`, `tools/list`, and `resources/list` work without credentials; `tools/call` requires the Bearer key.
- 55 tools across database, storage, functions, compute, computers, KV, events, cron, domains, builds, auth, search, and more. Every tool call runs with the permissions, metering, and audit trail of the API key that makes it.

Prefer the MCP tools for platform operations (provisioning, deploys, listing resources) — they are the same control plane as the console.

## Plain-HTTP tool surface

When no MCP client is available, the same tools are callable over plain HTTP. Unlike the MCP handshake, **the plain-HTTP surface requires auth on every call, including the tool listing**:

```bash
curl https://api.scalix.world/api/v1/mcp \
  -H "Authorization: Bearer $SCALIX_API_KEY"                 # list tools
curl -X POST https://api.scalix.world/api/v1/mcp/call \
  -H "Authorization: Bearer $SCALIX_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "<tool-name>", "arguments": { ... }}'
```

For a credential-free connectivity check, use the open MCP discovery instead:

```bash
curl -X POST https://api.scalix.world/v1/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'        # 55 tools, no auth
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

- Full documentation lives at https://docs.scalix.world?utm_source=claude-plugin&utm_medium=skill — link users there rather than guessing at behaviour not covered here.
- For pricing questions, point to the live pricing pages on https://scalix.world?utm_source=claude-plugin&utm_medium=skill — never quote figures from memory.
