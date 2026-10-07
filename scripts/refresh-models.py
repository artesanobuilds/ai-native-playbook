#!/usr/bin/env python3
"""Refresh only safe catalog metadata for an explicitly selected BB environment."""
from pathlib import Path
import argparse,json,subprocess,datetime
p=argparse.ArgumentParser();p.add_argument('--environment',required=True);p.add_argument('--output',type=Path,required=True);args=p.parse_args()
args.output.mkdir(parents=True,exist_ok=True)
for provider in ['codex','claude-code','pi','acp-cursor']:
 raw=json.loads(subprocess.check_output(['bb','provider','models',provider,'--environment',args.environment,'--json'],text=True))
 fields=['id','displayName','routeProviderId','supportedReasoningEfforts','defaultReasoningEffort','isDefault']
 safe=[{k:m[k] for k in fields if k in m} for m in raw]
 (args.output/f'{provider}.json').write_text(json.dumps(safe,indent=2)+'\n')
 print(f'{provider}: {len(safe)} catalog entries')
print('Captured',datetime.datetime.now(datetime.timezone.utc).isoformat())
print('Review these files, rerun scripts/dedupe-models.py and update docs/models.md, docs/model-count.md and the README count before publishing. No inference test was run.')
