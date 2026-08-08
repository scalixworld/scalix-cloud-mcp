---
name: scalix-functions
description: Deploy and invoke serverless functions on Scalix Cloud — Node and Python runtimes, source or container-image deploys, invocation, and scaling behaviour. Use when the user wants to deploy a function, API endpoint, or webhook handler on Scalix, or asks about Scalix Functions runtimes and cold starts.
---

# Scalix Functions

Serverless functions that scale to zero when idle. A cold start provisions an isolated environment, so the first invocation after idle is meaningfully slower than a warm one — for latency-sensitive endpoints, keep the function warm with regular traffic.

## Runtimes — the rule that prevents wasted work

Supported runtimes are **`node` and `python` only**. Do not attempt to deploy Go, Rust, Ruby, or anything else as a function runtime — for other languages, package a container image instead (`--image`).

## Write a handler

```typescript
// handler.ts
export default async function handler(req: Request) {
  const body = await req.json();
  return new Response(JSON.stringify({ result: body.x + body.y }), {
    headers: { "Content-Type": "application/json" },
  });
}
```

## Deploy

`fn deploy` requires either `--source <path>` or `--image <image>`:

```bash
scalix-cloud fn deploy api --source ./api --runtime node    # from source
scalix-cloud fn deploy api --image registry/img:v1          # from a container image
```

## Invoke and manage

```bash
scalix-cloud fn list
scalix-cloud fn invoke api --data '{"x": 1, "y": 2}'
scalix-cloud fn delete <function-id>
```

The same operations exist over REST (`POST https://api.scalix.world/v1/functions`) and as MCP tools — prefer MCP tools when this plugin's server is connected.

Full reference: https://docs.scalix.world/functions?utm_source=claude-plugin&utm_medium=skill
