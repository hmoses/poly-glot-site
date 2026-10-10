---
title: "Poly-Glot MCP Integrations for AI Clients"
canonical: "https://hmoses.github.io/poly-glot-site/mcp-integrations.html"
description: "What Poly-Glot MCP does, its tools, setup documentation and compatible client requirements."
product: "Poly-Glot AI Workspace"
---

# Poly-Glot MCP Integrations for AI Clients

What Poly-Glot MCP does, its tools, setup documentation and compatible client requirements.

## What is Poly-Glot MCP?

Poly-Glot provides a hosted Streamable HTTP Model Context Protocol server with tools for template discovery, prompt building, comparison preparation, BYOM, language and audio processing, and subscription status. Read-only discovery does not start a trial; Send and restricted tools use verified server-side entitlements.

## How many MCP tools are available?

The current MCP server code registers 15 tools: seven core tools, four BYOM tools, and four language and audio tools. Discovery depends on client support and permissions; some tool actions require an authenticated trial or Pro account.
**Complete 15-tool inventory**

- Core: `get_language_options`, `get_subscription_status`, `open_workspace`, `search_templates`, `get_template`, `build_prompt`, `prepare_compare`
- Custom models (BYOM): `get_custom_model_capabilities`, `validate_custom_model`, `run_custom_model`, `prepare_custom_compare`
- Language and media: `transcribe_audio`, `detect_language`, `translate_text`, `localize_text`

Canonical MCP tool documentation: https://hmoses.github.io/poly-glot-site/mcp-integrations.html


## Can any AI assistant connect to Poly-Glot MCP?

Not necessarily. A client must support the appropriate MCP transport and authentication or connection configuration. Consult the client-specific setup instructions.

## Where can I find the configuration instructions?

See the MCP setup section on the Poly-Glot homepage for the production endpoint and integration overview.

## How to connect Poly-Glot to Claude

For **Claude Pro or Max**, open **Customize → Connectors → + Add → Add custom connector**. Name the connector **Poly-Glot**, enter the production remote MCP URL `https://br-steep-leaf-ae2o29qz-mcp.compute.c-2.us-east-2.aws.neon.tech/mcp`, review authentication, and finish adding it. For Team or Enterprise workspaces, an authorized owner may need to add the connector under organization settings first. In a Claude conversation, select **+ → Connectors** and enable Poly-Glot.

**Official source:** https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp

## How to invoke Poly-Glot MCP tools in Claude

Claude can choose eligible connected MCP tools from a natural-language conversation. Mention the tool by name if you want a specific action, then review any approval prompts. Here are copyable examples:

1. **Read-only template discovery:** "Use Poly-Glot's search_templates tool to find LinkedIn templates for AI productivity."
2. **Prompt creation (Send action):** "Find an accessible LinkedIn template in Poly-Glot and use build_prompt to create a prompt about AI productivity. Ask for missing template values."
3. **Comparison preparation (Send action; active trial or Pro):** "Use Poly-Glot's prepare_compare tool to prepare this LinkedIn post prompt for ChatGPT, Claude, and Gemini."
4. **Subscription status (read-only):** "Use Poly-Glot's get_subscription_status tool to show what features my account can access."
5. **Open template browser (read-only):** "Use Poly-Glot's open_workspace tool to browse available templates."

**Important distinction:** `search_templates`, `get_template`, `get_language_options`, and `get_subscription_status` are read-only. `build_prompt` and `prepare_compare` are Send actions and require the applicable server-side account entitlement. `prepare_compare` returns a prepared prompt, provider destinations and usage instructions; it **does not** automatically call ChatGPT, Claude or Gemini, does **not** collect their responses, and does **not** guarantee that a graphical workspace opens. A separate `open_workspace` call opens the Poly-Glot template-browser resource where supported by the client, not live multi-model results.

**Illustrative result, not a live execution:** "Poly-Glot prepared your prompt for ChatGPT, Claude, and Gemini. To compare answers, follow each provider's instructions and submit the prompt through an available client workflow."

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
- **Claude / Claude Desktop:** On an individual Pro or Max plan, use **Customize → Connectors → + Add → Add custom connector** and the production remote MCP URL. In chat use **+ → Connectors** to enable Poly-Glot. Team and Enterprise connectors may first require an administrator to add the remote connector under organization settings. Do not place this remote endpoint in Claude Desktop's local stdio JSON configuration. Official guide: https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp
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

### Verified tool behavior and account requirements

- **Discovery is not a Send:** `get_language_options`, `search_templates`, `get_subscription_status`, and `get_custom_model_capabilities` are read-only. They do not start a trial or consume a free Send.
- **An MCP connection is not a Pro subscription:** Public tool discovery and browsing can work without a paid subscription; a verified account is required for persisted trial activation and restricted Send actions. Without verified authentication, the server does not silently activate a trial or grant Pro.
- **Comparison preparation is not model execution:** `prepare_compare` builds one canonical prompt and provider instructions. It does not automatically invoke ChatGPT, Claude, Gemini, or other built-in providers or collect their responses. Client UI support and any subsequent AI execution are separate.
- **Trial:** The app-managed three-day trial starts on the first eligible authenticated Send, and does not itself automatically become a paid Apple subscription. Once expired, the free allowance is one single-AI Send per rolling 24 hours, shared with free-template Sends.
- **Restricted features:** Pro template bodies, Compare Mode, BYOM endpoint validation and execution, and processing tools for translation, language detection, localization, and transcription require eligible trial or Pro access, as enforced server-side.
- **Bring Your Own Model:** HTTPS/public-network endpoints are supported. Secrets are transient input, not a persistent Poly-Glot model vault. Custom-model execution and transcription can send supplied text/audio to the configured processing provider; users must review provider privacy terms.
- **Client capabilities:** Tool discovery depends on remote Streamable HTTP support and configured client/workspace permissions. Not every client supports embedded MCP Apps interfaces or all tool behaviors.
- **Verified language set:** EN, ES, FR, DE, IT, PT, NL, RU, ZH, ZH_TW, JA, KO, AR, HI, BN, TR, PL, SV, NO, DA, FI, EL, HE, ID, MS, TH, VI, UK, CS, RO, HU, SK, HR, CA, AF, SW, HA, AM. Do not substitute Bulgarian, Lithuanian, Latvian, or Estonian for actually supported languages.
- **Authoritative repository:** https://github.com/hmoses/poly-glot-ai-workspace (especially `server.js`, `src/cross-platform-tools.js`, `entitlements.js`, `localization.js`). This public guide describes the code contract; use live server status and tool discovery when troubleshooting deployments.

### Source-of-truth notes

The production MCP endpoint and live server/tool catalog determine runtime behavior. Third-party MCP directories can cache stale listings. This guide does not promise that all 15 tools or embedded GUIs work in every client or subscription plan. A client must support the relevant MCP transport and permissions.

