# Scalix Cloud

Scalix Cloud is the agent-native cloud: PostgreSQL databases, containers, functions,
AI, object storage, auth, DNS and persistent Linux machines behind one MCP endpoint —
53 tools, one API key.

- Endpoint: `https://api.scalix.world/v1/mcp` (Streamable HTTP)
- Discovery (`initialize`, `tools/list`, `resources/list`) needs no auth — browse the
  catalogue freely. Tool calls require `Authorization: Bearer <key>`.
- Create an API key at https://console.scalix.world/org/keys?utm_source=gemini-extension
- Docs: https://docs.scalix.world/mcp?utm_source=gemini-extension
- Functions runtimes: Node.js and Python. Postgres versions: 16 (default), 17, 18.

Set `SCALIX_API_KEY` in your environment before starting Gemini CLI.
