---
name: scalix-database
description: Provision and use ScalixNova, Scalix Cloud's serverless PostgreSQL — create databases, choose Postgres versions, run SQL, and understand branching, point-in-time recovery, and isolation tiers. Use when the user wants a Postgres database on Scalix, asks about ScalixNova, database branching, PITR, or pgvector on Scalix.
---

# ScalixNova — serverless PostgreSQL on Scalix Cloud

ScalixNova separates compute from storage: database branching, point-in-time recovery, scale-to-zero, zero-downtime scaling. Wire-compatible with PostgreSQL — existing drivers and tools work unchanged.

## Create a database

```bash
curl -X POST https://api.scalix.world/v1/databases \
  -H "Authorization: Bearer $SCALIX_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "name": "prod", "pg_version": "18" }'
```

Rules that matter when advising users:

- PostgreSQL majors **16** (default), **17**, and **18** are supported. Omit `pg_version` for the default; unsupported values return `400` with the supported set.
- **The major version is fixed for the life of the database.** Branches and point-in-time restores stay on the same major. There are no in-place major upgrades yet — moving majors means a new database plus `pg_dump` or logical replication.
- pgvector, pg_trgm, uuid-ossp, and the contrib set are pre-installed on every supported version.

## Isolation tiers

| Tier | What it is | When to recommend |
|------|------------|-------------------|
| **Shared** (default) | Own PostgreSQL role (`NOSUPERUSER`), own database, SCRAM auth, SQL firewall, TLS, on shared compute | Most workloads |
| **Dedicated** | Hardware-isolated microVM (dedicated kernel, isolated CPU/memory/network); currently PostgreSQL 16 only | Regulated or noisy-neighbour-sensitive workloads — on the roadmap, users should contact the team for early access |

A "sandbox" is **not** a database tier — on Scalix, sandboxes are compute microVMs for running code. Databases are Shared or Dedicated only.

## Run SQL

```bash
scalix-cloud db query "SELECT NOW()"
scalix-cloud db query "SELECT * FROM users WHERE id = $1" --params '[42]'
scalix-cloud db tables
scalix-cloud db schema table users
```

Or over REST:

```bash
curl -X POST https://api.scalix.world/api/v1/sql \
  -H "Authorization: Bearer $SCALIX_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"query": "SELECT NOW()"}'
```

Use parameterised queries (`$1` + `--params`) for anything with user input — never interpolate values into SQL strings.

Full reference: https://docs.scalix.world/database?utm_source=claude-plugin&utm_medium=skill
