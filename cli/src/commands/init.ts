import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import ora from "ora";
import prompts from "prompts";
import { execa } from "execa";

interface InitOptions {
  typescript?: boolean;
  tailwind?: boolean;
  install?: boolean;
  yes?: boolean;
}

export async function init(options: InitOptions = {}) {
  console.log(
    chalk.bold.blue("\n  AtlasUI Init\n") +
    chalk.dim("  Setting up AtlasUI in your project...\n")
  );

  const cwd = process.cwd();

  // ─── Detect project ───────────────────────────────────────────────────────

  const pkgPath = path.join(cwd, "package.json");
  if (!fs.existsSync(pkgPath)) {
    console.error(chalk.red("\n  Error: No package.json found. Run this from your project root.\n"));
    process.exit(1);
  }

  const pkg = fs.readJsonSync(pkgPath) as Record<string, unknown>;
  const isNext = !!(
    (pkg.dependencies as Record<string, string> | undefined)?.next ||
    (pkg.devDependencies as Record<string, string> | undefined)?.next
  );

  // ─── Prompts ──────────────────────────────────────────────────────────────

  const answers = options.yes
    ? {
        componentsDir: "components/ui",
        cssPath: isNext ? "app/globals.css" : "src/index.css",
        tailwind: options.tailwind ?? true,
        packageManager: detectPackageManager(cwd),
      }
    : await prompts([
        {
          type: "text",
          name: "componentsDir",
          message: "Where should components be installed?",
          initial: "components/ui",
        },
        {
          type: "text",
          name: "cssPath",
          message: "Where is your global CSS file?",
          initial: isNext ? "app/globals.css" : "src/index.css",
        },
        {
          type: "confirm",
          name: "tailwind",
          message: "Configure Tailwind CSS?",
          initial: true,
        },
        {
          type: "select",
          name: "packageManager",
          message: "Which package manager do you use?",
          choices: [
            { title: "npm", value: "npm" },
            { title: "pnpm", value: "pnpm" },
            { title: "yarn", value: "yarn" },
            { title: "bun", value: "bun" },
          ],
          initial: 0,
        },
      ]);

  if (!answers.componentsDir) return;

  // ─── Create atlas.config.json ─────────────────────────────────────────────

  const configPath = path.join(cwd, "atlas.config.json");
  const config = {
    $schema: "https://atlasui.dev/schema.json",
    style: "default",
    typescript: options.typescript ?? true,
    tailwind: {
      config: "tailwind.config.ts",
      css: answers.cssPath,
      baseColor: "slate",
      cssVariables: true,
    },
    aliases: {
      components: `@/${answers.componentsDir}`,
      utils: "@/lib/utils",
    },
  };

  const configSpinner = ora("Creating atlas.config.json").start();
  fs.writeJsonSync(configPath, config, { spaces: 2 });
  configSpinner.succeed(chalk.green("Created atlas.config.json"));

  // ─── Create utils/cn.ts ───────────────────────────────────────────────────

  const utilsDir = path.join(cwd, "lib");
  await fs.ensureDir(utilsDir);
  const cnPath = path.join(utilsDir, "utils.ts");

  if (!fs.existsSync(cnPath)) {
    const cnSpinner = ora("Creating lib/utils.ts").start();
    await fs.writeFile(
      cnPath,
      `import { type ClassValue, clsx } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n`
    );
    cnSpinner.succeed(chalk.green("Created lib/utils.ts"));
  }

  // ─── Install core dependencies ────────────────────────────────────────────

  if (options.install !== false) {
    const pm = answers.packageManager as string;
    const installSpinner = ora(`Installing dependencies with ${pm}...`).start();
    try {
      const coreDeps = [
        "clsx",
        "tailwind-merge",
        "class-variance-authority",
        "@radix-ui/react-slot",
      ];
      const installCmd = pm === "npm" ? ["npm", "install", ...coreDeps] :
                         pm === "pnpm" ? ["pnpm", "add", ...coreDeps] :
                         pm === "bun" ? ["bun", "add", ...coreDeps] :
                         ["yarn", "add", ...coreDeps];
      await execa(installCmd[0], installCmd.slice(1), { cwd });
      installSpinner.succeed(chalk.green("Dependencies installed"));
    } catch {
      installSpinner.fail(chalk.yellow("Failed to install dependencies automatically"));
      console.log(chalk.dim("  Run manually: npm install clsx tailwind-merge class-variance-authority @radix-ui/react-slot\n"));
    }
  }

  // ─── Update tailwind config ───────────────────────────────────────────────

  if (answers.tailwind) {
    const twConfigPath = path.join(cwd, "tailwind.config.ts");
    if (fs.existsSync(twConfigPath)) {
      const twSpinner = ora("Updating tailwind.config.ts with AtlasUI preset").start();
      let twConfig = fs.readFileSync(twConfigPath, "utf-8");
      if (!twConfig.includes("atlasui")) {
        twConfig = `import { atlasPreset } from "@atlasui/core/tailwind";\n` + twConfig;
        twConfig = twConfig.replace("presets: [", "presets: [atlasPreset, ");
        if (!twConfig.includes("presets:")) {
          twConfig = twConfig.replace(
            "module.exports = {",
            'module.exports = {\n  presets: [atlasPreset],'
          );
        }
        fs.writeFileSync(twConfigPath, twConfig);
        twSpinner.succeed(chalk.green("Updated tailwind.config.ts"));
      } else {
        twSpinner.info(chalk.dim("tailwind.config.ts already configured"));
      }
    }
  }

  // ─── Done ─────────────────────────────────────────────────────────────────

  console.log(`
${chalk.bold.green("  ✓ AtlasUI initialized!")}

  ${chalk.dim("Next steps:")}
  ${chalk.cyan("1.")} Add components:    ${chalk.bold("npx atlasui add button card modal")}
  ${chalk.cyan("2.")} Browse components: ${chalk.bold("npx atlasui list")}
  ${chalk.cyan("3.")} Docs:              ${chalk.bold("https://atlasui.dev")}
`);
}

function detectPackageManager(cwd: string): string {
  if (fs.existsSync(path.join(cwd, "bun.lockb"))) return "bun";
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}
