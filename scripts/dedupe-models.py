#!/usr/bin/env python3
"""Count model choices in the saved snapshot using explicit, reviewable grouping rules."""
from pathlib import Path
from collections import defaultdict
import argparse,json,re
ROOT=Path(__file__).resolve().parents[1]
HARNESSES=('codex','claude-code','acp-cursor','pi')
# A counting convention for documented aliases and speed SKUs, not a weights audit.
ALIASES={
 'mistralai/mistral-large':'mistralai/mistral-large-2407',
 'z-ai/glm-5.3-prime':'z-ai/glm-5.3',
 'z-ai/glm-5.3-flashx':'z-ai/glm-5.3-flash',
 'qwen/qwen3.8-max-prime':'qwen/qwen3.8-max-0902',
}

def build():
 groups=defaultdict(list);excluded=[];raw_counts={}
 for harness in HARNESSES:
  models=json.loads((ROOT/'inventory'/f'{harness}.json').read_text());raw_counts[harness]=len(models)
  assert len({m['id'] for m in models})==len(models)
  for model in models:
   source={'harness':harness,'id':model['id'],'name':model['displayName'].strip()}
   key=model['id']
   if harness=='acp-cursor' and key=='default':
    excluded.append({**source,'reason':'Auto is a selector, not a model'});continue
   key=key.removeprefix('openrouter/')
   if key.startswith(('xai/','x-ai/')):key=key.split('/',1)[1]
   key=re.sub(r'\[1m\]$','',key)
   key=re.sub(r':(?:batch|free)$','',key)
   key=ALIASES.get(key,key)
   groups[key].append(source)
 # Every input entry is accounted for once; every canonical group has one row.
 assert sum(map(len,groups.values()))+len(excluded)==sum(raw_counts.values())
 # Targeted checks protect distinctions that a broad substring deduper would lose.
 for key in ['qwen/qwen-plus','qwen/qwen-plus-2025-07-28','deepseek/deepseek-chat','deepseek/deepseek-chat-v3-0324']:
  assert key in groups
 assert len(groups['grok-4.6'])==3
 assert len(groups['claude-opus-5'])==3
 within={h:sum(any(x['harness']==h for x in v) for v in groups.values()) for h in HARNESSES}
 return {'snapshot_date':'2026-10-07','raw_entries':sum(raw_counts.values()),'raw_by_harness':raw_counts,
  'deduplicated_by_harness':within,'model_choices':len(groups),
  'excluded_selectors':excluded,'duplicate_entries_removed':sum(len(v)-1 for v in groups.values()),
  'groups':[{'model':key,'entries':v} for key,v in sorted(groups.items())]}

def main():
 parser=argparse.ArgumentParser();parser.add_argument('--check',action='store_true');args=parser.parse_args()
 result=build();dest=ROOT/'inventory/deduplicated-models.json';content=json.dumps(result,indent=2)+'\n'
 if args.check:
  assert dest.read_text()==content,'Deduplicated inventory is stale; rerun without --check'
 else:dest.write_text(content)
 print(json.dumps({k:v for k,v in result.items() if k not in ['groups','excluded_selectors']},indent=2))
if __name__=='__main__':main()
