# Changelog

All notable changes to Veloria UI are documented here.  
Project by [JohnDev19](https://github.com/JohnDev19) · [GitHub](https://github.com/JohnDev19/Veloria-UI) · [ui-veloria.vercel.app](https://ui-veloria.vercel.app/)

This project follows [Semantic Versioning](https://semver.org).

---

## [0.1.3] — 2026-03-16 (Edited)

### Rebranding — Atlas → Veloria UI

Complete removal of all remaining `atlas` legacy naming throughout the codebase.

- Renamed `AtlasProvider` → `VeloriaProvider` and `AtlasProviderProps` → `VeloriaProviderProps` in `src/provider.tsx`
- Renamed `atlasPlugin` → `veloriaPlugin` and `atlasPreset` → `veloriaPreset` in `src/tailwind.ts` and all export references
- Renamed `AtlasBaseProps` → `VeloriaBaseProps` and `AtlasAriaProps` → `VeloriaAriaProps` in `src/types/index.ts`
- Renamed `AtlasTheme` → `VeloriaTheme` in `src/hooks/index.ts`
- Renamed `atlas.css` → `veloria.css`; replaced all `atlas-*` keyframe and utility class names (`atlas-spin`, `atlas-fade-in`, `atlas-scrollbar`, etc.) with `veloria-*` equivalents
- Updated localStorage key `"atlas-theme"` → `"veloria-theme"` in `useTheme` and `use-theme.ts`
- Replaced `atlas.config.json` with `veloria.config.json` in the CLI init flow
- Updated `useToast` error message to reference `<VeloriaProvider>` instead of `<AtlasProvider>`
- Removed legacy `"atlas"` bin alias from `package.json`
- Updated `./styles` export path from `dist/styles/atlas.css` → `dist/styles/veloria.css`
- Updated homepage URL to `https://ui-veloria.vercel.app/` across `package.json`, `README.md`, CLI, and hook docs
- Removed hardcoded component count from `package.json` description
- Deduplicated `"veloria-ui"` keyword entry in `package.json`
- Also includes the `use-theme.ts` `matchMedia` null-guard fix from v0.1.2 patch (TypeError: Cannot read properties of null reading 'matches')

---

## [0.1.2] — 2026-03-15 (UPDATED)

### New Components (20)

**Advanced Forms**
- `PhoneInput` — international phone number with country dial-code selector
- `TagInput` — type and press Enter to add inline tags, supports max, duplicates control
- `CurrencyInput` — formatted number input with locale-aware currency symbol
- `RatingInput` — star rating picker with hover state, clear button, and read-only mode

**Data Display**
- `StatsCard` — metric card with icon, trend indicator, and loading skeleton
- `TreeView` — nested expandable tree with keyboard navigation and multi-depth support
- `JsonViewer` — collapsible syntax-highlighted JSON tree with configurable max depth
- `Heatmap` — GitHub-style activity grid with value intensity scale
- `KanbanBoard` — drag-and-drop column board with card tagging and assignee slot

**Feedback and Overlay**
- `BannerAlert` — full-width top-of-page announcement strip with 4 variants
- `ConfirmDialog` — opinionated confirmation modal with async confirm support and danger variant
- `FloatingActionButton` — FAB with expandable speed-dial actions and 3 position presets
- `RichTooltip` — tooltip with title, description, and action slot
- `Tour` — multi-step onboarding overlay with dot progress indicator

**Utility**
- `InfiniteScroll` — IntersectionObserver-based load-more trigger with loader slot
- `VirtualList` — windowed list renderer for large datasets with configurable overscan

### New Hooks (6)

- `useForm` — form state and validation with touched tracking, no extra dependencies
- `usePagination` — pagination logic decoupled from UI, with from/to helpers
- `useIntersection` — IntersectionObserver wrapper with optional `once` mode
- `useWindowSize` — reactive window width and height, SSR-safe
- `useStep` — multi-step wizard state with `isFirst`, `isLast`, and progress percentage
- `useCountdown` — countdown timer with `start`, `pause`, and `reset` controls

---

## [0.1.1] — 2026-03-13 (UPDATED)

### Build fixes

- Fixed `tailwindcss/plugin` resolve error — marked as external in tsup, switched to `require()` at runtime
- Fixed `"types"` export condition ordering in `package.json` — `types` now comes before `import`/`require`
- Fixed `use-toast.ts` renamed to `use-toast.tsx` — file contained JSX but had `.ts` extension
- Fixed `TS2320` / `TS2322` conflicts across all component interfaces — `HTMLAttributes` built-in props (`color`, `size`, `title`, `prefix`, `onChange`, `onDrop`, `onDragOver`) now properly `Omit`-ed before extending
- Renamed package from `veloria-ui-kit` to `veloria-ui`
- CLI `--version` flag now reads dynamically from `package.json` instead of being hardcoded

---

## [0.1.0] — 2024-06-28

### Initial Release

First public release of Veloria UI. A full component library, CLI, hooks, a Tailwind plugin, and a complete CSS token system with light + dark mode.

#### veloria-ui

**Basic (10)**
- `Button` — solid, outline, ghost, soft, link, danger variants · sizes xs–xl · loading state · left/right icon slots
- `IconButton` — square or circular icon-only button with all button variants
- `Link` — anchor with external link indicator and underline control
- `Badge` — compact label with 5 color variants and optional dot
- `Avatar` — image with fallback initials, online/offline status ring, 6 sizes
- `AvatarGroup` — stacked avatar row with overflow count
- `Divider` — horizontal/vertical with optional center label
- `Tag` — closable colored tag with icon slot
- `Chip` — toggleable with avatar/icon support and remove button
- `Tooltip` — Radix-powered, all four sides, configurable delay

**Layout (10)**
- `Container` — responsive max-width wrapper with padding control
- `Stack` — flex column/row with gap, align, justify, and divider support
- `Grid` — CSS Grid with column/row/gap config
- `Flex` — inline flex with full directional control
- `Section` — semantic `<section>` with vertical padding presets
- `Spacer` — invisible spacer
- `AspectRatio` — Radix aspect-ratio wrapper
- `Center` — flex centering helper
- `ScrollArea` — custom scrollbar via Radix ScrollArea
- `Masonry` — CSS multi-column masonry grid

**Navigation (10)**
- `Navbar` — sticky + glass-blur top bar
- `Sidebar` — collapsible with width transition
- `Menu` / `MenuItem` — vertical nav with active/disabled states
- `DropdownMenu` — full Radix Dropdown with all sub-primitives
- `Breadcrumb` — accessible trail with custom separator
- `Pagination` — page numbers, ellipsis, prev/next
- `Tabs` — line, pills, enclosed variants · Radix powered
- `Stepper` — horizontal/vertical multi-step progress indicator
- `CommandDialog` — ⌘K command palette via cmdk

**Forms (10)**
- `Input` — left/right icon slots, sizes, error state
- `TextArea` — resize control, error state
- `Select` — full Radix Select with all sub-primitives
- `Checkbox` — with label, description, error state
- `RadioGroup` — per-option labels and descriptions
- `Switch` — three sizes, label, description
- `Slider` — range slider
- `RangeSlider` — dual-thumb slider
- `DatePicker` — calendar popover
- `TimePicker` — hour/minute/period selector

**Data Display (10)**
- `Card` — with header, content, footer sub-components
- `DataTable` — sortable columns, row selection, pagination
- `List` / `ListItem` — icon, extra slot, active state
- `Statistic` — value + trend indicator
- `Timeline` / `TimelineItem` — vertical event list
- `Calendar` — month view with selection
- `CodeBlock` — syntax highlight via highlight.js + copy button
- `Accordion` — Radix-powered expand/collapse
- `Table` — semantic HTML table primitives
- `Badge` — reused from Basic

**Feedback (10)**
- `Alert` — info/success/warning/danger with icon
- `Toast` / `ToastProvider` — Radix toast with all sub-primitives
- `Skeleton` — animated loading placeholder
- `Progress` — determinate + indeterminate bar
- `Spinner` / `LoadingSpinner` — SVG spinners
- `EmptyState` — icon + title + description + action
- `StatusIndicator` — online/offline/busy/away dot with pulse
- `Notification` — notification item with avatar, timestamp, unread dot

**Overlay (10)**
- `Modal` — preset dialog — sm to full size variants
- `Dialog` — full Radix Dialog primitive suite
- `Drawer` — slides in from any edge
- `Sheet` — Drawer alias
- `Popover` — floating panel
- `HoverCard` — rich hover preview
- `ContextMenu` — right-click menu
- `CommandDialog` — ⌘K palette
- `Lightbox` — full-screen image overlay
- `ImageViewer` — Lightbox alias

**Media (5)**
- `Image` — with fallback, aspect ratio, fit, caption
- `VideoPlayer` — HTML5 video with captions/subtitles support
- `AudioPlayer` — custom UI with seek bar, cover art
- `Carousel` — autoplay, dots, arrows, loop, slidesPerView
- `Gallery` — responsive image grid with click handler

**Utility (5)**
- `ThemeSwitcher` — icon / toggle / select variants
- `CopyButton` — icon or labelled button with success feedback
- `KeyboardShortcut` — styled `<kbd>` shortcut display
- `ResizablePanel` — drag-to-resize with min/max constraints
- `DragDropArea` — accessible file drop zone

#### Hooks
- `useDisclosure` — open/close state management
- `useMediaQuery` — window media query subscription
- `useBreakpoint` — Tailwind breakpoint helper
- `useClipboard` — clipboard copy with timeout feedback
- `useLocalStorage` — persistent state
- `useTheme` — theme switching (persists to localStorage)
- `useDebounce` — debounced value
- `useOnClickOutside` — outside click detection
- `useKeydown` — keyboard shortcut listener with modifier support
- `useMounted` — SSR-safe mount check
- `useToast` — programmatic toast notifications

#### Infrastructure
- Tailwind CSS plugin + preset (`veloriaPlugin`, `veloriaPreset`)
- Full CSS design token system — light and dark themes
- `VeloriaProvider` for Next.js App Router
- TypeScript strict throughout — full named type exports
- Tree-shakeable ESM + CJS dual build via tsup
- Turbo monorepo setup

#### veloria-ui CLI
- `init` — project setup wizard (detects Next.js, writes veloria.config.json)
- `add` — copies components + installs npm deps, resolves Veloria UI peer deps
- `list` — browse all components filtered by category
- `diff` — compare local copy to latest (registry fetch, coming soon)
- Auto-detects npm / pnpm / yarn / bun