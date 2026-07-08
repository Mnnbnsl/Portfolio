---
title: "Building Mockingjay Claw from Scratch"
date: "2026-07-08"
description: "How I engineered a local AI coding agent using Bun and TypeScript to handle file modifications and searches directly from the command line."
readingTime: "5 min read"
draft: true
---

As developers, we spend a massive chunk of our time navigating file systems, editing lines, and querying documents. To streamline my workflow, I decided to build **Mockingjay Claw**—a lightweight, command-line AI coding agent that runs locally, reads files, performs ripgrep searches, and applies code changes directly from the terminal.

Here is a breakdown of how the project is structured and what I learned building it.

## Why TypeScript and Bun?

When building local terminal CLI tools, speed is paramount. I chose **Bun** as the runtime for several reasons:
- **Zero Configuration**: Out-of-the-box TypeScript support.
- **Speed**: Bun's startup time is significantly faster than Node.js.
- **Modern APIs**: Built-in file I/O operations that are clean and synchronous.

## Tool Architecture

Mockingjay Claw operates on a simple feedback loop:
1. **Agent State**: Receives user prompt.
2. **Execution**: Evaluates the prompt and invokes one of the system-registered tools:
   - `read_file`
   - `write_file`
   - `grep_search` (built on top of `ripgrep`)
3. **Loop**: Parses the LLM's structured tool output, runs the task, feeds back the stdout/stderr, and requests the next instruction.

```typescript
// Sample handler for grep search tool
import { execSync } from "child_process";

export function executeGrep(query: string, searchPath: string) {
  try {
    const rawResult = execSync(`rg --json "${query}" "${searchPath}"`, { encoding: "utf8" });
    return JSON.parse(rawResult);
  } catch (error) {
    return { error: "No matches found or ripgrep not installed" };
  }
}
```

## Designing the Prompt Loop

Steering the model requires a rigid system prompt. By using XML tag blocks, we force the AI to return structured outputs, which we parse safely on the client side:

```xml
<tool_call>
  <name>grep_search</name>
  <arguments>
    <query>export default function</query>
    <searchPath>./src</searchPath>
  </arguments>
</tool_call>
```

This simple setup removes the overhead of complex frameworks like LangChain, creating a fast, deterministic CLI environment.
