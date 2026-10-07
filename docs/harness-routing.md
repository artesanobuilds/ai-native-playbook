# Choosing a harness and model

Start with the task’s tools, context and permission needs. Then choose a model exposed by that harness on that host. This is a practical routing guide derived from local usage and available integrations, not a benchmark ranking.

| Task | Starting point | Why / completion evidence |
| --- | --- | --- |
| Continue established coding work | The harness with the relevant thread and working tool access | Less context reconstruction; tests and a reviewable diff |
| Move a terminal task into managed threads | Claude Code handoff → BB; continue in an available harness | Durable rules and a cold-start handoff preserve intent |
| Broad implementation or debugging | Claude Code or Codex, whichever has the needed environment | Local archives show both used for coding, setup and artifacts |
| Independent code review | A separate reviewer; optionally another model family | Concrete findings with file locations, severity and validation |
| Explore alternate model families | Pi | Live catalog includes xAI and OpenRouter; credentials and balance matter |
| Use an existing Cursor workflow | Cursor via BB’s ACP provider | Preserve its tool/environment fit; verify available features |
| Narrated video | A coding harness orchestrating media tools | Script, imagery, TTS, FFmpeg and playback verification |
| Document or spreadsheet | Harness plus the appropriate artifact tooling | Render and inspect the final artifact, not just the source |
| Recurring assistant | Explicit specialist contract plus scheduler | Fresh inputs, bounded actions, durable run report and deduplication |

Use a small, fast model for bounded extraction or status checks only after confirming it handles representative cases. Escalate difficult debugging, architecture or conflicting evidence to a stronger model. Avoid turning every tiny task into a multi-agent job.

Model names, effort levels and defaults change. Use `bb provider models PROVIDER --environment ENV --json` and choose from that result. The snapshot includes “Auto,” context variants and routed models; these are not all separate underlying models. Do not sum catalog entries into a claim about unique model capability.

The archive does not establish a reliable model-by-model success rate, token-cost comparison or controlled performance comparison. Do not present this routing table as one.
