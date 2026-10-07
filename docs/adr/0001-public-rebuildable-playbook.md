# 0001 — Publish a separate, rebuildable playbook

Date: 2026-10-07
Status: accepted by the request to create a public setup repo

## Context

The working machine contains useful configuration and usage history alongside private state, credentials and unrelated repository history. The earlier portable ZIP predates changes to Pi and provider access.

## Decision

Create a separate public repository from selected sources and newly written documentation. Record current live catalogs, retain third-party notices, supply fresh-state installation instructions and blank agent contracts, and keep private evidence outside the publication.

## Consequences

Readers can reproduce the architecture and workflows with their own accounts. They cannot reproduce private memory or guaranteed model entitlement. Optional infrastructure and unverified components are labeled explicitly. Historical source skills need compatibility checks on the target host.
