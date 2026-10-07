# Coming next: my own harness and model evals

**Status: planned. No evaluation suite or comparative results are published yet.**

Having four harnesses and a broad model catalog gives me the freedom to experiment. The next step is to measure which harnesses work best for which problems, and which harness-and-model combinations work best for my tasks.

## Questions I want to answer

- Which combinations reliably fix bugs, build features and review code?
- Which handle long tasks and context handoffs well?
- Which are effective at research, document production and media-tool orchestration?
- When does a faster or cheaper choice produce a result good enough for the task?
- How much do harness tools, permissions and orchestration change the result for the same named model?

## Proposed method

Start with a small set of representative tasks and explicit acceptance checks: a bug with a failing test, a bounded feature, a seeded review defect, a research synthesis, a rendered document and a short video pipeline. Use synthetic or authorized fixtures, keeping private data out of a public benchmark.

Compare the same model across harnesses where it is available, and different models within the same harness. Then compare complete combinations on the same task set. Some combinations do not exist; report those as unavailable rather than filling in scores.

Record harness/version, exact model route, reasoning effort, tool access, permissions, context, instructions and starting repository state. Keep conditions comparable and record differences that cannot be controlled. Retain speed and context variants as distinct experimental configurations even when grouped for the headline model count.

Measure task success, correctness, regressions, human intervention, elapsed time, tool failures and cost where observable. Repeat tasks to capture variability. Use deterministic checks where possible and a stated rubric for visual or editorial quality. Preserve failed runs and avoid selecting only the best attempt.

The eventual output should be a task-based routing guide backed by results, with known limitations and reproducible fixtures. Until then, the existing routing guide is a starting point based on usage, not a claim that one harness or model wins.
