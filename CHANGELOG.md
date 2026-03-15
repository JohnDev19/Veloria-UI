# Changelog

All changes to AtlasUI will be documented here.

This project adheres to [Semantic Versioning](https://semver.org).

---

## [0.1.0]

### 🎉 Initial Release

#### @atlasui/core

**Basic (10)**
- `Button` — Solid, outline, ghost, soft, link, and danger variants; sizes xs–xl; loading state; icon slots
- `IconButton` — Square or circular icon-only button with all button variants
- `Link` — Accessible anchor with external link indicator and underline control
- `Badge` — Compact label with 5 color variants and dot support
- `Avatar` — Image avatar with fallback initials, status indicator, and 6 sizes
- `AvatarGroup` — Stacked avatar row with overflow count
- `Divider` — Horizontal/vertical separator with optional center label
- `Tag` — Closable colored tag with icon slot
- `Chip` — Toggleable chip with avatar/icon support and close button
- `Tooltip` — Radix-powered tooltip with all four sides

**Layout (10)**
- `Container` — Responsive max-width wrapper with padding control
- `Stack` — Flex column/row with gap, align, justify, and divider support
- `Grid` — CSS Grid with column/row/gap configuration
- `Flex` — Inline flex with full directional control
- `Section` — Semantic `<section>` with vertical padding presets
- `Spacer` — Invisible spacer element
- `AspectRatio` — Radix aspect-ratio container
- `Center` — Perfect centering helper
- `ScrollArea` — Custom scrollbar via Radix ScrollArea
- `Masonry` — CSS multi-column masonry grid

**Navigation (10)**
- `Navbar` — Sticky and glass-blur top bar
- `Sidebar` — Collapsible side navigation with width animation
- `Menu` / `MenuItem` — Vertical nav menu with active/disabled states
- `DropdownMenu` — Full Radix Dropdown Menu with all sub-primitives
- `Breadcrumb` — Accessible trail with custom separator
- `Pagination` — Page numbers with ellipsis and prev/next buttons
- `Tabs` — Line, pills, and enclosed variants; Radix powered
- `Stepper` — Horizontal/vertical multi-step progress indicator
- `CommandDialog` — ⌘K command palette using cmdk

**Forms (10)**
- `Input` — Left/right icon slots, sizes, error state
- `TextArea` — Resize control, error state
- `Select` — Full Radix Select with all sub-primitives
- `Checkbox` — With label, description, error state
- `RadioGroup` — With per-option labels and descriptions
- `Switch` — Three sizes, label, description
- `Slider` — Range slider
- `RangeSlider` — Dual-thumb slider
- `DatePicker` — Native date input wrapper
- `TimePicker` — Native time input wrapper

**Advanced Forms (10)**
- `FileUpload` — Drag-and-drop zone with fallback click-to-upload
- `OTPInput` — PIN/OTP input with auto-advance and paste support
- `ColorPicker` — Swatches + hex input
- `SearchInput` — Search with loading state and clear button
- `PasswordInput` — Toggle show/hide password
- `Combobox` — Searchable single-value select
- `MultiSelect` — Multi-value select with chips
- `FormField` / `FormLabel` / `FormError` — Composable form primitives

**Data Display (10)**
- `Card` — Surface with header/content/footer slots; 5 variants
- `Table` / `TableHeader` / `TableBody` / `TableRow` / `TableHead` / `TableCell` — HTML table system
- `DataTable` — Sortable data table with loading and empty states
- `List` / `ListItem` — Simple, bordered, and divided lists
- `Statistic` — Key metric with trend indicator
- `Timeline` — Vertical event timeline with color-coded icons
- `Calendar` — Month picker with highlighted dates
- `CodeBlock` — Syntax display with copy button and line numbers
- `Chart` — Chart wrapper (bring your own chart library)

**Feedback (10)**
- `Alert` — Info/success/warning/danger variants with optional close
- `Toast` — Radix Toast with all sub-primitives
- `Snackbar` — Positioned message with action
- `Progress` — Linear bar with color variants
- `CircularProgress` — SVG ring progress with indeterminate mode
- `Skeleton` — Pulse placeholder for text, rect, and circle
- `LoadingSpinner` — Accessible SVG spinner
- `EmptyState` — Icon + title + description + action
- `StatusIndicator` — Online/offline/busy/away dot with pulse
- `Notification` — Notification item with avatar, time, and unread state

**Overlay (10)**
- `Modal` — Preset dialog with size variants
- `Dialog` — Full Radix Dialog primitive suite
- `Drawer` — Slide-in panel from any side
- `Sheet` — Alias for Drawer
- `Popover` — Floating panel
- `HoverCard` — Rich hover preview
- `ContextMenu` — Right-click menu
- `CommandDialog` — ⌘K palette
- `Lightbox` / `ImageViewer` — Full-screen image overlay

**Media (5)**
- `Image` — With fallback, aspect ratio, object-fit, rounded, caption
- `VideoPlayer` — HTML5 video with captions/subtitles track support
- `AudioPlayer` — Custom audio player UI with seek bar
- `Carousel` — Autoplay, dots, arrows, loop, slidesPerView
- `Gallery` — Responsive image grid with click handler

**Utility (5)**
- `ThemeSwitcher` — Icon / toggle / select variants
- `CopyButton` — Icon or button with success feedback
- `KeyboardShortcut` — Styled `<kbd>` shortcut display
- `ResizablePanel` — Drag-to-resize panel
- `DragDropArea` — Accessible drop zone

#### Hooks
- `useDisclosure` — open/close state
- `useMediaQuery` — window media query
- `useBreakpoint` — Tailwind breakpoint helper
- `useClipboard` — clipboard copy with timeout
- `useLocalStorage` — persistent state
- `useTheme` — theme switching
- `useDebounce` — debounced values
- `useOnClickOutside` — outside click detection
- `useKeydown` — keyboard shortcut handler
- `useMounted` — SSR-safe mount check
- `useToast` — programmatic toast notifications

#### Infrastructure
- Tailwind CSS plugin + preset (`atlasPlugin`, `atlasPreset`)
- CSS design tokens (full light + dark theme)
- `AtlasProvider` for Next.js App Router
- TypeScript strict — full type exports
- Tree-shakeable ESM + CJS dual build

#### @atlasui/cli

- `init` — Project setup wizard
- `add` — Copy components into project
- `list` — Browse all 90 components by category
- `diff` — Compare local vs. latest
- Component registry with all 90 components mapped
- Auto-detects npm / pnpm / yarn / bun

---

[0.1.0]: https://github.com/JohnDev19/AtlasUI/releases/tag/v0.1.0
