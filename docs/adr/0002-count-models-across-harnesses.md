# 0002 — Count model choices across harnesses

Date: 2026-10-07
Status: accepted in response to the request to disambiguate and deduplicate the catalog

## Context

Adding four harness catalogs produces 168 entries, but entries include shared models, aliases, context options and delivery variants. That total overstates the variety of models available to choose from.

## Decision

Report four coding harnesses and 137 model choices under explicit, reproducible grouping rules. Exclude Auto; group repeated routes, context options, batch/free variants, the documented Mistral 2407 alias and three documented speed variants. Retain the original routes and a full mapping. Keep distinct published releases separate unless there is evidence for grouping them.

## Consequences

The headline describes the breadth of choice without counting identified overlaps again. It does not claim to audit proprietary weights or prove identical behavior within each group. Evals will retain exact routes and configuration variants so they can measure differences hidden by the headline grouping. Those evals are planned, not completed.
