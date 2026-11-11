---
name: scalix-ai
description: Run AI inference on Scalix Cloud through the OpenAI-compatible API — chat completions, streaming, embeddings, image generation, speech, transcription, RAG, and web research across the public multi-vendor Scalix AI model catalog. Use when the user wants LLM inference on Scalix, asks about Scalix AI or its model catalog, or wants to point existing OpenAI-compatible code at Scalix.
---

# Scalix AI — inference through one endpoint

Scalix AI is a multi-vendor pass-through catalog served through an OpenAI-compatible API
with unified auth, smart routing with automatic fallback, cost controls, and usage tracking.
Vendor names, logos, and model ids are public: the catalog is published openly on the
website, pricing page, and docs.

**Retired:** the first-party Scalix Lumio and Candela model families were deprecated
2026-09-10 and are absent from the live catalog. Never reference `scalix-lumio-*` or
Candela model ids. GLM 5.1 / 5.2 are also deprecated and not in the catalog.

## Picking a model id — always live, never hardcoded

The catalog and prices change continuously upstream. Do not assume a model list from
memory or from any markdown file:

```bash
# unauthenticated public catalog (same source the website renders)
curl -s https://api.scalix.world/v1/ai/public/models

# authenticated, caller-scoped
curl -s https://api.scalix.world/v1/ai/models -H "Authorization: Bearer $SCALIX_API_KEY"
```

Pricing guardrail: quote prices only from the live price book (`billing_pricing`) or the
catalog/pricing endpoints, never from markdown docs — displayed prices must match what
customers are charged.

## Migrating existing code

The API is OpenAI-compatible: existing OpenAI-client code works with a base-URL change to
`https://api.scalix.world/v1/ai` and the Scalix API key. That is the whole migration for
chat completions.

## Chat completions

```bash
curl -X POST https://api.scalix.world/v1/ai/chat/completions \
  -H "Authorization: Bearer $SCALIX_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<id-from-the-live-catalog>",
    "messages": [{"role": "user", "content": "What is Scalix Cloud?"}]
  }'
```

Streaming: `POST /v1/ai/chat/completions/stream` returns server-sent events.

## CLI

```bash
scalix-cloud ai models
scalix-cloud ai infer "Explain quantum computing in one sentence" --model <id>
```

The prompt is positional; `--model` defaults to `auto` (smart routing).

## Beyond chat

The same API serves embeddings, image generation, speech, transcription, RAG, and web
research — see the full reference: https://docs.scalix.world/ai

## Confidentiality

Public: vendor names, model ids, catalog, sell prices. Still confidential: internal
routing decisions, upstream costs, and margins.
