# How the model count works

**Four coding harnesses; 137 deduplicated model choices in the 2026-10-07 snapshot.** The starting point is 168 catalog entries. An entry is a way to select or route a model; several entries can refer to the same model.

## Reconciliation

| Step | Entries removed | Remaining |
| --- | ---: | ---: |
| Raw catalogs across all four harnesses | — | 168 |
| Remove Cursor Auto (a selector) | 1 | 167 |
| Group Claude 1M context options with their base model | 3 | 164 |
| Group batch/free suffixes with the same base ID | 15 | 149 |
| Group direct xAI and OpenRouter routes for the same Grok versions | 4 | 145 |
| Deduplicate models shared with Cursor | 4 | 141 |
| Merge Mistral Large’s documented 2407 alias | 1 | 140 |
| Group three documented speed variants with their base model choices | 3 | **137** |

## Per harness

| Harness | Raw entries | Model choices within that harness |
| --- | ---: | ---: |
| Codex | 4 | 4 |
| Claude Code | 14 | 11 |
| Cursor | 6 | 5 |
| Pi | 144 | 121 |
| Combined, deduplicated across harnesses | 168 | **137** |

The per-harness model counts sum to 141. Cursor shares GPT-5.6 Sol with Codex, Opus 5 and Fable 5 with Claude Code, and Grok 4.6 with Pi. Each of those four overlaps is counted once in the combined total. This count does not mean every model is available through every harness.

## Counting rules and evidence

