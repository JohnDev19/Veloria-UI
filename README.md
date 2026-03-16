# Veloria UI

**Build anything. Ship faster.**

Accessible, composable React components with Tailwind CSS and dark mode.

by [JohnDev19](https://github.com/JohnDev19) · [ui-veloria.vercel.app](https://ui-veloria.vercel.app/) · [GitHub](https://github.com/JohnDev19/Veloria-UI)

---

## Installation

```bash
npm install veloria-ui
```

---

## Quick Start

### 1. Import styles

```css
/* app/globals.css or src/index.css */
@import "veloria-ui/styles";
```

### 2. Configure Tailwind

```ts
// tailwind.config.ts
import { veloriaPreset } from "veloria-ui/tailwind";

export default {
  presets: [veloriaPreset],
  content: ["./src/**/*.{ts,tsx}"],
};
```

### 3. Wrap your app

```tsx
// app/layout.tsx (Next.js App Router)
import { VeloriaProvider } from "veloria-ui/provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <VeloriaProvider>{children}</VeloriaProvider>
      </body>
    </html>
  );
}
```

### 4. Use components

```tsx
import { Button, Card, Badge } from "veloria-ui";

export default function Page() {
  return (
    <Card>
      <Badge variant="success">New</Badge>
      <Button variant="solid">Get Started</Button>
    </Card>
  );
}
```

---

## CLI

Copy components directly into your project (shadcn/ui-style):

```bash
npx veloria-ui init
npx veloria-ui add button card modal
npx veloria-ui list
npx veloria-ui list --category forms
```

---

## Design Tokens

Override them in your global CSS:

```css
:root {
  /* swap in your brand color */
  --primary: 262 83% 58%;
  --primary-foreground: 0 0% 100%;

  /* rounder corners */
  --radius: 0.75rem;
}
```

Full token list: `--background` `--foreground` `--primary` `--secondary` `--muted` `--accent` `--destructive` `--success` `--warning` `--info` `--border` `--input` `--ring` `--radius`.

---

## Dark Mode

Uses the `class` strategy — add `dark` to `<html>` and everything flips automatically.

```tsx
import { useTheme, ThemeSwitcher } from "veloria-ui";

function Header() {
  const { theme, setTheme } = useTheme();
  return <ThemeSwitcher value={theme} onChange={setTheme} variant="toggle" />;
}
```

---

## Package Structure

```
veloria-ui/
├── src/
│   ├── components/
│   │   ├── basic/           Button, IconButton, Badge, Avatar, Tooltip…
│   │   ├── layout/          Container, Stack, Grid, ScrollArea, Masonry…
│   │   ├── navigation/      Navbar, Tabs, DropdownMenu, Stepper…
│   │   ├── forms/           Input, Select, Checkbox, Slider, Switch…
│   │   ├── advanced-forms/  OTPInput, ColorPicker, Combobox, MultiSelect…
│   │   ├── data-display/    Card, DataTable, Timeline, Calendar, CodeBlock…
│   │   ├── feedback/        Alert, Toast, Skeleton, EmptyState, Progress…
│   │   ├── overlay/         Modal, Drawer, CommandDialog, Lightbox…
│   │   ├── media/           VideoPlayer, AudioPlayer, Carousel, Gallery…
│   │   └── utility/         ThemeSwitcher, CopyButton, ResizablePanel…
│   ├── hooks/               utility hooks
│   ├── styles/              veloria.css — full design token system
│   ├── types/               shared TypeScript types
│   ├── utils/               cn() and helpers
│   ├── cli/                 veloria-ui CLI (add, init, list, diff)
│   ├── provider.tsx         VeloriaProvider for Next.js
│   └── tailwind.ts          veloriaPlugin + veloriaPreset
├── package.json
├── tsup.config.ts
└── tsconfig.json
```

---

## Contributing

Issues and PRs welcome.
→ [github.com/JohnDev19/Veloria-UI/issues](https://github.com/JohnDev19/Veloria-UI/issues)

---

## License

MIT © [JohnDev19](https://github.com/JohnDev19)

---

<div align="center">
  <sub>Built by JohnDev19</sub>
</div>