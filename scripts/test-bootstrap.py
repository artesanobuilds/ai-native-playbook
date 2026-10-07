#!/usr/bin/env python3
"""Exercise staging, preservation and failure paths without network or login."""
from pathlib import Path
import json,subprocess,tempfile,shutil
root=Path(__file__).resolve().parents[1]
with tempfile.TemporaryDirectory(prefix='playbook-test-') as tmp:
 base=Path(tmp);kit=base/'kit';kit.mkdir()
 for n in ['bootstrap.py','MANIFEST.json','START-HERE.md','CLAUDE.md','PLAYBOOK.md','THIRD-PARTY-NOTICES.md']:shutil.copy(root/n,kit/n)
 shutil.copytree(root/'payload',kit/'payload')
 target=base/'target with spaces'
 def run(*args,ok=True):
  r=subprocess.run(['python3',str(kit/'bootstrap.py'),'--target',str(target),*args],capture_output=True,text=True)
  assert (r.returncode==0)==ok,r.stdout+r.stderr
  return r.stdout+r.stderr
 run('--dry-run');assert not target.exists()
 run()
 for p in list((target/'bin').iterdir())+[target/'env.sh',target/'bb/bb.sh']:subprocess.run(['bash','-n',str(p)],check=True)
 custom=target/'state/claude/settings.json';custom.write_text('{"custom":true}\n');run();assert custom.read_text()=='{"custom":true}\n'
 victim=target/'hooks/dangerous-patterns.txt';old=victim.read_bytes();victim.write_text('user edit\n');assert 'conflicting files' in run(ok=False);assert victim.read_text()=='user edit\n';victim.write_bytes(old)
 added=kit/'payload/unlisted.txt';added.write_text('x');assert 'does not match manifest' in run(ok=False);added.unlink()
 tamper=kit/'payload/hooks/dangerous-patterns.txt';tamper.write_text('tampered');assert 'Integrity check failed' in run(ok=False)
print('PASS: dry-run writes nothing; fresh staging; shell syntax; repeat staging; profile preservation; conflict refusal; unlisted payload rejection; tamper rejection.')
