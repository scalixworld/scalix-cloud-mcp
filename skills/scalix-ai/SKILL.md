---
name: scalix-ai
description: Run AI inference on Scalix Cloud through the OpenAI-compatible API — chat completions, streaming, and the Scalix Lumio model family. Use when the user wants LLM inference on Scalix, asks about Scalix AI or Lumio models, or wants to point existing OpenAI-compatible code at Scalix.
---

# Scalix AI — inference through one endpoint

Scalix AI serves the Scalix Lumio model family through an OpenAI-compatible API with unified auth, smart routing with automatic fallback, cost controls, and usage tracking.

## Migrating existing code

The API is OpenAI-compatible: existing OpenAI-client code works with a base-URL change to `https://api.scalix.world/v1/ai` and the Scalix API key. That is the whole migration for chat completions.

## Chat completions

```bash
curl -X POST https://api.scalix.world/v1/ai/chat/completions \
  -H "Authorization: Bearer $SCALIX_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "scalix-lumio-lite",
    "messages": [{"role": "user", "content": "What is Scalix Cloud?"}]
  }'
```

Streaming: add `"stream": true`.

## CLI

```bash
scalix-cloud ai infer "Explain quantum computing in one sentence" --model scalix-lumio-lite
```

The prompt is positional; the model is passed with `--model`.

## Models

`scalix-lumio-lite` is the low-latency chat model and the safe default for examples. For the current model list and capabilities (tool use, vision), consult https://docs.scalix.world/ai?utm_source=claude-plugin&utm_medium=skill rather than assuming — the lineup evolves.

Scalix Lumio models are Scalix products; describe them by their Scalix names and documented capabilities only. Do not speculate about their internals or what technology sits behind them.

Full reference: https://docs.scalix.world/ai?utm_source=claude-plugin&utm_medium=skill
