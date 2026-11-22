# Installing the Scalix Cloud MCP Server (for AI Agents)

Scalix Cloud is a hosted, remote MCP server. There is nothing to build or run locally — configuration is a single Streamable HTTP URL with native OAuth 2.1 browser consent.

- **Endpoint:** `https://api.scalix.world/v1/mcp` (Streamable HTTP)
- **Auth (Recommended):** OAuth 2.1 browser consent — omit static `Authorization` headers; clients follow the RFC 9728 `401` `WWW-Authenticate` challenge automatically and open `https://console.scalix.world/oauth/consent`.
- **Auth (Headless / CI):** Create a project-scoped API key at `https://console.scalix.world/org/keys` and pass `Authorization: Bearer <SCALIX_API_KEY>`.
- **Discovery:** `GET https://api.scalix.world/.well-known/oauth-protected-resource` works without credentials (`"resource":"https://api.scalix.world/v1/mcp"`).

## VS Code & GitHub Copilot (OAuth 2.1)

Install `world.scalix/cloud` from the VS Code `@mcp` gallery or GitHub Copilot Customizations (`scalixworld/scalix-cloud-mcp`). On first tool use, VS Code opens `https://console.scalix.world/oauth/consent` in your browser — pick a project and click **Allow**.

Or add directly in `.vscode/mcp.json`:

```json
{
  "servers": {
    "scalix-cloud": {
      "type": "http",
      "url": "https://api.scalix.world/v1/mcp"
    }
  }
}
```

## Claude Code (OAuth 2.1)

```bash
# Install via plugin marketplace
claude plugin marketplace add scalixworld/scalix-cloud-mcp
claude plugin install scalix-cloud@scalixworld

# Or add the remote MCP endpoint directly
claude mcp add --transport http scalix https://api.scalix.world/v1/mcp
```

Verify with `claude mcp list` or `/mcp` inside a session.

## Cursor / Windsurf / Codex / Cline (OAuth 2.1)

Point your Streamable HTTP client at the endpoint without static `headers`:

```json
{
  "mcpServers": {
    "scalix": {
      "type": "streamable-http",
      "url": "https://api.scalix.world/v1/mcp"
    }
  }
}
```

## Google Antigravity (OAuth 2.1)

```bash
agy plugin install https://github.com/scalixworld/scalix-cloud-mcp
```

Or configure `serverUrl` in `~/.gemini/config/mcp_config.json`:

```json
{
  "mcpServers": {
    "scalix": {
      "serverUrl": "https://api.scalix.world/v1/mcp"
    }
  }
}
```

## Gemini CLI (OAuth 2.1)

```bash
gemini extensions install https://github.com/scalixworld/scalix-cloud-mcp
```

## Headless / CI Clients Without OAuth (API Key Fallback)

For environments that cannot complete a browser OAuth flow, pass a project-scoped API key from `https://console.scalix.world/org/keys`:

```json
{
  "mcpServers": {
    "scalix": {
      "type": "http",
      "url": "https://api.scalix.world/v1/mcp",
      "headers": {
        "Authorization": "Bearer ${SCALIX_API_KEY}"
      }
    }
  }
}
```

## What You Get

53 tools covering the Scalix Cloud platform: run queries and migrations against Postgres-compatible databases (`ScalixNova`), create and drop database branches, deploy services (`Run`) and functions in isolated microVMs, run persistent Linux machines (`Computers`), manage object storage and KV, run AI inference, and inspect usage and billing. Consequential actions pause for human approval.

Troubleshooting: an unauthenticated `POST /v1/mcp` returns HTTP `401` with `WWW-Authenticate` (`resource_metadata="https://api.scalix.world/.well-known/oauth-protected-resource/v1/mcp"`) so OAuth-capable clients can trigger browser consent automatically.
