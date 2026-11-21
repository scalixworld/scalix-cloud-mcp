# Scalix Cloud

Scalix Cloud is the agent-native cloud: PostgreSQL databases, containers, functions,
AI, object storage, auth, DNS and persistent Linux machines behind one MCP endpoint —
53 tools, one API key.

- Endpoint: `https://api.scalix.world/v1/mcp` (Streamable HTTP)
- Authentication: supports OAuth 2.1 browser consent (triggered automatically via RFC 9728 401 WWW-Authenticate on `/v1/mcp`) or `Authorization: Bearer $SCALIX_API_KEY`. Check `GET https://api.scalix.world/.well-known/oauth-protected-resource` for unauthenticated metadata discovery.
- Create an API key at https://console.scalix.world/org/keys?utm_source=gemini-extension
- Docs: https://docs.scalix.world/mcp?utm_source=gemini-extension
- Functions runtimes: Node.js and Python. Postgres versions: 16 (default), 17, 18.

Set `SCALIX_API_KEY` in your environment before starting Gemini CLI.
