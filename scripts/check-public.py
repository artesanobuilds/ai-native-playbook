#!/usr/bin/env python3
"""Publication preflight. Reports paths, never secret values. Not a privacy guarantee."""
from pathlib import Path
import re,sys,urllib.parse
root=Path(__file__).resolve().parents[1]
errors=[];files=0
patterns=[rb'sk-(?:ant-|proj-|or-v1-)[A-Za-z0-9_-]{20,}',rb'gh[pousr]_[A-Za-z0-9]{30,}',rb'github_pat_[A-Za-z0-9_]{30,}',rb'xox[baprs]-[A-Za-z0-9-]{20,}',rb'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----',rb'\b\d{8,12}:[A-Za-z0-9_-]{30,}\b']
for p in root.rglob('*'):
 rel=p.relative_to(root)
 if any(x in ['.git','__pycache__','node_modules'] for x in rel.parts):continue
 if p.is_symlink():errors.append(f'Symlink: {rel}');continue
 if not p.is_file():continue
 files+=1
 if any(x in ['state','sessions','.playbook-research'] for x in rel.parts) or p.name.startswith('.env') or p.name in ['auth.json','credentials.json','SETUP-REPORT.md']:
  errors.append(f'Private path: {rel}')
 data=p.read_bytes()
 if any(re.search(pat,data) for pat in patterns):errors.append(f'Potential credential: {rel}')
 if re.search(rb'(?<!:)\/Users\/(?!Shared/|dev/)[A-Za-z0-9_.-]+/', data):errors.append(f'Absolute personal path: {rel}')
 if p.suffix=='.md' and 'payload' not in rel.parts:
  for link in re.findall(r'\]\(([^)]+)\)',data.decode()):
   url=link.split(' "')[0].strip('<>');part=urllib.parse.urlsplit(url)
   if part.scheme or not part.path:continue
   dest=p.parent/urllib.parse.unquote(part.path)
   if not dest.exists():errors.append(f'Broken link: {rel} -> {url}')
if errors:
 print('\n'.join(errors));sys.exit(1)
print(f'PASS: {files} files checked for common secret patterns, private paths and first-party Markdown link targets.')
