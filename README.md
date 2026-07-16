# Scalix World — MCP Server

The official [Model Context Protocol](https://modelcontextprotocol.io) server for
[Scalix World](https://scalix.world/?utm_source=github&utm_medium=repo&utm_campaign=scalix-mcp),
the AI-native neocloud. One hosted MCP server lets an agent operate the entire
platform — no local install.

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
