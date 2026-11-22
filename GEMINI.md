# Scalix Cloud

Scalix Cloud is the agent-native cloud: PostgreSQL databases, containers, functions, AI inference, object storage, auth, DNS, and persistent Linux machines behind one MCP endpoint — 53 tools across 17 domains.

- **Endpoint:** `https://api.scalix.world/v1/mcp` (Streamable HTTP)
- **Authentication:** OAuth 2.1 browser consent is triggered automatically via RFC 9728 `401` `WWW-Authenticate` on `/v1/mcp` (opens `https://console.scalix.world/oauth/consent` to select a project and grant access). For headless/CI environments, pass `Authorization: Bearer $SCALIX_API_KEY`.
- **Metadata Discovery:** `GET https://api.scalix.world/.well-known/oauth-protected-resource` works without credentials.
- **API Keys (optional / headless):** Create a project-scoped key at https://console.scalix.world/org/keys?utm_source=gemini-extension
- **Docs:** https://docs.scalix.world/mcp?utm_source=gemini-extension
- **Runtimes:** Functions support Node.js and Python. ScalixNova Postgres supports versions 16 (default), 17, and 18.
