#!/usr/bin/env python3
"""Install the portable bundle without replacing existing files or home settings."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import platform
import shlex
import shutil
import subprocess
import sys

BUNDLE = Path(__file__).resolve().parent


def execute(args, cwd, env):
    print('+ ' + shlex.join([str(x) for x in args]), flush=True)
    subprocess.run(args, cwd=cwd, env=env, check=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--target', type=Path, default=Path.home() / 'Coding/AI-native')
    parser.add_argument('--dry-run', action='store_true', help='Verify and preview; write nothing')
    parser.add_argument('--install', action='store_true', help='Also download/install BB, Claude Code, Codex, Pi')
    args = parser.parse_args()
    root = args.target.expanduser().resolve()
    if platform.system() not in ('Darwin', 'Linux'):
        sys.exit('Use macOS, Linux, or WSL2; native Windows is not supported by this bootstrap.')
    manifest = json.loads((BUNDLE / 'MANIFEST.json').read_text())
    actual_payload = {str(p.relative_to(BUNDLE)) for p in (BUNDLE / 'payload').rglob('*') if p.is_file() or p.is_symlink()}
    expected_payload = {p for p in manifest['sha256'] if p.startswith('payload/')}
    if actual_payload != expected_payload:
        sys.exit('Bundle payload does not match manifest; no files written.')
    for name, digest in manifest['sha256'].items():
        item = BUNDLE / name
        if Path(name).is_absolute() or '..' in Path(name).parts or item.is_symlink():
            sys.exit('Invalid bundle path')
        if hashlib.sha256(item.read_bytes()).hexdigest() != digest:
            sys.exit('Integrity check failed: ' + name)
    planned = {}
    for src in sorted((BUNDLE / 'payload').rglob('*')):
        if src.is_file():
            planned[src.relative_to(BUNDLE / 'payload')] = src.read_bytes()
    for name in ('PLAYBOOK.md', 'CLAUDE.md', 'START-HERE.md', 'THIRD-PARTY-NOTICES.md'):
        planned[Path(name)] = (BUNDLE / name).read_bytes()
    planned[Path('AGENTS.md')] = planned[Path('CLAUDE.md')]
    planned[Path('.bb/AGENTS.md')] = planned[Path('CLAUDE.md')]
    q = shlex.quote(str(root))
    env_sh = f'''# Generated for this installation. Source from bash or zsh.
export AI_NATIVE_ROOT={q}
export PATH="$AI_NATIVE_ROOT/bin:$AI_NATIVE_ROOT/tools/bin:$PATH"
export BB_DATA_DIR="$AI_NATIVE_ROOT/bb/data"
export CLAUDE_CONFIG_DIR="$AI_NATIVE_ROOT/state/claude"
export CODEX_HOME="$AI_NATIVE_ROOT/state/codex"
export PI_CODING_AGENT_DIR="$AI_NATIVE_ROOT/state/pi"
export npm_config_cache="$AI_NATIVE_ROOT/.cache/npm"
# Optional keys belong only in this private target file, never in the source kit.
if [ -f "$AI_NATIVE_ROOT/.env.agent-keys" ]; then
  set -a; . "$AI_NATIVE_ROOT/.env.agent-keys"; set +a
fi
# Subscription-first launch environment. Shell startup files can reintroduce keys.
unset ANTHROPIC_API_KEY ANTHROPIC_AUTH_TOKEN OPENAI_API_KEY
'''
    planned[Path('env.sh')] = env_sh.encode()
    prologue = '#!/bin/bash\nset -euo pipefail\nROOT="$(cd "$(dirname "$0")/.." && pwd)"\nsource "$ROOT/env.sh"\n'
    for name, module in [('claude', 'claude'), ('codex', 'codex'), ('pi', 'pi')]:
        planned[Path('bin') / name] = (prologue + f'exec "$ROOT/{module}/node_modules/.bin/{name}" "$@"\n').encode()
    planned[Path('bin/bb')] = (prologue + 'exec "$ROOT/bb/node_modules/.bin/bb" "$@"\n').encode()
    planned[Path('bb/bb.sh')] = (prologue + '''case "${1:-start}" in
  start) exec "$ROOT/bb/node_modules/.bin/bb-app" --data-dir "$BB_DATA_DIR" start ;;
  stop) exec "$ROOT/bb/node_modules/.bin/bb-app" --data-dir "$BB_DATA_DIR" stop ;;
  cli) shift; exec "$ROOT/bb/node_modules/.bin/bb" "$@" ;;
  *) echo 'Usage: bb/bb.sh [start|stop|cli COMMAND...]' >&2; exit 2 ;;
esac
''').encode()
    hook = shlex.quote(str(root / 'hooks/deny-dangerous.sh'))
    settings = {'hooks': {'PreToolUse': [{'matcher': 'Bash', 'hooks': [{'type': 'command', 'command': hook}]}]}}
    # Only seed NEW isolated settings. Never overwrite a user's existing settings.
    cfg = Path('state/claude/settings.json')
    if not (root / cfg).exists():
        planned[cfg] = (json.dumps(settings, indent=2) + '\n').encode()
    for package, spec in [('claude', '@anthropic-ai/claude-code@2.1.292')]:
        name, version = spec.rsplit('@', 1)
        planned[Path(package) / 'package.json'] = (json.dumps({'private': True, 'dependencies': {name: version}}, indent=2) + '\n').encode()
    conflicts = []
    for rel, content in planned.items():
        dest = root / rel
        if not dest.resolve().is_relative_to(root):
            conflicts.append(str(rel) + ' (symlink escapes target)')
        elif dest.is_symlink() or (dest.exists() and (not dest.is_file() or dest.read_bytes() != content)):
            conflicts.append(str(rel))
    if conflicts:
        sys.exit('No files written. Target has conflicting files; use an empty target or merge manually:\n' + '\n'.join(conflicts))
    print(f'Bundle verified: {len(manifest["sha256"])} files. Target: {root}')
    print('Core: BB 0.42.1, Codex 0.154.0, Claude Code 2.1.292, Pi 1.0.4')
    print('Claude Code completes Cursor, Herdr, Ghostty, BB registration, skills, guard integrations and login checks via PLAYBOOK.md.')
    if args.dry_run:
        print(f'DRY RUN: would stage {len(planned)} files; install={args.install}. No changes made.')
        return
    if args.install:
        for cmd in ('node', 'npm', 'git', 'jq', 'bash'):
            if not shutil.which(cmd):
                sys.exit(f'Missing prerequisite: {cmd}. See PLAYBOOK.md section 1; no files written.')
        version = subprocess.check_output(['node', '-p', 'process.versions.node'], text=True).strip()
        parts = tuple(int(x) for x in version.split('.'))
        if not (parts[0] in (22, 24, 26) and parts >= (22, 19, 0)):
            sys.exit('Use Node 22.19+, 24.x, or 26.x (BB engine requirement). No files written.')
    os.umask(0o077)
    for rel, content in planned.items():
        dest = root / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        if not dest.exists():
            dest.write_bytes(content)
        if dest.suffix == '.sh' or rel.parts[0] == 'bin':
            dest.chmod(0o700)
    for state in ('claude', 'codex', 'pi'):
        (root / 'state' / state).mkdir(parents=True, exist_ok=True)
    if args.install:
        env = os.environ.copy()
        env['npm_config_cache'] = str(root / '.cache/npm')
        for key in ('ANTHROPIC_API_KEY', 'ANTHROPIC_AUTH_TOKEN', 'OPENAI_API_KEY'):
            env.pop(key, None)
        for module in ('bb', 'codex', 'claude', 'pi'):
            directory = root / module
            command = ['npm', 'ci' if (directory / 'package-lock.json').exists() else 'install']
            if module == 'pi':
                command.append('--ignore-scripts')
            execute(command, directory, env)
        execute(['bash', str(root / 'hooks/test-guard.sh')], root, env)
        for binary in ('claude', 'codex', 'pi'):
            execute([str(root / 'bin' / binary), '--version'], root, env)
    print('Staged successfully. Continue with PLAYBOOK.md; login and integration checks are still required.')
    print('source ' + shlex.quote(str(root / 'env.sh')))
    print('Start BB after completing preflight: ' + shlex.quote(str(root / 'bb/bb.sh')))


if __name__ == '__main__':
    main()
