import chalk from "chalk";
import { REGISTRY, CATEGORIES, type Category } from "../registry";

interface ListOptions {
  category?: string;
}

export async function list(options: ListOptions = {}) {
  const filterCat = options.category?.toLowerCase() as Category | undefined;

  console.log(chalk.bold.blue("\n  AtlasUI Components\n"));

  const cats = filterCat ? [filterCat] : CATEGORIES;

  for (const cat of cats) {
    const components = REGISTRY.filter((c) => c.category === cat);
    if (components.length === 0) continue;

    const label = cat.replace("-", " ").replace(/^\w/, (c) => c.toUpperCase());
    console.log(chalk.bold(`  ${label} (${components.length})`));

    for (const comp of components) {
      console.log(
        `    ${chalk.cyan(comp.name.padEnd(22))} ${chalk.dim(comp.description)}`
      );
    }
    console.log();
  }

  console.log(
    chalk.dim(`  Total: ${REGISTRY.length} components\n`) +
    chalk.dim(`  Add one: ${chalk.cyan("npx atlasui add <name>")}\n`)
  );
}

// ─── Diff Command ─────────────────────────────────────────────────────────

export async function diff(component?: string) {
  if (!component) {
    console.log(chalk.dim("\n  Usage: npx atlasui diff <component>\n"));
    console.log(chalk.dim("  Example: npx atlasui diff button\n"));
    return;
  }

  console.log(
    chalk.bold.blue(`\n  Diff: ${component}\n`) +
    chalk.dim("  Comparing local file with latest AtlasUI version...\n")
  );

  // In a real implementation, this would fetch the latest source from
  // https://atlasui.dev/registry/<component>.tsx and run a diff.
  console.log(chalk.yellow("  ⚠ diff requires network access to the AtlasUI registry."));
  console.log(chalk.dim("  Visit https://atlasui.dev/components/" + component + " to see the latest source.\n"));
}
