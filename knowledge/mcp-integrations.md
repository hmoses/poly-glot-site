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
