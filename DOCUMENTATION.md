# Veloria UI — Documentation

> Version 0.1.6 · 2026-03-17
> by [JohnDev19](https://github.com/JohnDev19) · [ui-veloria.vercel.app](https://ui-veloria.vercel.app/)

---

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Setup](#setup)
4. [React Hook Form Adapter](#react-hook-form-adapter)
5. [CLI Reference](#cli-reference)
   - [init](#init)
   - [add](#add)
   - [list](#list)
   - [diff](#diff)
   - [upgrade](#upgrade)
6. [Component Categories](#component-categories)
7. [Theming & Design Tokens](#theming--design-tokens)
8. [Dark Mode](#dark-mode)
9. [Hooks Reference](#hooks-reference)
10. [TypeScript](#typescript)
11. [Accessibility](#accessibility)
12. [Framework Guides](#framework-guides)
13. [Contributing](#contributing)
14. [Changelog](#changelog)

---

## Overview

Veloria UI is a copy-paste React component library built for teams that want to own their UI code. It ships a CLI (`veloria-ui`) that copies component source files directly into your project — you edit them freely, no black-box abstraction. Components are built on Radix UI primitives, styled with Tailwind CSS design tokens, and fully typed with TypeScript.

**What makes Veloria UI different:**

- **You own the code.** `veloria-ui add button` copies source into `components/ui/button/index.tsx`. Git-track it, fork it, delete it.
- **`veloria-ui diff`** — the first component library with a native terminal diff against upstream. See exactly what changed in the library without leaving your terminal.
- **`veloria-ui upgrade`** — three-state staleness detection keeps your components in sync with upstream without clobbering your local edits.
- **`veloria-ui/rhf`** — a zero-boilerplate React Hook Form adapter sub-path. Drop-in `Controller` wrappers for every form component.
- **No runtime dependency on the library** after you've added a component. The copied file is self-contained.
- **102 components** across 10 categories, with Radix primitives, ARIA attributes, keyboard navigation, and full dark mode out of the box.

---

## Installation

```bash
# npm
npm install veloria-ui

# pnpm
pnpm add veloria-ui

# bun
bun add veloria-ui

# yarn
yarn add veloria-ui
```

**Peer dependencies** (install alongside veloria-ui):

```bash
npm install react react-dom
```

All Radix UI packages are optional peer dependencies — they are only needed for the specific components that use them and are installed automatically by `veloria-ui add`.

---

## Setup

### 1. Import the stylesheet

```tsx
// app/layout.tsx  (Next.js App Router)
import "veloria-ui/styles";
```

The stylesheet defines all CSS custom properties (design tokens) for both light and dark mode. It must be imported once at the root of your app.

### 2. Add the Tailwind plugin

```ts
// tailwind.config.ts
import { veloriaPlugin } from "veloria-ui/tailwind";

export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./node_modules/veloria-ui/dist/**/*.js",
  ],
  plugins: [veloriaPlugin],
};
```

The `veloriaPlugin` registers all Veloria design tokens as Tailwind utilities and adds component-specific variants.

### 3. Wrap your app with VeloriaProvider

```tsx
// app/layout.tsx
import { VeloriaProvider } from "veloria-ui/provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <VeloriaProvider>{children}</VeloriaProvider>
      </body>
    </html>
  );
}
```

`VeloriaProvider` sets up the theme context used by `useTheme()` and `ThemeSwitcher`. It reads and persists the user's theme preference to `localStorage` under the key `veloria-theme`.

### 4. (Optional) Run the init wizard

```bash
npx veloria-ui init
```

This writes a `veloria.config.json` at your project root and creates `lib/utils.ts` if missing.

---

## React Hook Form Adapter

Import from `veloria-ui/rhf` to get zero-boilerplate `Controller` wrappers for every Veloria UI form component. Requires `react-hook-form ^7.0.0` installed in your project (optional peer dependency — not required unless you use this sub-path).

```bash
npm install react-hook-form
```

### Available wrappers

| Wrapper | Wraps | Value type |
|---------|-------|------------|
| `RhfInput` | `Input` + `FormField` | `string` |
| `RhfTextArea` | `TextArea` + `FormField` | `string` |
| `RhfSelect` | Radix `Select` + `FormField` | `string` |
| `RhfCheckbox` | `Checkbox` + `FormField` | `boolean` |
| `RhfSwitch` | `Switch` + `FormField` | `boolean` |
| `RhfRadioGroup` | `RadioGroup` + `FormField` | `string` |
| `RhfSlider` | `Slider` + `FormField` | `number` |
| `RhfCombobox` | `Combobox` + `FormField` | `string` |
| `RhfMultiSelect` | `MultiSelect` + `FormField` | `string[]` |
| `RhfRatingInput` | `RatingInput` + `FormField` | `number` |
| `RhfOTPInput` | `OTPInput` + `FormField` | `string` |

### Usage

Each wrapper accepts `name` and `control` (from `useForm()`) plus all the original visual props of the underlying component unchanged.

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  RhfInput, RhfSelect, RhfCheckbox,
  RhfSlider, RhfTextArea, RhfRatingInput,
} from "veloria-ui/rhf";
import { Button } from "veloria-ui";

const schema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters"),
  role:    z.string().min(1, "Please select a role"),
  bio:     z.string().optional(),
  volume:  z.number().min(0).max(100),
  rating:  z.number().min(1, "Please leave a rating"),
  agree:   z.literal(true, { errorMap: () => ({ message: "You must agree" }) }),
});

type FormValues = z.infer<typeof schema>;

export function ProfileForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { volume: 50, rating: 0, agree: false },
  });

  return (
    <form onSubmit={handleSubmit(console.log)} className="flex flex-col gap-4">
      <RhfInput     name="name"   control={control} label="Full name" placeholder="Jane Smith" />
      <RhfSelect    name="role"   control={control} label="Role"
                    options={[{ value: "dev", label: "Developer" }, { value: "design", label: "Designer" }]} />
      <RhfTextArea  name="bio"    control={control} label="Bio" rows={4} />
      <RhfSlider    name="volume" control={control} label="Volume" min={0} max={100} showValue />
      <RhfRatingInput name="rating" control={control} label="Rate your experience" />
      <RhfCheckbox  name="agree"  control={control} label="I agree to the terms of service" />
      <Button type="submit">Save profile</Button>
    </form>
  );
}
```

### How it works

Each wrapper wraps the base Veloria component in a `react-hook-form` `Controller`. The `Controller` renders `field` and `fieldState` — the wrapper maps them to the component's props:

- `field.value` / `field.onChange` / `field.onBlur` / `field.ref` → forwarded to the component
- `fieldState.error` → mapped to `invalid={true}` on the component
- `fieldState.error.message` → rendered as `<FormError>` below the component
- Special cases: `RhfCheckbox` and `RhfSwitch` coerce `field.value` to a boolean `checked` prop. `RhfSlider` stores a plain `number` but converts to `number[]` for Radix Slider internally. `RhfSelect` uses `onValueChange` (Radix Select's API) instead of `onChange`.

---

## CLI Reference

### `init`

```bash
npx veloria-ui init [options]
```

Interactive setup wizard. Creates `veloria.config.json` and `lib/utils.ts`.

| Option | Description |
|--------|-------------|
| `--typescript` | Use TypeScript (default: `true`) |
| `--tailwind` | Configure Tailwind (default: `true`) |
| `--no-install` | Skip dependency install |
| `-y, --yes` | Skip all prompts, use defaults |

---

### `add`

```bash
npx veloria-ui add <component> [components...] [options]
```

Copies one or more components into your project. Registry dependencies are resolved and added automatically. Records the upstream hash in `veloria.lock.json`.

| Option | Description |
|--------|-------------|
| `-y, --yes` | Skip confirmation prompts |
| `--no-install` | Skip peer dep install |
| `-p, --path <dir>` | Override destination directory |
| `--force` | Overwrite existing local files |

```bash
npx veloria-ui add button
npx veloria-ui add card modal drawer toast
npx veloria-ui add select --path src/design-system
```

---

### `list`

```bash
npx veloria-ui list [options]
npx veloria-ui ls [options]
```

Lists all available components with their category and description.

| Option | Description |
|--------|-------------|
| `-c, --category <category>` | Filter by category name |

**Available categories:** `basic`, `layout`, `navigation`, `forms`, `advanced-forms`, `data-display`, `feedback`, `overlay`, `media`, `utility`.

```bash
npx veloria-ui list
npx veloria-ui list --category forms
```

---

### `diff`

```bash
npx veloria-ui diff <component> [options]
```

Compares your local copy of a component to the latest upstream source on GitHub using a Myers diff algorithm. Produces unified-style, colour-coded terminal output.

| Option | Description | Default |
|--------|-------------|---------|
| `--context <n>` | Lines of context around each hunk | `3` |
| `--json` | Machine-readable JSON output | — |

```bash
npx veloria-ui diff button
npx veloria-ui diff modal --context 6
npx veloria-ui diff input --json
```

**Terminal output example:**

```
  diff  button
  local     components/ui/button/index.tsx
  upstream  https://raw.githubusercontent.com/JohnDev19/Veloria-UI/main/…

  +3 additions    -1 deletion

    13  -    "inline-flex items-center justify-center rounded-md",
    14  +    "inline-flex items-center justify-center gap-2 rounded-md",
   ···
    31  +    loading: "opacity-70 cursor-wait",

  To update your local copy, run: npx veloria-ui upgrade button
```

---

### `upgrade`

```bash
npx veloria-ui upgrade [component] [options]
```

Checks installed components against upstream and upgrades those that have changed. Uses `veloria.lock.json` for three-state staleness detection.

| State | Meaning |
|-------|---------|
| `up-to-date` | Upstream hash matches install-time hash |
| `upstream-changed` | Upstream changed, local unmodified — safe to auto-upgrade |
| `diverged` | Both changed — warns before overwriting |
| `no-lock` | Pre-dates lock file; falls back to content comparison |

| Option | Description |
|--------|-------------|
| `[component]` | Upgrade a single named component |
| `-y, --yes` / `--all` | Upgrade all outdated non-interactively |
| `--check` | Dry-run — report status only, no changes |
| `--force` | Overwrite even diverged components |
| `--json` | Machine-readable JSON status report |

```bash
npx veloria-ui upgrade --check
npx veloria-ui upgrade
npx veloria-ui upgrade button
npx veloria-ui upgrade --all
npx veloria-ui upgrade --check --json
```

---

## Component Categories

### Basic (14 components)

| Component | Description |
|-----------|-------------|
| `button` | Solid, outline, ghost, link variants. Sizes xs–xl. Loading state. |
| `icon-button` | Square button for icon-only actions. |
| `badge` | Solid, soft, outline colour variants. |
| `avatar` | Image with fallback initials, size presets, status ring. |
| `avatar-group` | Overlapping avatar stack with overflow count. |
| `tag` | Dismissible label chip. |
| `chip` | Selectable pill. |
| `tooltip` | Radix Tooltip with delay and placement control. |
| `link` | Styled anchor with external indicator. |
| `divider` | Horizontal/vertical rule with optional label. |
| `kbd` | Styled `<kbd>` shortcut display. |
| `separator` | Semantic `<hr>` separator. |
| `statistic` | Large number with label and optional trend indicator. |
| `calendar` | Month calendar with date selection. |

### Layout (10 components)

| Component | Description |
|-----------|-------------|
| `container` | Max-width wrapper with responsive padding. |
| `stack` | Vertical/horizontal flex stack with gap. |
| `grid` | CSS grid with responsive column control. |
| `flex` | Flex container with shorthand props. |
| `section` | Semantic `<section>` with vertical spacing. |
| `spacer` | Flexible whitespace. |
| `aspect-ratio` | Radix aspect ratio wrapper. |
| `center` | Centers content horizontally and vertically. |
| `scroll-area` | Radix ScrollArea with custom scrollbar. |
| `masonry` | CSS column-based masonry layout. |

### Navigation (8 components)

| Component | Description |
|-----------|-------------|
| `navbar` | Top navigation bar with logo, links, actions. |
| `sidebar` | Collapsible side navigation. |
| `breadcrumb` | Accessible breadcrumb trail. |
| `pagination` | Page control with ellipsis. |
| `tabs` | Radix Tabs — underline and pill variants. |
| `dropdown-menu` | Radix DropdownMenu with all sub-primitives. |
| `navigation-menu` | Radix Navigation Menu for complex navbars. |
| `stepper` | Horizontal/vertical multi-step indicator. |

### Forms (14 components)

| Component | Description |
|-----------|-------------|
| `input` | Left/right icon slots, sizes, error state. |
| `textarea` | Multi-line input with resize control. |
| `select` | Full Radix Select — animated dropdown. |
| `checkbox` | With label, description, error state. |
| `radio-group` | Per-option labels and descriptions. |
| `switch` | Three sizes, label, description. |
| `slider` | Single-thumb range slider. |
| `range-slider` | Dual-thumb slider. |
| `date-picker` | Native date input wrapper. |
| `time-picker` | Native time input wrapper. |
| `date-range-picker` | Full custom two-calendar date range popover. |
| `number-input` | Stepper with −/+ buttons, clamping, keyboard. |
| `avatar-upload` | Avatar circle with hover overlay and file preview. |
| `form-field` | Label + input + error wrapper. |

### Advanced Forms (12 components)

| Component | Description |
|-----------|-------------|
| `file-upload` | Drag-and-drop zone with click-to-upload fallback. |
| `otp-input` | PIN/OTP with auto-advance and paste support. |
| `color-picker` | Swatches + hex input. |
| `search-input` | Search with loading state and clear button. |
| `password-input` | Password with show/hide toggle. |
| `combobox` | Searchable single-value select. |
| `multi-select` | Multiple selection with tag removal. |
| `phone-input` | International dial-code selector. |
| `tag-input` | Type and press Enter to add tags. |
| `currency-input` | Locale-aware currency symbol. |
| `rating-input` | Star rating with hover and clear. |
| `rich-text-editor` | Tiptap-based editor with full toolbar. |
| `multi-step-form` | Compound multi-step form with per-step validation. |

### Data Display (17 components)

| Component | Description |
|-----------|-------------|
| `card` | Surface with header, content, footer. |
| `table` / `data-table` | Sortable, paginated, selectable table. |
| `data-grid` | Virtualised spreadsheet-grade grid — 100k rows, resizable columns, editable cells. |
| `list` | Ordered/unordered with item slots. |
| `timeline` | Vertical event timeline. |
| `stats-card` | Metric with icon and trend indicator. |
| `tree-view` | Nested expandable tree, keyboard nav. |
| `json-viewer` | Collapsible syntax-highlighted JSON tree. |
| `heatmap` | GitHub-style activity grid. |
| `kanban-board` | Drag-and-drop column board. |
| `sparkline-chart` | Zero-dep SVG inline trend line. |
| `radial-progress-chart` | Multi-segment animated SVG donut. |
| `gauge-chart` | Half-circle animated needle gauge. |
| `aurora-card` | Mouse-parallax aurora gradient card. |
| `typewriter-text` | Animated cycling strings with cursor. |
| `file-card` | File attachment surface with type badge. |
| `pricing-card` | Pricing tier with features and CTA. |

### Feedback (10 components)

| Component | Description |
|-----------|-------------|
| `alert` | Info/success/warning/danger with dismiss. |
| `toast` | Radix Toast with all sub-primitives. |
| `snackbar` | Positioned message with action. |
| `progress` | Linear bar with colour variants. |
| `circular-progress` | SVG ring with indeterminate mode. |
| `skeleton` | Pulse placeholder for text, rect, circle. |
| `loading-spinner` | Accessible SVG spinner. |
| `empty-state` | Icon + title + description + action. |
| `status-indicator` | Online/offline/busy/away dot with pulse. |
| `banner-alert` | Full-width top-of-page announcement strip. |

### Overlay (8 components)

| Component | Description |
|-----------|-------------|
| `modal` | Radix Dialog with header, body, footer. |
| `drawer` | Slide-in sheet from any edge. |
| `command-dialog` | ⌘K command palette built on cmdk. |
| `command-bar` | Persistent Linear-style command bar. |
| `popover` | Radix Popover with arrow. |
| `context-menu` | Radix Context Menu. |
| `alert-dialog` | Confirmation dialog. |
| `lightbox` | Image lightbox with zoom. |

---

## Theming & Design Tokens

All tokens are CSS custom properties defined in `veloria.css` and consumed via Tailwind classes.

| Token | Tailwind class | Usage |
|-------|---------------|-------|
| `--background` | `bg-background` | Page background |
| `--foreground` | `text-foreground` | Primary text |
| `--primary` | `bg-primary` / `text-primary` | Brand colour |
| `--secondary` | `bg-secondary` | Secondary surfaces |
| `--muted` | `bg-muted` / `text-muted-foreground` | Subdued content |
| `--accent` | `bg-accent` | Hover states |
| `--destructive` | `bg-destructive` / `text-destructive` | Error / danger |
| `--border` | `border-border` | Default border |
| `--input` | `border-input` | Input borders |
| `--ring` | `ring-ring` | Focus rings |

Override any token in your global CSS:

```css
:root {
  --primary: 221 83% 53%;       /* blue */
  --primary-foreground: 0 0% 100%;
}

.dark {
  --primary: 213 94% 68%;
}
```

---

## Dark Mode

Uses Tailwind's `class` strategy — add the `dark` class to `<html>` and every component flips automatically.

```tsx
import { useTheme, ThemeSwitcher } from "veloria-ui";

export function Header() {
  const { theme, setTheme } = useTheme();
  return (
    <header className="flex items-center justify-between p-4">
      <span>My App</span>
      <ThemeSwitcher value={theme} onChange={setTheme} variant="toggle" />
    </header>
  );
}
```

`ThemeSwitcher` variants: `"icon"` (sun/moon icon), `"toggle"` (animated pill), `"select"` (dropdown).

---

## Hooks Reference

| Hook | Returns | Description |
|------|---------|-------------|
| `useTheme()` | `{ theme, setTheme }` | Current theme and setter. Persists to localStorage. |
| `useMediaQuery(query)` | `boolean` | Reactive media query, SSR-safe. |
| `useClickOutside(ref, cb)` | `void` | Fires callback when clicking outside ref. |
| `useDebounce(value, ms)` | `T` | Debounced value. |
| `useLocalStorage(key, init)` | `[T, setter]` | Persistent state with localStorage. |
| `useCopyToClipboard()` | `{ copy, copied }` | Copy to clipboard with a timed `copied` flag. |
| `useForm(init, validate?)` | `{ values, errors, touched, … }` | Form state, validation, touched tracking. |
| `usePagination(opts)` | `{ page, pages, from, to, … }` | Pagination logic decoupled from UI. |
| `useIntersection(ref, opts)` | `boolean` | IntersectionObserver wrapper, optional `once`. |
| `useWindowSize()` | `{ width, height }` | Reactive window dimensions, SSR-safe. |
| `useStep(max)` | `{ step, next, prev, isFirst, isLast, … }` | Multi-step wizard state. |
| `useCountdown(seconds)` | `{ count, start, pause, reset }` | Countdown timer. |

---

## TypeScript

All components are fully typed. Base types exported from `veloria-ui`:

```ts
import type { VeloriaBaseProps, VeloriaAriaProps } from "veloria-ui";
```

Component-specific prop types are co-exported:

```ts
import { Button } from "veloria-ui";
import type { ButtonProps } from "veloria-ui";
```

RHF wrapper prop types are exported from `veloria-ui/rhf`:

```ts
import type { RhfInputProps, RhfSelectProps } from "veloria-ui/rhf";
```

---

## Accessibility

Every interactive component follows WCAG 2.1 AA. Key commitments:

- All interactive elements have `aria-label` or visible text labels.
- Keyboard navigation works across all components (Tab, Enter, Space, Arrow keys, Escape).
- Focus trapping in Modal, Drawer, Dialog via Radix primitives.
- `aria-live` regions on dynamic content (toasts, alerts, typewriter text).
- `role` attributes on all non-semantic interactive surfaces.
- Tested with VoiceOver (macOS) and NVDA (Windows).

To report an accessibility issue: open a GitHub issue with the `a11y` label.

---

## Framework Guides

### Next.js App Router

```tsx
// app/layout.tsx
import "veloria-ui/styles";
import { VeloriaProvider } from "veloria-ui/provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <VeloriaProvider>{children}</VeloriaProvider>
      </body>
    </html>
  );
}
```

Add `suppressHydrationWarning` to `<html>` — `VeloriaProvider` adds the `dark` class on mount which can cause a hydration mismatch without it.

### Vite + React

```tsx
// src/main.tsx
import "veloria-ui/styles";
import { VeloriaProvider } from "veloria-ui/provider";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <VeloriaProvider>
    <App />
  </VeloriaProvider>
);
```

### Remix

```tsx
// app/root.tsx
import veloriaStyles from "veloria-ui/styles?url";
import { VeloriaProvider } from "veloria-ui/provider";

export const links = () => [{ rel: "stylesheet", href: veloriaStyles }];

export default function App() {
  return (
    <html lang="en">
      <head><Meta /><Links /></head>
      <body>
        <VeloriaProvider><Outlet /></VeloriaProvider>
        <ScrollRestoration /><Scripts />
      </body>
    </html>
  );
}
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

Quick start:

```bash
git clone https://github.com/JohnDev19/Veloria-UI.git
cd Veloria-UI
npm install
npm run build
```

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full version history.

---

<div align="center">
  <sub>Veloria UI · MIT License · by JohnDev19</sub>
</div>