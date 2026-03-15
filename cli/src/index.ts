#!/usr/bin/env node

/**
 * AtlasUI CLI
 * Build anything. Ship faster.
 * JohnDev19
 *
 * Usage:
 *   npx @atlasui/cli add button
 *   npx @atlasui/cli add button card modal
 *   npx @atlasui/cli init
 *   npx @atlasui/cli list
 */

import { Command } from "commander";
import chalk from "chalk";
import { add } from "./commands/add";
import { init } from "./commands/init";
import { list } from "./commands/list";
import { diff } from "./commands/diff";

const program = new Command();

// ─── Atlas ASCII Banner ────────────────────────────────────────────────────

const banner = `
${chalk.bold.blue("  ╔═╗╔╦╗╦  ╔═╗╔═╗╦ ╦╦")}
${chalk.bold.blue("  ╠═╣ ║ ║  ╠═╣╚═╗║ ║║")}
${chalk.bold.blue("  ╩ ╩ ╩ ╩═╝╩ ╩╚═╝╚═╝╩")}
  ${chalk.dim("Build anything. Ship faster.")}
`;

// ─── CLI Setup ─────────────────────────────────────────────────────────────

program
  .name("atlasui")
  .description("AtlasUI component library CLI")
  .version("0.1.0", "-v, --version", "Output the current version")
  .addHelpText("before", banner);

// ─── Commands ─────────────────────────────────────────────────────────────

program
  .command("init")
  .description("Initialize AtlasUI in your project")
  .option("--typescript", "Use TypeScript (default: true)", true)
  .option("--tailwind", "Configure Tailwind CSS integration", true)
  .option("--no-install", "Skip installing dependencies")
  .option("-y, --yes", "Skip prompts, use defaults")
  .action(init);

program
  .command("add [components...]")
  .alias("a")
  .description("Add one or more components to your project")
  .option(
    "-d, --dir <path>",
    "Destination directory for components",
    "components/ui"
  )
  .option("--overwrite", "Overwrite existing files")
  .option("--no-install", "Skip installing dependencies")
  .action(add);

program
  .command("list")
  .alias("ls")
  .description("List all available components")
  .option("-c, --category <category>", "Filter by category")
  .action(list);

program
  .command("diff [component]")
  .description("Show diff between local and latest component version")
  .action(diff);

// ─── Error Handling ────────────────────────────────────────────────────────

program.on("command:*", (operands) => {
  console.error(
    chalk.red(`\n  Error: Unknown command '${operands[0]}'\n`)
  );
  program.help();
  process.exit(1);
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  console.log(banner);
  program.help();
}
