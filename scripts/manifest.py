#!/usr/bin/env python3
"""Refresh payload integrity metadata after reviewing intentional source changes."""
from pathlib import Path
import json,hashlib
root=Path(__file__).resolve().parents[1]
paths=[p for p in (root/'payload').rglob('*') if p.is_file()]
paths += [root/n for n in ['START-HERE.md','CLAUDE.md','PLAYBOOK.md','THIRD-PARTY-NOTICES.md','bootstrap.py']]
for p in paths:
 if p.is_symlink():raise SystemExit('Refusing symlink')
manifest={'format':1,'created':'2026-10-07','sha256':{str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(paths)}}
(root/'MANIFEST.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(f'Manifest: {len(paths)} files')
