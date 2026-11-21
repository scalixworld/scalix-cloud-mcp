# Scalix Cloud — Unified MCP Plugin

Official Model Context Protocol (MCP) plugin and server configuration for [Scalix Cloud](https://scalix.world) — the agent-native cloud platform providing PostgreSQL databases, serverless functions, AI inference, persistent Linux machines (Computers), containers (Run), object storage, auth, and billing behind a single remote MCP endpoint (`https://api.scalix.world/v1/mcp`).

---

## Supported Ecosystems (One Repo, Many Manifests)

This repository includes native manifests for all major coding agents and MCP clients:

- **VS Code & GitHub Copilot** — 1-click install from the GitHub MCP Registry (`world.scalix/cloud`) with native browser OAuth 2.1
- **Claude Code** — via `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json`
- **Cursor / Windsurf / Codex** — via `.mcp.json` / generic Streamable HTTP configuration
- **Google Antigravity** — via `.antigravity-plugin/plugin.json` + `mcp_config.json` (MCP Store / Plugin Marketplace)
- **Gemini CLI** — via GitHub URL extension install
- **DeepSeek Harness (DSH)** — via `cordis.patch.yml` and `@scalix-world/scalix-cloud-mcp` npm bundle

---

## Quick Start by Client

### 1. VS Code & GitHub Copilot (OAuth 2.1 — Recommended)

1. Open **Extensions** in VS Code, search `@mcp Scalix Cloud` (or install from the GitHub MCP Registry `world.scalix/cloud`), and click **Install**.
2. Start a chat in Copilot / Agent mode — VS Code will automatically open `https://console.scalix.world/oauth/consent` in your browser so you can pick a project and click **Allow**. No API key copy/paste or `${input:...}` configuration required.

If configuring manually in `~/.copilot/mcp-config.json` or repo-root `.mcp.json`:

```json
{
  "mcpServers": {
    "scalix": {
      "type": "http",
      "url": "https://api.scalix.world/v1/mcp"
    }
  }
}
```

### 2. Claude Code

```bash
# Add from official marketplace
claude plugin marketplace add scalixworld/scalix-cloud-mcp
claude plugin install scalix-cloud@scalixworld

# Authenticate via OAuth on connect, or export an API key for headless runs:
export SCALIX_API_KEY="scalix_at_..."
```

### 3. Cursor / Windsurf / Codex / Generic MCP (`.mcp.json`)

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

### 4. Google Antigravity

Install as a plugin (recommended — bundles the MCP server plus the four `scalix-*` skills):

```bash
# From the official Marketplace (once listed)
agy plugin install scalix-cloud

# Or straight from this repository / a local checkout
agy plugin install https://github.com/scalixworld/scalix-cloud-mcp
agy plugin install /path/to/scalix-cloud-mcp
```

On first connect, Antigravity opens `https://console.scalix.world/oauth/consent` in your browser — pick a project, click **Allow**, and the tools are live. No API key copy/paste. The bundled skills are invoked as `/scalix-platform`, `/scalix-database`, `/scalix-functions`, `/scalix-ai`.

Manual / headless alternative — point Antigravity at the raw endpoint with an API key instead of OAuth:

```json
{
  "mcpServers": {
    "scalix": {
      "serverUrl": "https://api.scalix.world/v1/mcp",
      "headers": {
        "Authorization": "Bearer ${SCALIX_API_KEY}"
      }
    }
  }
}
```

Edit this in Antigravity IDE via `…` → **MCP Servers** → **Manage MCP Servers** → **View raw config** (global file: `~/.gemini/config/mcp_config.json`). Note: the plugin's own servers load from the plugin root `mcp_config.json`; client-side `mcp_config.json` entries are an alternative for users who install no plugin. Remote servers must use Streamable HTTP (`serverUrl`); the legacy `httpUrl` / HTTP+SSE form is not supported by Antigravity.

### 5. Gemini CLI

```bash
gemini extensions install https://github.com/scalixworld/scalix-cloud-mcp
export SCALIX_API_KEY="scalix_at_..."
```

### 6. DeepSeek Harness (DSH)

```bash
# Add the Scalix plugin bundle to your DSH profile
dsh plugin --profile web add @scalix-world/scalix-cloud-mcp

# Set your API key
export SCALIX_API_KEY="scalix_at_..."

# Boot DeepSeek Harness
dsh --profile web
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
| **System**           | `scalix_status`, `scalix_project_list`, `scalix_search`                              |

### 2. Built-in Agent Skills (`skills/`)

- **`scalix-platform`** — Architecture overview, authentication, and SDK usage
- **`scalix-database`** — ScalixNova Postgres 16/17/18, database branching, and PITR
- **`scalix-functions`** — Node & Python serverless function deployment
- **`scalix-ai`** — Managed multi-vendor AI model catalog and OpenAI-compatible inference

---

## Authentication

Scalix Cloud MCP (`https://api.scalix.world/v1/mcp`) supports both OAuth 2.1 and API key authentication:

1. **OAuth 2.1 (Recommended for VS Code, GitHub Copilot, Claude, ChatGPT):** Point your client at `https://api.scalix.world/v1/mcp` without static headers. On connect, the server returns an RFC 9728 `WWW-Authenticate` challenge and your browser opens `https://console.scalix.world/oauth/consent` to select a project and grant scoped access.
2. **API Key (for headless CLI, CI, or clients without OAuth):** Generate a project-scoped API key in the [Scalix Cloud Console](https://console.scalix.world), set `SCALIX_API_KEY=scalix_at_...` in your environment, and pass `Authorization: Bearer ${SCALIX_API_KEY}`.

---

## Publishing to the Antigravity Marketplace

The Antigravity plugin lives in this repository at `.antigravity-plugin/plugin.json` (+ root `mcp_config.json`, `skills/`, `assets/logo.svg`). `agy plugin validate` passes on this directory with zero errors; it reports three *expected* multi-tool warnings that Google's own docs classify as safe in multi-provider repositories:

| Warning | Why it is safe |
| --- | --- |
| `.mcp.json: never loaded` | Claude Code's file name — our Claude entry point; Antigravity loads MCP servers only from `mcp_config.json` (and `.mcp.json` is auto-excluded from the Marketplace bundle) |
| `commands: never loaded` | Claude Code slash command (`commands/setup.md`); plugins have no commands, only skills |
| `plugin.json: ignored` | Root manifest is the LobeHub manifest; `.antigravity-plugin/plugin.json` takes precedence and is promoted to root `plugin.json` in the Marketplace bundle |

CI check (fails on any error, or any warning outside this repo's known multi-tool files):

```bash
agy plugin validate --json . | jq -e '
  .manifest as $manifest |
  [.findings[] | select(
    .severity == "error" or (
      .severity == "warning" and
      (.file != ".mcp.json" and .file != "mcp.json" and .file != "AGENTS.md") and
      (.file != "commands") and
      (.file != "plugin.json" or $manifest != ".antigravity-plugin/plugin.json")
    )
  )] | length == 0
'
```

To submit the listing to the [Antigravity Marketplace](https://antigravity.google/docs/marketplace), use the [partner intake form](https://forms.gle/2EX5RFYPoJe1UgxR9) with: marketplace name `scalix-cloud`, display name `Scalix Cloud`, repository URL, the hosted endpoint `https://api.scalix.world/v1/mcp`, and publisher contact. Keep `.antigravity-plugin/plugin.json` `version` in step with `.claude-plugin/plugin.json` on every release so installed clients detect updates.

---

## License

Scalix Cloud is a proprietary, closed-source managed cloud platform by Scalix World Pvt Ltd (licensed internationally via Energy FW Ltd). This MCP plugin manifest and skills repository is open-sourced under the MIT License — Copyright (c) 2026 Scalix World Pvt Ltd. See [LICENSE](LICENSE).
