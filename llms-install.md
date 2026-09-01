# Installing the Scalix Cloud MCP server (for AI agents)

Scalix Cloud is a hosted, remote MCP server. There is nothing to download, build, or run
locally. Configuration is one URL and one API key.

- Endpoint: `https://api.scalix.world/v1/mcp` (streamable HTTP)
- Auth: `Authorization: Bearer <SCALIX_API_KEY>` header
- Get a key: sign in at https://console.scalix.world and create an API key for your project
- Discovery (`initialize`, `tools/list`) works without credentials; tool calls require the key

## Claude Code

```bash
claude mcp add --transport http scalix https://api.scalix.world/v1/mcp \
  --header "Authorization: Bearer $SCALIX_API_KEY"
```

Verify with `claude mcp list` or `/mcp` inside a session.

## Cline

Add to `cline_mcp_settings.json` (Settings → MCP Servers → Configure):

```json
{
  "mcpServers": {
    "scalix": {
      "url": "https://api.scalix.world/v1/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_SCALIX_API_KEY"
      },
      "type": "streamableHttp"
    }
  }
}
```

## Cursor / other MCP clients

Any client that supports remote streamable-HTTP MCP servers takes the same two values:
the URL above and the Authorization header.

```json
{
  "mcpServers": {
    "scalix": {
      "url": "https://api.scalix.world/v1/mcp",
      "headers": { "Authorization": "Bearer YOUR_SCALIX_API_KEY" }
    }
  }
}
```

## What you get

53 tools covering the Scalix World platform: run queries and migrations against
Postgres-compatible databases, create and drop database branches, deploy services and
functions in isolated microVMs, manage object storage, read logs and status, and check
usage and billing. One API key authorizes all of it. Consequential actions pause for
human approval.

Troubleshooting: a `401` on tool calls means the key is missing or wrong (discovery still
works unauthenticated by design). Keys are project-scoped; create them in the console.
