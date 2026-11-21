# Installing the Scalix Cloud MCP server (for AI agents)

Scalix Cloud is a hosted, remote MCP server. There is nothing to download, build, or run
locally. Configuration is one URL and one API key.

- Endpoint: `https://api.scalix.world/v1/mcp` (streamable HTTP)
- Auth: OAuth 2.1 browser consent (recommended — clients follow the RFC 9728 `401` `WWW-Authenticate` challenge automatically) or `Authorization: Bearer <SCALIX_API_KEY>` header
- Get a key: sign in at https://console.scalix.world and create an API key for your project
- Metadata discovery: `GET https://api.scalix.world/.well-known/oauth-protected-resource` works without credentials; `/v1/mcp` requests require OAuth 2.1 or a Bearer API key

## VS Code & GitHub Copilot (OAuth 2.1)

Install `world.scalix/cloud` from the `@mcp` Extensions gallery or GitHub MCP Registry. On first tool use, VS Code opens `https://console.scalix.world/oauth/consent` in your browser — pick a project and click **Allow**. No manual API key configuration required.

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

Troubleshooting: a `401` on `/v1/mcp` means no valid OAuth token or API key was supplied (use `GET https://api.scalix.world/.well-known/oauth-protected-resource` for credential-free discovery). Keys are project-scoped; create them in the console.
