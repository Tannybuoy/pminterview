# Claude.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

You are an engineer for a website to help product managers prepare for AI PM interviews. This means interviewing for top AI companies or for PM roles at any company working on AI products. The site features a question practice page with timer functionality and an AI resources page with curated learning materials and company links.

## Development Guidelines

- Limit comments inside the code

- Test all changes before marking complete

- Prefer to run single tests and not the whole suite for performance reasons

- Keep animations simple and working

## Important Notes

**Credentials & API Keys:**

Any time there are credentials, API keys, etc make sure to store them in a `.env` file

**Windows Compatibility:**

Make sure all commands work within Windows terminal; this is being developed locally on Windows

## Project Memory Folder

The Project Memory folder is key to understanding the project and allows you to continue effectively.

**Core Files:**

- `product-spec.md` - All core requirements and goals

- `technical-spec.md` - Key technical design decisions and system patterns to stay consistent

- `progress.md` - Current work focus, recent changes, what's left to build, current status and known issues

**Project Memory Updates occur when:**

- Discovering new project patterns

- After implementing significant changes

- When user requests with "update proj memory" (MUST review all files)

**Note:** When triggered by "update proj memory", review every memory bank file, even if some don't require updates. The project memory must be maintained with precision and clarity as effectiveness in building the project depends on it.
