# Poly-Glot Product Site — Deployment Guide

> For AI assistants (ChatGPT, Goose, etc.) updating https://hmoses.github.io/poly-glot-site/

## How Deployment Works

This is a **static GitHub Pages site**. No build step. No bundler. No framework.
Pure HTML/CSS/JavaScript served directly from the `main` branch.

### To deploy changes:

1. **Push to `main`** using the GitHub API (`create_or_update_file` or `push_files`)
2. **Wait 1–3 minutes** for GitHub's native Pages deployment
3. **Verify with curl** — do NOT claim live based on git push alone

### What triggers deployment:

- ✅ **GitHub Native Pages** (`pages build and deployment`) — FREE, automatic, always works
- ❌ **Custom workflow** (`.github/workflows/pages.yml`) — FAILS due to Actions billing restrictions

The custom workflow failure is **expected and harmless**. Ignore it.

## Do NOT:

- Try to fix or trigger `.github/workflows/pages.yml`
- Create new custom deployment workflows (same billing issue)
- Use Xcode Cloud for this site (Xcode Cloud is for the iOS/macOS apps only)
- Use `workflow_dispatch` (billing issue)

## Verification:

```bash
curl -sI "https://hmoses.github.io/poly-glot-site/" | grep last-modified
curl -s "https://hmoses.github.io/poly-glot-site/?cb=$(date +%s)" | grep "YOUR_CHANGE"
```

## Current Subscription Model (Do Not Revert)

1. Eligible customers start a 3-day Pro trial by authorizing an Apple subscription
2. Unless canceled, Apple charges the displayed plan price after the trial
3. Apple renews the subscription automatically
4. After the trial, Pro is required for sends, templates, and Compare Mode
5. No ongoing free Send or free-template allowance
6. Earlier app-managed trials do not cause charges without separate Apple subscription approval
7. Pro Monthly: $9.99/month | Pro Annual: $79.99/year

### Retired phrases — NEVER use:

- ~~"starts on the first qualifying Send"~~
- ~~"25 featured free templates"~~
- ~~"one shared single-AI Send every rolling 24 hours"~~
- ~~"does not automatically convert to a paid subscription"~~
- ~~"$0 eligible trial"~~
- ~~"Free vs Pro Access"~~
- ~~"What remains free after the 3-day trial?"~~

## Site Structure

- `index.html` — Main page (~650KB, single-file app)
- `compare-ai-tools.html` — Compare AI tools subpage
- `mcp-integrations.html` — MCP integrations subpage
- `multilingual-ai-workspace.html` — Multilingual workspace subpage
- `privacy-and-pricing.html` — Privacy and pricing subpage
- `prompt-templates.html` — Prompt templates subpage
- `assets/js/` — JavaScript files including 38-language locale files
- `knowledge/` — Markdown knowledge base files (used by LLMs and search engines)
- `llms.txt` — LLM-readable site summary