- A matching model version through another harness or provider is one choice. Thus Grok 4.6 across Cursor, direct xAI and OpenRouter counts once.
- `[1m]`, `:batch` and `:free` do not create new model choices. Context capacity, delivery and pricing can still affect the experience. OpenRouter describes `:free` as a variant of a model. [Free variant documentation](https://openrouter.ai/docs/guides/routing/model-variants/free).
- OpenRouter identifies both `mistral-large` and `mistral-large-2407` as Mistral Large 2, version 2407, so they count once. [Mistral Large](https://openrouter.ai/mistralai/mistral-large), [2407](https://openrouter.ai/mistralai/mistral-large-2407).
- We conservatively group GLM 5.3 Prime with GLM 5.3, GLM 5.3 FlashX with GLM 5.3 Flash, and Qwen3.8 Max Prime with the catalog’s Qwen3.8 Max choice (0902). Their descriptions identify them as speed/throughput variants. This is a counting convention, not proof of identical weights or an exact backend checkpoint. [GLM Prime](https://openrouter.ai/z-ai/glm-5.3-prime), [GLM FlashX](https://openrouter.ai/z-ai/glm-5.3-flashx), [Qwen Max Prime](https://openrouter.ai/qwen/qwen3.8-max-prime).
- Distinct published releases, sizes, modalities and separately named instruct/thinking models remain separate. Shared architecture or a shared family name alone is insufficient to merge them. For example, OpenRouter describes Qwen-Plus as Qwen2.5-based and Plus 0728 as Qwen3-based. [Qwen-Plus](https://openrouter.ai/qwen/qwen-plus), [Plus 0728](https://openrouter.ai/qwen/qwen-plus-2025-07-28).

All 140 OpenRouter entry IDs in the saved Pi catalog matched the public models API during this audit. The public descriptions were used to investigate aliases and variants, not to replace the original dated host snapshot. [OpenRouter public catalog](https://openrouter.ai/api/v1/models).

The result removes the identified overlaps under these explicit rules. Providers can change aliases, and closed model weights cannot be independently compared here. Accordingly, **137 is a reproducible count of model choices, not a guarantee of 137 independently verified neural-network checkpoints**. Authentication, balance and quota still govern actual use.

## Reproduce and inspect

```bash
python3 scripts/dedupe-models.py
python3 scripts/dedupe-models.py --check
```

The script reads the four saved catalogs, applies explicit grouping rules and accounts for every input entry. The [machine-readable mapping](../inventory/deduplicated-models.json) lists every original route in each group. The [raw catalog](models.md) preserves the provider IDs and effort options. Refreshing catalogs requires reviewing the grouping rules too.

## All 137 model choices

Each row below is counted once. Multiple entries in a row show the overlap removed. Speed variants retain their original IDs so they remain available for future evals even though they do not increase the headline count.

| Model choice | Harness and original catalog ID |
| --- | --- |
| `claude-fable-5` | claude-code: `claude-fable-5`<br>acp-cursor: `claude-fable-5` |
| `claude-fable-5-1` | claude-code: `claude-fable-5-1` |
| `claude-haiku-4-5-20251001` | claude-code: `claude-haiku-4-5-20251001` |
| `claude-opus-4-6` | claude-code: `claude-opus-4-6` |
| `claude-opus-4-7` | claude-code: `claude-opus-4-7[1m]`<br>claude-code: `claude-opus-4-7` |
| `claude-opus-4-8` | claude-code: `claude-opus-4-8[1m]`<br>claude-code: `claude-opus-4-8` |
| `claude-opus-5` | claude-code: `claude-opus-5[1m]`<br>claude-code: `claude-opus-5`<br>acp-cursor: `claude-opus-5` |
| `claude-opus-5-5` | claude-code: `claude-opus-5-5` |
| `claude-sonnet-4-6` | claude-code: `claude-sonnet-4-6` |
| `claude-sonnet-5` | claude-code: `claude-sonnet-5` |
| `claude-sonnet-5-5` | claude-code: `claude-sonnet-5-5` |
| `composer-2.5` | acp-cursor: `composer-2.5` |
| `deepseek/deepseek-chat` | pi: `openrouter/deepseek/deepseek-chat` |
| `deepseek/deepseek-chat-v3-0324` | pi: `openrouter/deepseek/deepseek-chat-v3-0324` |
| `deepseek/deepseek-chat-v3.1` | pi: `openrouter/deepseek/deepseek-chat-v3.1` |
| `deepseek/deepseek-r1` | pi: `openrouter/deepseek/deepseek-r1` |
| `deepseek/deepseek-r1-0528` | pi: `openrouter/deepseek/deepseek-r1-0528` |
| `deepseek/deepseek-v3.1-terminus` | pi: `openrouter/deepseek/deepseek-v3.1-terminus` |
| `deepseek/deepseek-v3.2` | pi: `openrouter/deepseek/deepseek-v3.2` |
| `deepseek/deepseek-v3.2-exp` | pi: `openrouter/deepseek/deepseek-v3.2-exp` |
| `deepseek/deepseek-v4-flash` | pi: `openrouter/deepseek/deepseek-v4-flash` |
| `deepseek/deepseek-v4-flash-0731` | pi: `openrouter/deepseek/deepseek-v4-flash-0731` |
| `deepseek/deepseek-v4-flash-vision-exp` | pi: `openrouter/deepseek/deepseek-v4-flash-vision-exp` |
| `deepseek/deepseek-v4-pro` | pi: `openrouter/deepseek/deepseek-v4-pro` |
| `deepseek/deepseek-v4-pro-0813` | pi: `openrouter/deepseek/deepseek-v4-pro-0813` |
| `deepseek/deepseek-v4.1-flash` | pi: `openrouter/deepseek/deepseek-v4.1-flash`<br>pi: `openrouter/deepseek/deepseek-v4.1-flash:batch` |
| `google/gemma-3-12b-it` | pi: `openrouter/google/gemma-3-12b-it` |
| `google/gemma-3-27b-it` | pi: `openrouter/google/gemma-3-27b-it` |
| `google/gemma-4-26b-a4b-it` | pi: `openrouter/google/gemma-4-26b-a4b-it`<br>pi: `openrouter/google/gemma-4-26b-a4b-it:free` |
| `google/gemma-4-31b-it` | pi: `openrouter/google/gemma-4-31b-it`<br>pi: `openrouter/google/gemma-4-31b-it:free` |
| `gpt-5.6-luna` | codex: `gpt-5.6-luna` |
| `gpt-5.6-sol` | codex: `gpt-5.6-sol`<br>acp-cursor: `gpt-5.6-sol` |
| `gpt-5.6-terra` | codex: `gpt-5.6-terra` |
| `gpt-6-astra` | codex: `gpt-6-astra` |
| `grok-4.20` | pi: `openrouter/x-ai/grok-4.20` |
| `grok-4.3` | pi: `xai/grok-4.3`<br>pi: `openrouter/x-ai/grok-4.3`<br>pi: `openrouter/x-ai/grok-4.3:batch` |
| `grok-4.5` | pi: `xai/grok-4.5`<br>pi: `openrouter/x-ai/grok-4.5` |
| `grok-4.6` | acp-cursor: `grok-4.6`<br>pi: `xai/grok-4.6`<br>pi: `openrouter/x-ai/grok-4.6` |
| `grok-4.7` | pi: `xai/grok-4.7`<br>pi: `openrouter/x-ai/grok-4.7` |
| `grok-build-0.1` | pi: `openrouter/x-ai/grok-build-0.1` |
| `meta-llama/llama-3.1-70b-instruct` | pi: `openrouter/meta-llama/llama-3.1-70b-instruct` |
| `meta-llama/llama-3.1-8b-instruct` | pi: `openrouter/meta-llama/llama-3.1-8b-instruct` |
| `meta-llama/llama-3.3-70b-instruct` | pi: `openrouter/meta-llama/llama-3.3-70b-instruct` |
| `meta-llama/llama-4-maverick` | pi: `openrouter/meta-llama/llama-4-maverick` |
| `meta-llama/llama-4-scout` | pi: `openrouter/meta-llama/llama-4-scout` |
| `mistralai/codestral-2508` | pi: `openrouter/mistralai/codestral-2508`<br>pi: `openrouter/mistralai/codestral-2508:batch` |
| `mistralai/devstral-2512` | pi: `openrouter/mistralai/devstral-2512` |
| `mistralai/ministral-14b-2512` | pi: `openrouter/mistralai/ministral-14b-2512` |
| `mistralai/ministral-3b-2512` | pi: `openrouter/mistralai/ministral-3b-2512` |
| `mistralai/ministral-8b-2512` | pi: `openrouter/mistralai/ministral-8b-2512`<br>pi: `openrouter/mistralai/ministral-8b-2512:batch` |
| `mistralai/mistral-large-2407` | pi: `openrouter/mistralai/mistral-large`<br>pi: `openrouter/mistralai/mistral-large-2407` |
| `mistralai/mistral-large-2512` | pi: `openrouter/mistralai/mistral-large-2512`<br>pi: `openrouter/mistralai/mistral-large-2512:batch` |
| `mistralai/mistral-large-4-0` | pi: `openrouter/mistralai/mistral-large-4-0` |
| `mistralai/mistral-medium-3` | pi: `openrouter/mistralai/mistral-medium-3` |
| `mistralai/mistral-medium-3-5` | pi: `openrouter/mistralai/mistral-medium-3-5`<br>pi: `openrouter/mistralai/mistral-medium-3-5:batch` |
| `mistralai/mistral-medium-3.1` | pi: `openrouter/mistralai/mistral-medium-3.1`<br>pi: `openrouter/mistralai/mistral-medium-3.1:batch` |
| `mistralai/mistral-nemo` | pi: `openrouter/mistralai/mistral-nemo` |
| `mistralai/mistral-saba` | pi: `openrouter/mistralai/mistral-saba` |
| `mistralai/mistral-small-2603` | pi: `openrouter/mistralai/mistral-small-2603`<br>pi: `openrouter/mistralai/mistral-small-2603:batch` |
| `mistralai/mistral-small-3.1-24b-instruct` | pi: `openrouter/mistralai/mistral-small-3.1-24b-instruct` |
| `mistralai/mistral-small-3.2-24b-instruct` | pi: `openrouter/mistralai/mistral-small-3.2-24b-instruct` |
| `mistralai/mixtral-8x22b-instruct` | pi: `openrouter/mistralai/mixtral-8x22b-instruct` |
| `mistralai/voxtral-small-24b-2507` | pi: `openrouter/mistralai/voxtral-small-24b-2507` |
| `moonshotai/kimi-k2` | pi: `openrouter/moonshotai/kimi-k2` |
| `moonshotai/kimi-k2-0905` | pi: `openrouter/moonshotai/kimi-k2-0905` |
| `moonshotai/kimi-k2-thinking` | pi: `openrouter/moonshotai/kimi-k2-thinking` |
| `moonshotai/kimi-k2.5` | pi: `openrouter/moonshotai/kimi-k2.5` |
| `moonshotai/kimi-k2.6` | pi: `openrouter/moonshotai/kimi-k2.6` |
| `moonshotai/kimi-k2.7-code` | pi: `openrouter/moonshotai/kimi-k2.7-code` |
| `moonshotai/kimi-k3` | pi: `openrouter/moonshotai/kimi-k3`<br>pi: `openrouter/moonshotai/kimi-k3:batch` |
| `openai/gpt-oss-120b` | pi: `openrouter/openai/gpt-oss-120b`<br>pi: `openrouter/openai/gpt-oss-120b:batch` |
| `openai/gpt-oss-20b` | pi: `openrouter/openai/gpt-oss-20b`<br>pi: `openrouter/openai/gpt-oss-20b:batch` |
| `openai/gpt-oss-safeguard-20b` | pi: `openrouter/openai/gpt-oss-safeguard-20b` |
| `qwen/qwen-2.5-72b-instruct` | pi: `openrouter/qwen/qwen-2.5-72b-instruct` |
| `qwen/qwen-2.5-7b-instruct` | pi: `openrouter/qwen/qwen-2.5-7b-instruct` |
| `qwen/qwen-plus` | pi: `openrouter/qwen/qwen-plus` |
| `qwen/qwen-plus-2025-07-28` | pi: `openrouter/qwen/qwen-plus-2025-07-28` |
| `qwen/qwen3-14b` | pi: `openrouter/qwen/qwen3-14b` |
| `qwen/qwen3-235b-a22b` | pi: `openrouter/qwen/qwen3-235b-a22b` |
| `qwen/qwen3-235b-a22b-2507` | pi: `openrouter/qwen/qwen3-235b-a22b-2507` |
| `qwen/qwen3-235b-a22b-thinking-2507` | pi: `openrouter/qwen/qwen3-235b-a22b-thinking-2507` |
| `qwen/qwen3-30b-a3b` | pi: `openrouter/qwen/qwen3-30b-a3b` |
| `qwen/qwen3-30b-a3b-instruct-2507` | pi: `openrouter/qwen/qwen3-30b-a3b-instruct-2507` |
| `qwen/qwen3-30b-a3b-thinking-2507` | pi: `openrouter/qwen/qwen3-30b-a3b-thinking-2507` |
| `qwen/qwen3-32b` | pi: `openrouter/qwen/qwen3-32b` |
| `qwen/qwen3-8b` | pi: `openrouter/qwen/qwen3-8b` |
| `qwen/qwen3-coder` | pi: `openrouter/qwen/qwen3-coder` |
| `qwen/qwen3-coder-30b-a3b-instruct` | pi: `openrouter/qwen/qwen3-coder-30b-a3b-instruct` |
| `qwen/qwen3-coder-flash` | pi: `openrouter/qwen/qwen3-coder-flash` |
| `qwen/qwen3-coder-next` | pi: `openrouter/qwen/qwen3-coder-next` |
| `qwen/qwen3-coder-plus` | pi: `openrouter/qwen/qwen3-coder-plus` |
| `qwen/qwen3-max` | pi: `openrouter/qwen/qwen3-max` |
| `qwen/qwen3-max-thinking` | pi: `openrouter/qwen/qwen3-max-thinking` |
| `qwen/qwen3-next-80b-a3b-instruct` | pi: `openrouter/qwen/qwen3-next-80b-a3b-instruct` |
| `qwen/qwen3-next-80b-a3b-thinking` | pi: `openrouter/qwen/qwen3-next-80b-a3b-thinking` |
| `qwen/qwen3-vl-235b-a22b-instruct` | pi: `openrouter/qwen/qwen3-vl-235b-a22b-instruct` |
| `qwen/qwen3-vl-235b-a22b-thinking` | pi: `openrouter/qwen/qwen3-vl-235b-a22b-thinking` |
| `qwen/qwen3-vl-30b-a3b-instruct` | pi: `openrouter/qwen/qwen3-vl-30b-a3b-instruct` |
| `qwen/qwen3-vl-30b-a3b-thinking` | pi: `openrouter/qwen/qwen3-vl-30b-a3b-thinking` |
| `qwen/qwen3-vl-32b-instruct` | pi: `openrouter/qwen/qwen3-vl-32b-instruct` |
| `qwen/qwen3-vl-8b-instruct` | pi: `openrouter/qwen/qwen3-vl-8b-instruct` |
| `qwen/qwen3-vl-8b-thinking` | pi: `openrouter/qwen/qwen3-vl-8b-thinking` |
| `qwen/qwen3.5-122b-a10b` | pi: `openrouter/qwen/qwen3.5-122b-a10b` |
| `qwen/qwen3.5-27b` | pi: `openrouter/qwen/qwen3.5-27b` |
| `qwen/qwen3.5-35b-a3b` | pi: `openrouter/qwen/qwen3.5-35b-a3b` |
| `qwen/qwen3.5-397b-a17b` | pi: `openrouter/qwen/qwen3.5-397b-a17b` |
| `qwen/qwen3.5-9b` | pi: `openrouter/qwen/qwen3.5-9b` |
| `qwen/qwen3.5-flash-02-23` | pi: `openrouter/qwen/qwen3.5-flash-02-23` |
| `qwen/qwen3.5-plus-02-15` | pi: `openrouter/qwen/qwen3.5-plus-02-15` |
| `qwen/qwen3.5-plus-20260420` | pi: `openrouter/qwen/qwen3.5-plus-20260420` |
| `qwen/qwen3.6-27b` | pi: `openrouter/qwen/qwen3.6-27b` |
| `qwen/qwen3.6-35b-a3b` | pi: `openrouter/qwen/qwen3.6-35b-a3b` |
| `qwen/qwen3.6-flash` | pi: `openrouter/qwen/qwen3.6-flash` |
| `qwen/qwen3.6-max-preview` | pi: `openrouter/qwen/qwen3.6-max-preview` |
| `qwen/qwen3.6-plus` | pi: `openrouter/qwen/qwen3.6-plus` |
| `qwen/qwen3.7-flash` | pi: `openrouter/qwen/qwen3.7-flash` |
| `qwen/qwen3.7-max` | pi: `openrouter/qwen/qwen3.7-max` |
| `qwen/qwen3.7-plus` | pi: `openrouter/qwen/qwen3.7-plus` |
| `qwen/qwen3.8-2.4t-a95b` | pi: `openrouter/qwen/qwen3.8-2.4t-a95b` |
| `qwen/qwen3.8-27b` | pi: `openrouter/qwen/qwen3.8-27b` |
| `qwen/qwen3.8-flash` | pi: `openrouter/qwen/qwen3.8-flash` |
| `qwen/qwen3.8-max-0902` | pi: `openrouter/qwen/qwen3.8-max-0902`<br>pi: `openrouter/qwen/qwen3.8-max-prime` |
| `qwen/qwen3.8-omni-flash` | pi: `openrouter/qwen/qwen3.8-omni-flash` |
| `z-ai/glm-4.5` | pi: `openrouter/z-ai/glm-4.5` |
| `z-ai/glm-4.5-air` | pi: `openrouter/z-ai/glm-4.5-air` |
| `z-ai/glm-4.5v` | pi: `openrouter/z-ai/glm-4.5v` |
| `z-ai/glm-4.6` | pi: `openrouter/z-ai/glm-4.6` |
| `z-ai/glm-4.6v` | pi: `openrouter/z-ai/glm-4.6v` |
| `z-ai/glm-4.7` | pi: `openrouter/z-ai/glm-4.7` |
| `z-ai/glm-4.7-flash` | pi: `openrouter/z-ai/glm-4.7-flash` |
| `z-ai/glm-5` | pi: `openrouter/z-ai/glm-5` |
| `z-ai/glm-5-turbo` | pi: `openrouter/z-ai/glm-5-turbo` |
| `z-ai/glm-5.1` | pi: `openrouter/z-ai/glm-5.1` |
| `z-ai/glm-5.2` | pi: `openrouter/z-ai/glm-5.2` |
| `z-ai/glm-5.3` | pi: `openrouter/z-ai/glm-5.3`<br>pi: `openrouter/z-ai/glm-5.3-prime`<br>pi: `openrouter/z-ai/glm-5.3:batch` |
| `z-ai/glm-5.3-flash` | pi: `openrouter/z-ai/glm-5.3-flash`<br>pi: `openrouter/z-ai/glm-5.3-flash:batch`<br>pi: `openrouter/z-ai/glm-5.3-flashx` |
| `z-ai/glm-5v-turbo` | pi: `openrouter/z-ai/glm-5v-turbo` |
