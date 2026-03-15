<div align="center">

<br/>

```
╔═╗╔╦╗╦  ╔═╗╔═╗╦ ╦╦
╠═╣ ║ ║  ╠═╣╚═╗║ ║║
╩ ╩ ╩ ╩═╝╩ ╩╚═╝╚═╝╩
```

### **Build anything. Ship faster.**

A modern, accessible, composable component library for React.
90+ production-ready components. Works with Tailwind CSS and Next.js.

[![npm version](https://img.shields.io/npm/v/@atlasui/core?color=0ea5e9&label=@atlasui/core)](https://www.npmjs.com/package/@atlasui/core)
[![npm version](https://img.shields.io/npm/v/@atlasui/cli?color=0ea5e9&label=@atlasui/cli)](https://www.npmjs.com/package/@atlasui/cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6)](https://www.typescriptlang.org)

</div>

---

## Why AtlasUI?

AtlasUI is built on modern, accessible UI primitives and follows the same composable design philosophy used by popular component systems like shadcn/ui — but goes further:

| Feature | AtlasUI | shadcn/ui |
|---------|---------|-----------|
| Component count | **90+** | ~45 |
| CLI (copy-to-project) | ✅ | ✅ |
| Composable primitives | ✅ | ✅ |
| Dark mode | ✅ | ✅ |
| ARIA / Accessibility | ✅ | ✅ |
| Media components | ✅ | ❌ |
| AudioPlayer / VideoPlayer | ✅ | ❌ |
| OTP Input | ✅ | ❌ |
| ResizablePanel | ✅ | Partial |
| DragDropArea | ✅ | ❌ |
| Carousel | ✅ | ❌ |
| Custom hooks | ✅ | ❌ |
| Tailwind plugin/preset | ✅ | Partial |

---

## Quick Start

### Option 1 — CLI (Recommended, shadcn-style)

```bash
# Initialize AtlasUI in your project
npx @atlasui/cli init

# Add individual components
npx @atlasui/cli add button
npx @atlasui/cli add card modal drawer toast

# List all available components
npx @atlasui/cli list
```

Components are **copied into your project**. You own them. Edit freely.

### Option 2 — Package Install

```bash
npm install @atlasui/core
# or
pnpm add @atlasui/core
# or
bun add @atlasui/core
```

---

## Setup

### 1. Import styles

```tsx
// app/layout.tsx (Next.js App Router)
import "@atlasui/core/styles";
```

### 2. Add Tailwind plugin

```ts
// tailwind.config.ts
import { atlasPlugin } from "@atlasui/core/tailwind";

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  plugins: [atlasPlugin],
};
```

### 3. Use components

```tsx
import { Button, Card, Modal, Toast } from "@atlasui/core";

export default function App() {
  return (
    <Card>
      <Button variant="solid" size="lg">
        Get started
      </Button>
    </Card>
  );
}
```

---

## Components (90)

### Basic (10)
`Button` `IconButton` `Link` `Badge` `Avatar` `AvatarGroup` `Divider` `Tag` `Chip` `Tooltip`

### Layout (10)
`Container` `Stack` `Grid` `Flex` `Section` `Spacer` `AspectRatio` `Center` `ScrollArea` `Masonry`

### Navigation (10)
`Navbar` `Sidebar` `Menu` `DropdownMenu` `Breadcrumb` `Pagination` `Tabs` `CommandPalette` `NavigationMenu` `Stepper`

### Forms (10)
`Input` `TextArea` `Select` `Checkbox` `RadioGroup` `Switch` `Slider` `RangeSlider` `DatePicker` `TimePicker`

### Advanced Forms (10)
`FileUpload` `OTPInput` `ColorPicker` `SearchInput` `PasswordInput` `Combobox` `MultiSelect` `FormField` `FormLabel` `FormError`

### Data Display (10)
`Card` `Table` `DataTable` `List` `ListItem` `Statistic` `Timeline` `Calendar` `Chart` `CodeBlock`

### Feedback (10)
`Alert` `Toast` `Snackbar` `Progress` `CircularProgress` `Skeleton` `LoadingSpinner` `EmptyState` `StatusIndicator` `Notification`

### Overlay (10)
`Modal` `Dialog` `Drawer` `Popover` `HoverCard` `ContextMenu` `CommandDialog` `Sheet` `Lightbox` `ImageViewer`

### Media (5)
`Image` `VideoPlayer` `AudioPlayer` `Carousel` `Gallery`

### Utility (5)
`ThemeSwitcher` `CopyButton` `KeyboardShortcut` `ResizablePanel` `DragDropArea`

---

## Hooks

AtlasUI includes a suite of utility hooks:

```tsx
import {
  useDisclosure,    // open/close state management
  useMediaQuery,    // responsive media queries
  useBreakpoint,    // Tailwind breakpoint detection
  useClipboard,     // clipboard copy with feedback
  useLocalStorage,  // persistent state
  useTheme,         // light/dark/system theme
  useDebounce,      // debounced values
  useOnClickOutside,// detect outside clicks
  useKeydown,       // keyboard shortcut handler
  useMounted,       // SSR-safe mounting check
} from "@atlasui/core";
```

---

## Theming

AtlasUI uses CSS custom properties for theming. Override in your CSS:

```css
:root {
  --primary: 262 83% 58%;           /* purple brand */
  --primary-foreground: 0 0% 100%;
  --radius: 0.75rem;                 /* rounder corners */
}
```

All tokens are available: `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--success`, `--warning`, `--info`, `--border`, `--input`, `--ring`, `--radius`.

---

## Dark Mode

AtlasUI uses the `class` strategy (recommended for Next.js):

```tsx
import { useTheme, ThemeSwitcher } from "@atlasui/core";

function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <ThemeSwitcher
      value={theme}
      onChange={setTheme}
      variant="toggle"
    />
  );
}
```

Or apply manually by toggling `dark` on `<html>`:

```ts
document.documentElement.classList.add("dark");
```

---

## CLI Reference

```bash
# Initialize
npx @atlasui/cli init [--yes] [--no-install]

# Add components
npx @atlasui/cli add <component> [components...]
npx @atlasui/cli add button card modal --dir src/components/ui

# List components
npx @atlasui/cli list
npx @atlasui/cli list --category forms

# Diff local vs latest
npx @atlasui/cli diff button
```

---

## Package Structure

```
atlasui/
├── packages/
│   └── core/                  @atlasui/core
│       ├── src/
│       │   ├── components/
│       │   │   ├── basic/
│       │   │   ├── layout/
│       │   │   ├── navigation/
│       │   │   ├── forms/
│       │   │   ├── advanced-forms/
│       │   │   ├── data-display/
│       │   │   ├── feedback/
│       │   │   ├── overlay/
│       │   │   ├── media/
│       │   │   └── utility/
│       │   ├── hooks/
│       │   ├── utils/
│       │   ├── types/
│       │   └── styles/
│       └── dist/
└── cli/                       @atlasui/cli
    └── src/
        └── commands/
```

---

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting PRs.

---

## License

MIT © AtlasUI Contributors

---

<div align="center">
  <sub>Built with ❤️ using modern UI primitives.
  
  — Atlas (JohnDev19)</sub>
</div>
