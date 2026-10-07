# Model catalog — 2026-10-07

Observed through BB 0.42.1 on the source host. Catalog availability only; no paid inference sweep was run. Entries can share underlying models across routes and harnesses. Refresh on the destination machine.

```bash
bb status --json
bb provider list --environment YOUR_ENVIRONMENT_ID --json
bb provider models pi --environment YOUR_ENVIRONMENT_ID --json
```

## codex — 4 entries

[Machine-readable snapshot](../inventory/codex.json)

| ID | Display name | Route | Reasoning efforts |
| --- | --- | --- | --- |
| `gpt-6-astra` | GPT-6-Astra | native | low, medium, high, xhigh, max, ultra |
| `gpt-5.6-sol` | GPT-5.6-Sol | native | low, medium, high, xhigh, max, ultra |
| `gpt-5.6-terra` | GPT-5.6-Terra | native | low, medium, high, xhigh, max, ultra |
| `gpt-5.6-luna` | GPT-5.6-Luna | native | low, medium, high, xhigh, max |

## claude-code — 14 entries

[Machine-readable snapshot](../inventory/claude-code.json)

| ID | Display name | Route | Reasoning efforts |
| --- | --- | --- | --- |
| `claude-fable-5-1` | Fable 5.1 | native | low, medium, high, xhigh, ultracode, max |
| `claude-opus-5[1m]` | Opus 5 (1M) | native | low, medium, high, xhigh, ultracode, max |
| `claude-opus-4-8[1m]` | Opus 4.8 (1M) | native | low, medium, high, xhigh, ultracode, max |
| `claude-opus-4-7[1m]` | Opus 4.7 (1M) | native | low, medium, high, xhigh, ultracode, max |
| `claude-sonnet-5` | Sonnet 5 | native | low, medium, high, xhigh, ultracode, max |
| `claude-opus-5-5` | Opus 5.5 | native | low, medium, high, xhigh, ultracode, max |
| `claude-sonnet-5-5` | Sonnet 5.5 | native | low, medium, high, xhigh, ultracode, max |
| `claude-haiku-4-5-20251001` | Haiku 4.5 | native | low |
| `claude-opus-5` | Opus 5 | native | low, medium, high, xhigh, ultracode, max |
| `claude-fable-5` | Fable 5 | native | low, medium, high, xhigh, ultracode, max |
| `claude-opus-4-8` | Opus 4.8 | native | low, medium, high, xhigh, ultracode, max |
| `claude-opus-4-7` | Opus 4.7 | native | low, medium, high, xhigh, ultracode, max |
| `claude-opus-4-6` | Opus 4.6 | native | low, medium, high, max |
| `claude-sonnet-4-6` | Sonnet 4.6 | native | low, medium, high, max |

## pi — 144 entries

[Machine-readable snapshot](../inventory/pi.json)

