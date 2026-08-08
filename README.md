# Scalix World — MCP Server

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Scalix_MCP-0098FF?logo=githubcopilot&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=scalix&config=%7B%22type%22%3A%20%22http%22%2C%20%22url%22%3A%20%22https%3A%2F%2Fapi.scalix.world%2Fv1%2Fmcp%22%2C%20%22headers%22%3A%20%7B%22Authorization%22%3A%20%22Bearer%20%24%7BSCALIX_API_KEY%7D%22%7D%7D)
[![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?logo=githubcopilot&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=scalix&config=%7B%22type%22%3A%20%22http%22%2C%20%22url%22%3A%20%22https%3A%2F%2Fapi.scalix.world%2Fv1%2Fmcp%22%2C%20%22headers%22%3A%20%7B%22Authorization%22%3A%20%22Bearer%20%24%7BSCALIX_API_KEY%7D%22%7D%7D&quality=insiders)


The official [Model Context Protocol](https://modelcontextprotocol.io) server for
[Scalix World](https://scalix.world/?utm_source=github&utm_medium=repo&utm_campaign=scalix-cloud-mcp),
the AI-native neocloud. One hosted MCP server lets an agent operate the entire
platform — no local install. Database, compute, functions, storage, auth, AI, DNS
and billing: 55 tools across 18 domains, one API key.

## Claude Code plugin (recommended)

Install the full package — 55 tools, 4 skills and a `/scalix:setup` command:

```bash
claude plugin marketplace add scalixworld/scalix-cloud-mcp
claude plugin install scalix@scalix
```

Then run `/scalix:setup` inside Claude Code to connect and verify.

## Antigravity (Google)

Install as a plugin (recommended — one command):

```bash
git clone https://github.com/scalixworld/scalix-cloud-mcp ~/.gemini/config/plugins/scalix
```

Then open the plugin's `mcp_config.json` and replace `YOUR_SCALIX_API_KEY` with a key from [scalix.world](https://scalix.world) (Console → API Keys). Antigravity auto-discovers plugins in `~/.gemini/config/plugins/` (global) or `.agents/plugins/` (per-workspace).

Or add the server directly: paste the `mcpServers` block from `mcp_config.json` into `~/.gemini/config/mcp_config.json` (Antigravity 2.0 / IDE) — or in Antigravity CLI type `/mcp` for the interactive manager. Note Antigravity uses `serverUrl` (not `url`).

## Gemini CLI

```bash
gemini extensions install https://github.com/scalixworld/scalix-cloud-mcp
```

Set `SCALIX_API_KEY` in your environment; the extension config and `GEMINI.md` context load automatically.

## Connect

```
https://api.scalix.world/v1/mcp
```

Authenticate with a Scalix World API key (`Authorization: Bearer <key>`), scopable
to specific services, projects, and actions. Listed in the official MCP registry as
[`world.scalix/cloud`](https://registry.modelcontextprotocol.io/v0/servers?search=world.scalix).

Example (Claude Code):

```bash
claude mcp add --transport http scalix https://api.scalix.world/v1/mcp \
  --header "Authorization: Bearer $SCALIX_API_KEY"
```

## What an agent can do with it

- **Databases** — provision Postgres-compatible databases with scale-to-zero;
  create copy-on-write branches to test migrations, then promote or drop them
- **Compute** — deploy container services and serverless functions in isolated microVMs
- **Storage, Auth, DNS, Email** — manage the production primitives around the app
- **AI inference** — run AI workloads with routing, metering, and spend controls
- **Observability & billing** — read logs and metrics, check usage and remaining
  credits; the agent can make cost-aware decisions with the same key it deploys with

Consequential actions (deletes, production changes, spend past budget caps) pause
for human approval — guardrails are a platform feature, not a wrapper script.

## Docs

- MCP guide: https://docs.scalix.world/mcp
- API reference: https://docs.scalix.world/api-reference/mcp
- Start free (no card): https://scalix.world

## About

Scalix World is a fully managed cloud platform engineered as one system — database,
AI, compute, storage, auth, billing — operable by humans through a console and by
agents through this MCP server, on sovereign European infrastructure. Built by
[Scalix](https://scalix.world).
