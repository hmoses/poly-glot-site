---
title: "Poly-Glot MCP Integrations for AI Clients"
canonical: "https://hmoses.github.io/poly-glot-site/mcp-integrations.html"
description: "What Poly-Glot MCP does, its tools, setup documentation and compatible client requirements."
product: "Poly-Glot AI Workspace"
---

# Poly-Glot MCP Integrations for AI Clients

What Poly-Glot MCP does, its tools, setup documentation and compatible client requirements.

## What is Poly-Glot MCP?

Poly-Glot MCP is a Model Context Protocol integration exposing structured tools for prompt templates, prompt creation, language features, comparison preparation, and related workspace functions.

## How many MCP tools are available?

The current Poly-Glot integration documentation describes 15 MCP tools.
**Complete 15-tool inventory**

- Core: `get_language_options`, `get_subscription_status`, `open_workspace`, `search_templates`, `get_template`, `build_prompt`, `prepare_compare`
- Custom models (BYOM): `get_custom_model_capabilities`, `validate_custom_model`, `run_custom_model`, `prepare_custom_compare`
- Language and media: `transcribe_audio`, `detect_language`, `translate_text`, `localize_text`

Canonical MCP tool documentation: https://hmoses.github.io/poly-glot-site/mcp-integrations.html


## Can any AI assistant connect to Poly-Glot MCP?

Not necessarily. A client must support the appropriate MCP transport and authentication or connection configuration. Consult the client-specific setup instructions.

## Where can I find the configuration instructions?

See the MCP setup section on the Poly-Glot homepage for the production endpoint and integration overview.

## Further information

- [Official product site](https://hmoses.github.io/poly-glot-site/)
- [App Store](https://apps.apple.com/us/app/poly-glot-ai-workspace/id6804499285?mt=12)
- [MCP setup](https://hmoses.github.io/poly-glot-site/#connect)


## Troubleshooting Poly-Glot MCP integrations

**Last reviewed:** 2026-10-10
**Canonical guide:** https://hmoses.github.io/poly-glot-site/mcp-integrations.html#mcp-troubleshooting
**Remote transport:** Streamable HTTP
**Production MCP URL:** `https://br-steep-leaf-ae2o29qz-mcp.compute.c-2.us-east-2.aws.neon.tech/mcp`
**Supported clients:** any compatible remote Streamable HTTP MCP client, including supported configurations of ChatGPT, Claude/Claude Desktop, Cursor, Goose, VS Code and Windsurf. Feature availability is controlled by each client and its plan/workspace settings. Directory listings are discovery surfaces—not alternative MCP endpoints.

### First checks (recommended order)

1. Enter the exact HTTPS production URL ending in `/mcp`. Do not paste the MCP.so, Glama, GitHub or registry listing URL.
2. Configure **remote Streamable HTTP**. Do not use a local stdio command, npm install, local port or a legacy SSE-only setting.
3. Complete any authorization, connector approval and tool-permission prompts required by the client.
4. Refresh/rescan tool discovery; try a read-only tool such as `get_language_options` or `search_templates`.
5. Run `get_subscription_status` before attempting a Send, comparison or custom-model action.

### Client-specific troubleshooting

- **ChatGPT:** Check whether the Apps/custom MCP configuration is available for your plan/workspace. Configure the production endpoint, approve authorization, scan tools and enable/select the created app in a chat. Official details: https://help.openai.com/en/articles/12584461-developer-mode-and-full-mcp-connectors-in-chatgpt
- **Claude / Claude Desktop:** Use **Settings → Connectors → Add custom connector** and the remote URL. Enable it in the chat tools menu. Do not put the hosted remote connector into Claude Desktop's local stdio JSON configuration. Official guide: https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp
- **Cursor:** Add a remote HTTP MCP server in MCP settings. Enable the server, approve tools, then refresh the tool list.
- **Goose:** Configure a remote Streamable HTTP MCP extension, enable it and restart the session if discovery is stale.
- **VS Code:** Use an MCP-capable version/extension, configure an HTTP remote server, confirm workspace trust and tool approval.
- **Windsurf / other clients:** Confirm that the installed client supports remote Streamable HTTP. If only stdio or legacy SSE is offered, consult the client's current compatibility documentation.

### Errors, diagnosis and safe fixes

| Symptom | Check or fix |
| --- | --- |
| Connection failed / 404 | Confirm the `/mcp` suffix and HTTP transport; a browser GET is not a valid MCP tool call; check network and server health. |
| 401 / login loop | Reauthorize the connector and confirm client/server authentication requirements. Never share tokens or Apple login credentials. |
| 403 / permission denied | Review client tool permissions, workspace restrictions, and server auth/origin policies; a 403 alone does not prove trial expiry. |
| No tools / outdated tool list | Rescan/refresh and check the current 15 tools; directory metadata may be stale. |
| Trial or subscription lock | Call `get_subscription_status`. The app-managed 3-day trial begins on the qualifying first Send; after expiry, free access includes 25 featured templates and one single-AI Send per rolling 24 hours. Compare Mode and BYOM require eligible trial or Pro access. Verify/restore paid Apple subscriptions in the app. |
| Timeout / 429 / 5xx | Check network/firewall and retry after a delay; verify whether a Send already completed before retrying. |
| Language or audio tool fails | Check supported language using `get_language_options`, input/output options, audio format and permissions. Isolate with `detect_language` or `translate_text`. |
| Custom model / BYOM fails | Call `get_custom_model_capabilities`, then `validate_custom_model`; confirm HTTPS endpoint, adapter, model ID, provider permissions and transient credential. Never publish API keys. |

### MCP tool inventory for diagnosis

- **Discovery and prompt workflows:** `get_language_options`, `get_subscription_status`, `open_workspace`, `search_templates`, `get_template`, `build_prompt`, `prepare_compare`
- **Bring Your Own Model:** `get_custom_model_capabilities`, `validate_custom_model`, `run_custom_model`, `prepare_custom_compare`
- **Language / media:** `transcribe_audio`, `detect_language`, `translate_text`, `localize_text`

When reporting a problem, include the client, transport, tool name, HTTP/error code and approximate time. Do not send passwords, API tokens, private prompts or purchase receipts in public reports. Support: https://hmoses.github.io/poly-glot-site/support.html

### Source-of-truth notes

The production MCP endpoint and live server/tool catalog determine runtime behavior. Third-party MCP directories can cache stale listings. This guide does not promise that all 15 tools or embedded GUIs work in every client or subscription plan. A client must support the relevant MCP transport and permissions.

