# Scalix Cloud — Unified MCP Plugin

Official Model Context Protocol (MCP) plugin and server configuration for [Scalix Cloud](https://scalix.world) — the agent-native cloud platform providing PostgreSQL databases, serverless functions, AI inference, persistent Linux machines (Computers), containers (Run), object storage, auth, and billing behind a single remote MCP endpoint (`https://api.scalix.world/v1/mcp`).

---

## Supported Ecosystems (One Repo, Many Manifests)

This repository includes native manifests for all major coding agents and MCP clients:

- **DeepSeek Harness (DSH)** — via `cordis.patch.yml` and `@scalix-world/scalix-cloud-mcp` npm bundle
- **Claude Code** — via `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json`
- **Google Antigravity** — via root `plugin.json`
- **Gemini CLI** — via GitHub URL extension install
- **Cursor / Windsurf / Codex** — via `.mcp.json` / generic Streamable HTTP configuration

---

## Quick Start by Client

### 1. DeepSeek Harness (DSH)

```bash
# Add the Scalix plugin bundle to your DSH profile
dsh plugin --profile web add @scalix-world/scalix-cloud-mcp

# Set your API key
export SCALIX_API_KEY="scalix_at_..."

# Boot DeepSeek Harness
dsh --profile web
```

### 2. Claude Code

```bash
# Add from official marketplace
claude plugin marketplace add scalixworld/scalix-cloud-mcp
claude plugin install scalix-cloud@scalixworld

# Set your API key
export SCALIX_API_KEY="scalix_at_..."
```

### 3. Gemini CLI

```bash
gemini extensions install https://github.com/scalixworld/scalix-cloud-mcp
export SCALIX_API_KEY="scalix_at_..."
```

### 4. Cursor / Windsurf / Generic MCP (`.mcp.json`)

```json
{
  "mcpServers": {
    "scalix": {
      "transport": "streamable-http",
      "url": "https://api.scalix.world/v1/mcp",
      "headers": {
        "Authorization": "Bearer ${SCALIX_API_KEY}"
      }
    }
  }
}
```

---

## What You Get

### 1. 53 Platform Tools Across 17 Domains

All tools are exposed under the `scalix_*` namespace (or `mcp__scalix__*` in DSH):

| Domain               | Key Tools                                                                            |
| -------------------- | ------------------------------------------------------------------------------------ |
| **Databases**        | `scalix_db_query`, `scalix_db_schema`, `scalix_db_optimize`, `scalix_db_text_to_sql` |
| **Containers (Run)** | `scalix_run_deploy`, `scalix_run_list`, `scalix_build_create`                        |
| **Computers**        | `scalix_computer_create`, `scalix_computer_exec`, `scalix_computer_delete`           |
| **Functions**        | `scalix_fn_deploy`, `scalix_fn_invoke`, `scalix_fn_list`                             |
| **AI Inference**     | `scalix_ai_infer`, `scalix_ai_models`                                                |
| **Storage & KV**     | `scalix_storage_create_bucket`, `scalix_storage_upload`, `scalix_kv_set`             |
| **System**           | `scalix_status`, `scalix_usage`, `scalix_project_list`                               |

### 2. Built-in Agent Skills (`skills/`)

- **`scalix-platform`** — Architecture overview, authentication, and SDK usage
- **`scalix-database`** — ScalixNova Postgres 16/17/18, database branching, and PITR
- **`scalix-functions`** — Node & Python serverless function deployment
- **`scalix-ai`** — Lumio model family and OpenAI-compatible inference

---

## Authentication

1. Generate an API Key in the [Scalix Cloud Console](https://console.scalix.world).
2. Set `SCALIX_API_KEY=scalix_at_...` in your environment.
3. Tool discovery is open and unauthenticated; tool execution requires a valid Bearer token.

---

## License

MIT — Copyright (c) 2026 Scalix World Pvt Ltd. See [LICENSE](LICENSE).
