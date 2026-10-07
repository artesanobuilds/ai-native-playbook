# Rebuild the setup

For the inspiration behind this setup, watch David Ondrej’s [My Agentic Engineering Workflow (after 6,775 sessions)](https://www.youtube.com/watch?v=c9nRxEy1kUY). Then follow this guide to build your own version.

## 1. Get the playbook

```bash
mkdir -p "$HOME/Coding/AI-native"
git clone https://github.com/artesanobuilds/ai-native-playbook.git "$HOME/Coding/AI-native/ai-native-playbook"
cd "$HOME/Coding/AI-native/ai-native-playbook"
```

Open this folder in your preferred coding agent. Read the prompt in README.md. An existing signed-in harness is enough to guide setup; you do not need all four to begin.

## 2. Inspect before installing

Use Python 3.9+ to read and run the bootstrap. The target below is deliberately separate from the source clone and any existing installation:

```bash
python3 bootstrap.py --target "$HOME/Coding/AI-native/workstation" --dry-run
```

The dry run checks the bundled payload and reports planned staging. It does not authenticate providers, download packages or prove runtime compatibility. For installation, prerequisites are Git, bash, jq, a supported Node version and npm. Use Node 22.19+ within 22.x, 24.x or 26.x, matching the bootstrap gate. Prefer a supported release that also satisfies every package’s engine field.

```bash
python3 bootstrap.py --target "$HOME/Coding/AI-native/workstation" --install
source "$HOME/Coding/AI-native/workstation/env.sh"
```

A run without either flag only stages files. The installer refuses different existing source files. It does not overwrite existing profiles. Follow PLAYBOOK.md for logins, BB registration, plugins, skill discovery and smoke tests.

## 3. Verify the result

Copy templates/setup-report.md to SETUP-REPORT.md in your installation root. Fill in actual outcomes. Start BB only after checking for an existing server:

```bash
"$HOME/Coding/AI-native/workstation/bb/bb.sh"
```

The source machine’s paths and catalog counts are examples, not required values on your machine. Keep your setup report private: it can contain local paths and environment details.