| ID | Display name | Route | Reasoning efforts |
| --- | --- | --- | --- |
| `xai/grok-4.3` | Grok 4.3 | xai | none, low, medium, high |
| `xai/grok-4.5` | Grok 4.5 | xai | low, medium, high |
| `xai/grok-4.6` | Grok 4.6 | xai | low, medium, high, xhigh |
| `xai/grok-4.7` | Grok 4.7 | xai | low, medium, high, xhigh |
| `openrouter/x-ai/grok-4.20` | SpaceXAI: Grok 4.20 | openrouter | none, low, medium, high |
| `openrouter/x-ai/grok-4.3` | SpaceXAI: Grok 4.3 | openrouter | none, low, medium, high |
| `openrouter/x-ai/grok-4.3:batch` | SpaceXAI: Grok 4.3 (batch) | openrouter | none, low, medium, high |
| `openrouter/x-ai/grok-4.5` | SpaceXAI: Grok 4.5 | openrouter | low, medium, high |
| `openrouter/x-ai/grok-4.6` | SpaceXAI: Grok 4.6 | openrouter | low, medium, high, xhigh |
| `openrouter/x-ai/grok-4.7` | SpaceXAI: Grok 4.7 | openrouter | low, medium, high, xhigh |
| `openrouter/x-ai/grok-build-0.1` | SpaceXAI: Grok Build 0.1 | openrouter | low, medium, high |
| `openrouter/deepseek/deepseek-chat` | DeepSeek: DeepSeek V3 | openrouter | none |
| `openrouter/deepseek/deepseek-chat-v3-0324` | DeepSeek: DeepSeek V3 0324 | openrouter | none |
| `openrouter/deepseek/deepseek-chat-v3.1` | DeepSeek: DeepSeek V3.1 | openrouter | none, low, medium, high |
| `openrouter/deepseek/deepseek-r1` | DeepSeek: R1 | openrouter | low, medium, high |
| `openrouter/deepseek/deepseek-r1-0528` | DeepSeek: R1 0528 | openrouter | low, medium, high |
| `openrouter/deepseek/deepseek-v3.1-terminus` | DeepSeek: DeepSeek V3.1 Terminus | openrouter | none, low, medium, high |
| `openrouter/deepseek/deepseek-v3.2` | DeepSeek: DeepSeek V3.2 | openrouter | none, low, medium, high |
| `openrouter/deepseek/deepseek-v3.2-exp` | DeepSeek: DeepSeek V3.2 Exp | openrouter | none, low, medium, high |
| `openrouter/deepseek/deepseek-v4-flash` | DeepSeek: DeepSeek V4 Flash 0423 | openrouter | none, high, xhigh |
| `openrouter/deepseek/deepseek-v4-flash-0731` | DeepSeek: DeepSeek V4 Flash 0731 | openrouter | none, low, high, max |
| `openrouter/deepseek/deepseek-v4-flash-vision-exp` | DeepSeek: DeepSeek V4 Flash Vision Exp | openrouter | none, low, high, max |
| `openrouter/deepseek/deepseek-v4-pro` | DeepSeek: DeepSeek V4 Pro 0423 | openrouter | none, high, xhigh |
| `openrouter/deepseek/deepseek-v4-pro-0813` | DeepSeek: DeepSeek V4 Pro 0813 | openrouter | none, low, high, max |
| `openrouter/deepseek/deepseek-v4.1-flash` | DeepSeek: DeepSeek V4.1 Flash | openrouter | none, low, high, max |
| `openrouter/deepseek/deepseek-v4.1-flash:batch` | DeepSeek: DeepSeek V4.1 Flash (batch) | openrouter | none, low, high, max |
| `openrouter/moonshotai/kimi-k2` | MoonshotAI: Kimi K2 0711 | openrouter | none |
| `openrouter/moonshotai/kimi-k2-0905` | MoonshotAI: Kimi K2 0905 | openrouter | none |
| `openrouter/moonshotai/kimi-k2-thinking` | MoonshotAI: Kimi K2 Thinking | openrouter | low, medium, high |
| `openrouter/moonshotai/kimi-k2.5` | MoonshotAI: Kimi K2.5 | openrouter | none, low, medium, high |
| `openrouter/moonshotai/kimi-k2.6` | MoonshotAI: Kimi K2.6 | openrouter | none, low, medium, high |
| `openrouter/moonshotai/kimi-k2.7-code` | MoonshotAI: Kimi K2.7 Code | openrouter | low, medium, high |
| `openrouter/moonshotai/kimi-k3` | MoonshotAI: Kimi K3 | openrouter | none, low, high, max |
| `openrouter/moonshotai/kimi-k3:batch` | MoonshotAI: Kimi K3 (batch) | openrouter | none, low, high, max |
| `openrouter/z-ai/glm-4.5` | Z.ai: GLM 4.5 | openrouter | none, low, medium, high |
| `openrouter/z-ai/glm-4.5-air` | Z.ai: GLM 4.5 Air | openrouter | none, low, medium, high |
| `openrouter/z-ai/glm-4.5v` | Z.ai: GLM 4.5V | openrouter | none, low, medium, high |
| `openrouter/z-ai/glm-4.6` | Z.ai: GLM 4.6 | openrouter | none, low, medium, high |
| `openrouter/z-ai/glm-4.6v` | Z.ai: GLM 4.6V | openrouter | none, low, medium, high |
| `openrouter/z-ai/glm-4.7` | Z.ai: GLM 4.7 | openrouter | none, low, medium, high |
| `openrouter/z-ai/glm-4.7-flash` | Z.ai: GLM 4.7 Flash | openrouter | none, low, medium, high |
| `openrouter/z-ai/glm-5` | Z.ai: GLM 5 | openrouter | none, low, medium, high |
| `openrouter/z-ai/glm-5-turbo` | Z.ai: GLM 5 Turbo | openrouter | none, low, medium, high |
| `openrouter/z-ai/glm-5.1` | Z.ai: GLM 5.1 | openrouter | none, low, medium, high |
| `openrouter/z-ai/glm-5.2` | Z.ai: GLM 5.2 | openrouter | none, high, xhigh |
| `openrouter/z-ai/glm-5.3` | Z.ai: GLM 5.3 | openrouter | low, high, max |
| `openrouter/z-ai/glm-5.3-flash` | Z.ai: GLM 5.3 Flash | openrouter | low, high, max |
| `openrouter/z-ai/glm-5.3-flash:batch` | Z.ai: GLM 5.3 Flash (batch) | openrouter | low, high, max |
| `openrouter/z-ai/glm-5.3-flashx` | Z.ai: GLM 5.3 FlashX | openrouter | low, high, max |
| `openrouter/z-ai/glm-5.3-prime` | Z.ai: GLM 5.3 Prime | openrouter | low, high, max |
| `openrouter/z-ai/glm-5.3:batch` | Z.ai: GLM 5.3 (batch) | openrouter | low, high, max |
| `openrouter/z-ai/glm-5v-turbo` | Z.ai: GLM 5V Turbo | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen-2.5-72b-instruct` | Qwen2.5 72B Instruct | openrouter | none |
| `openrouter/qwen/qwen-2.5-7b-instruct` | Qwen: Qwen2.5 7B Instruct | openrouter | none |
| `openrouter/qwen/qwen-plus` | Qwen: Qwen-Plus | openrouter | none |
| `openrouter/qwen/qwen-plus-2025-07-28` | Qwen: Qwen Plus 0728 | openrouter | none |
| `openrouter/qwen/qwen3-14b` | Qwen: Qwen3 14B | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen3-235b-a22b` | Qwen: Qwen3 235B A22B | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen3-235b-a22b-2507` | Qwen: Qwen3 235B A22B Instruct 2507 | openrouter | none |
| `openrouter/qwen/qwen3-235b-a22b-thinking-2507` | Qwen: Qwen3 235B A22B Thinking 2507 | openrouter | low, medium, high |
| `openrouter/qwen/qwen3-30b-a3b` | Qwen: Qwen3 30B A3B | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen3-30b-a3b-instruct-2507` | Qwen: Qwen3 30B A3B Instruct 2507 | openrouter | none |
| `openrouter/qwen/qwen3-30b-a3b-thinking-2507` | Qwen: Qwen3 30B A3B Thinking 2507 | openrouter | low, medium, high |
| `openrouter/qwen/qwen3-32b` | Qwen: Qwen3 32B | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen3-8b` | Qwen: Qwen3 8B | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen3-coder` | Qwen: Qwen3 Coder 480B A35B | openrouter | none |
| `openrouter/qwen/qwen3-coder-30b-a3b-instruct` | Qwen: Qwen3 Coder 30B A3B Instruct | openrouter | none |
| `openrouter/qwen/qwen3-coder-flash` | Qwen: Qwen3 Coder Flash | openrouter | none |
| `openrouter/qwen/qwen3-coder-next` | Qwen: Qwen3 Coder Next | openrouter | none |
| `openrouter/qwen/qwen3-coder-plus` | Qwen: Qwen3 Coder Plus | openrouter | none |
| `openrouter/qwen/qwen3-max` | Qwen: Qwen3 Max | openrouter | none |
| `openrouter/qwen/qwen3-max-thinking` | Qwen: Qwen3 Max Thinking | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen3-next-80b-a3b-instruct` | Qwen: Qwen3 Next 80B A3B Instruct | openrouter | none |
| `openrouter/qwen/qwen3-next-80b-a3b-thinking` | Qwen: Qwen3 Next 80B A3B Thinking | openrouter | low, medium, high |
| `openrouter/qwen/qwen3-vl-235b-a22b-instruct` | Qwen: Qwen3 VL 235B A22B Instruct | openrouter | none |
| `openrouter/qwen/qwen3-vl-235b-a22b-thinking` | Qwen: Qwen3 VL 235B A22B Thinking | openrouter | low, medium, high |
| `openrouter/qwen/qwen3-vl-30b-a3b-instruct` | Qwen: Qwen3 VL 30B A3B Instruct | openrouter | none |
| `openrouter/qwen/qwen3-vl-30b-a3b-thinking` | Qwen: Qwen3 VL 30B A3B Thinking | openrouter | low, medium, high |
| `openrouter/qwen/qwen3-vl-32b-instruct` | Qwen: Qwen3 VL 32B Instruct | openrouter | none |
| `openrouter/qwen/qwen3-vl-8b-instruct` | Qwen: Qwen3 VL 8B Instruct | openrouter | none |
| `openrouter/qwen/qwen3-vl-8b-thinking` | Qwen: Qwen3 VL 8B Thinking | openrouter | low, medium, high |
| `openrouter/qwen/qwen3.5-122b-a10b` | Qwen: Qwen3.5-122B-A10B | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen3.5-27b` | Qwen: Qwen3.5-27B | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen3.5-35b-a3b` | Qwen: Qwen3.5-35B-A3B | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen3.5-397b-a17b` | Qwen: Qwen3.5 397B A17B | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen3.5-9b` | Qwen: Qwen3.5-9B | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen3.5-flash-02-23` | Qwen: Qwen3.5-Flash | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen3.5-plus-02-15` | Qwen: Qwen3.5 Plus 2026-02-15 | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen3.5-plus-20260420` | Qwen: Qwen3.5 Plus 2026-04-20 | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen3.6-27b` | Qwen: Qwen3.6 27B | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen3.6-35b-a3b` | Qwen: Qwen3.6 35B A3B | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen3.6-flash` | Qwen: Qwen3.6 Flash | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen3.6-max-preview` | Qwen: Qwen3.6 Max Preview | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen3.6-plus` | Qwen: Qwen3.6 Plus | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen3.7-flash` | Qwen: Qwen3.7 Flash | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen3.7-max` | Qwen: Qwen3.7 Max | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen3.7-plus` | Qwen: Qwen3.7 Plus | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen3.8-2.4t-a95b` | Qwen: Qwen3.8 2.4T A95B | openrouter | low, medium, xhigh |
| `openrouter/qwen/qwen3.8-27b` | Qwen: Qwen3.8 27B | openrouter | none, low, medium, xhigh |
| `openrouter/qwen/qwen3.8-flash` | Qwen: Qwen3.8 Flash | openrouter | none, low, medium, high |
| `openrouter/qwen/qwen3.8-max-0902` | Qwen: Qwen3.8 Max (0902) | openrouter | low, medium, high, xhigh |
| `openrouter/qwen/qwen3.8-max-prime` | Qwen: Qwen3.8 Max Prime | openrouter | low, medium, high, xhigh |
| `openrouter/qwen/qwen3.8-omni-flash` | Qwen: Qwen3.8 Omni Flash | openrouter | none, low, medium, high |
| `openrouter/meta-llama/llama-3.1-70b-instruct` | Meta: Llama 3.1 70B Instruct | openrouter | none |
| `openrouter/meta-llama/llama-3.1-8b-instruct` | Meta: Llama 3.1 8B Instruct | openrouter | none |
| `openrouter/meta-llama/llama-3.3-70b-instruct` | Meta: Llama 3.3 70B Instruct | openrouter | none |
| `openrouter/meta-llama/llama-4-maverick` | Meta: Llama 4 Maverick | openrouter | none |
| `openrouter/meta-llama/llama-4-scout` | Meta: Llama 4 Scout | openrouter | none |
| `openrouter/mistralai/codestral-2508` | Mistral: Codestral 2508 | openrouter | none |
| `openrouter/mistralai/codestral-2508:batch` | Mistral: Codestral 2508 (batch) | openrouter | none |
| `openrouter/mistralai/devstral-2512` | Mistral: Devstral 2 2512 | openrouter | none |
| `openrouter/mistralai/ministral-14b-2512` | Mistral: Ministral 3 14B 2512 | openrouter | none |
| `openrouter/mistralai/ministral-3b-2512` | Mistral: Ministral 3 3B 2512 | openrouter | none |
| `openrouter/mistralai/ministral-8b-2512` | Mistral: Ministral 3 8B 2512 | openrouter | none |
| `openrouter/mistralai/ministral-8b-2512:batch` | Mistral: Ministral 3 8B 2512 (batch) | openrouter | none |
| `openrouter/mistralai/mistral-large` | Mistral Large | openrouter | none |
| `openrouter/mistralai/mistral-large-2407` | Mistral Large 2407 | openrouter | none |
| `openrouter/mistralai/mistral-large-2512` | Mistral: Mistral Large 3 2512 | openrouter | none |
| `openrouter/mistralai/mistral-large-2512:batch` | Mistral: Mistral Large 3 2512 (batch) | openrouter | none |
| `openrouter/mistralai/mistral-medium-3` | Mistral: Mistral Medium 3 | openrouter | none |
| `openrouter/mistralai/mistral-medium-3-5` | Mistral: Mistral Medium 3.5 | openrouter | none, high |
| `openrouter/mistralai/mistral-medium-3-5:batch` | Mistral: Mistral Medium 3.5 (batch) | openrouter | none, high |
| `openrouter/mistralai/mistral-medium-3.1` | Mistral: Mistral Medium 3.1 | openrouter | none |
| `openrouter/mistralai/mistral-medium-3.1:batch` | Mistral: Mistral Medium 3.1 (batch) | openrouter | none |
| `openrouter/mistralai/mistral-nemo` | Mistral: Mistral Nemo | openrouter | none |
| `openrouter/mistralai/mistral-saba` | Mistral: Saba | openrouter | none |
| `openrouter/mistralai/mistral-small-2603` | Mistral: Mistral Small 4 | openrouter | none, high |
| `openrouter/mistralai/mistral-small-2603:batch` | Mistral: Mistral Small 4 (batch) | openrouter | none, high |
| `openrouter/mistralai/mistral-small-3.1-24b-instruct` | Mistral: Mistral Small 3.1 24B | openrouter | none |
| `openrouter/mistralai/mistral-small-3.2-24b-instruct` | Mistral: Mistral Small 3.2 24B | openrouter | none |
| `openrouter/mistralai/mixtral-8x22b-instruct` | Mistral: Mixtral 8x22B Instruct | openrouter | none |
| `openrouter/mistralai/voxtral-small-24b-2507` | Mistral: Voxtral Small 24B 2507 | openrouter | none |
| `openrouter/mistralai/mistral-large-4-0` | Mistral: Mistral Large 4 | openrouter | none, high |
| `openrouter/google/gemma-3-12b-it` | Google: Gemma 3 12B | openrouter | none |
| `openrouter/google/gemma-3-27b-it` | Google: Gemma 3 27B | openrouter | none |
| `openrouter/google/gemma-4-26b-a4b-it` | Google: Gemma 4 26B A4B  | openrouter | none, low, medium, high |
| `openrouter/google/gemma-4-26b-a4b-it:free` | Google: Gemma 4 26B A4B  (free) | openrouter | none, low, medium, high |
| `openrouter/google/gemma-4-31b-it` | Google: Gemma 4 31B | openrouter | none, low, medium, high |
| `openrouter/google/gemma-4-31b-it:free` | Google: Gemma 4 31B (free) | openrouter | none, low, medium, high |
| `openrouter/openai/gpt-oss-120b` | OpenAI: gpt-oss-120b | openrouter | low, medium, high |
| `openrouter/openai/gpt-oss-120b:batch` | OpenAI: gpt-oss-120b (batch) | openrouter | low, medium, high |
| `openrouter/openai/gpt-oss-20b` | OpenAI: gpt-oss-20b | openrouter | low, medium, high |
| `openrouter/openai/gpt-oss-20b:batch` | OpenAI: gpt-oss-20b (batch) | openrouter | low, medium, high |
| `openrouter/openai/gpt-oss-safeguard-20b` | OpenAI: gpt-oss-safeguard-20b | openrouter | low, medium, high |

## acp-cursor — 6 entries

[Machine-readable snapshot](../inventory/acp-cursor.json)

| ID | Display name | Route | Reasoning efforts |
| --- | --- | --- | --- |
| `default` | Auto | native | medium |
| `grok-4.6` | Grok 4.6 | native | low, medium, high, xhigh |
| `gpt-5.6-sol` | GPT-5.6 Sol | native | none, low, medium, high, xhigh, max |
| `claude-opus-5` | Claude Opus 5 | native | none, low, medium, high, xhigh, max |
| `claude-fable-5` | Claude Fable 5 | native | none, low, medium, high, xhigh, max |
| `composer-2.5` | Composer 2.5 | native | medium |
