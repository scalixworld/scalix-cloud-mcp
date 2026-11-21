// Scalix Cloud DSH / Cordis Plugin bundle entry point
// The actual plugin configuration is declared in cordis.patch.yml

export const name = '@scalix-world/scalix-cloud-mcp'

export function apply(ctx) {
  // Declarative bundle — @deepseek-ai/dsh-mcp-client handles MCP connectivity
  console.log('[scalix-cloud-mcp] Plugin loaded — Scalix MCP client connected')
}
