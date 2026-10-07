#!/usr/bin/env bash
# Install (or remove) the move-to-bb Claude Code skill by symlinking this folder
# into ~/.claude. The files stay here; ~/.claude only gets links.
#
#   ./install.sh              create the links (refuses to replace real files)
#   ./install.sh --force      back up a real file to <file>.bak-<date> and replace it
#   ./install.sh --dry-run    print what would change
#   ./install.sh --uninstall  remove the links this script made (real files untouched)
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_HOME="${CLAUDE_HOME:-$HOME/.claude}"
SKILL_LINK="$CLAUDE_HOME/skills/move-to-bb"
RULE_LINK="$CLAUDE_HOME/rules/bb-handoff.md"

mode=install force=0 dry=0
for arg in "$@"; do
  case "$arg" in
    --uninstall) mode=uninstall ;;
    --force) force=1 ;;
    --dry-run) dry=1 ;;
    -h|--help) sed -n '2,8p' "$0"; exit 0 ;;
    *) echo "unknown option: $arg" >&2; exit 2 ;;
  esac
done

run() { if [ "$dry" = 1 ]; then echo "would: $*"; else "$@"; fi; }

link() { # link <target> <linkpath>
  local target="$1" path="$2"
  if [ -L "$path" ]; then
    if [ "$(readlink "$path")" = "$target" ]; then echo "ok      $path"; return; fi
    echo "relink  $path"; run rm "$path"
  elif [ -e "$path" ]; then
    if [ "$force" != 1 ]; then
      echo "REFUSE  $path exists and is not a symlink; rerun with --force to back it up" >&2
      return 1
    fi
    local bak; bak="$path.bak-$(date +%Y%m%d%H%M%S)"
    echo "backup  $path -> $bak"; run mv "$path" "$bak"
  else
    echo "link    $path"
  fi
  run mkdir -p "$(dirname "$path")"
  run ln -s "$target" "$path"
}

unlink_own() { # remove only if it is a symlink pointing into this folder
  local path="$1"
  if [ -L "$path" ] && [[ "$(readlink "$path")" == "$HERE"* ]]; then
    echo "remove  $path"; run rm "$path"
  else
    echo "skip    $path (not our link)"
  fi
}

case "$mode" in
  install)
    status=0
    link "$HERE" "$SKILL_LINK" || status=1
    link "$HERE/rules/bb-handoff.md" "$RULE_LINK" || status=1
    if [ "$status" = 0 ] && [ "$dry" = 0 ]; then
      echo "installed: /move-to-bb is available in new Claude Code sessions"
    fi
    exit "$status"
    ;;
  uninstall)
    unlink_own "$SKILL_LINK"
    unlink_own "$RULE_LINK"
    ;;
esac
