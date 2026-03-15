/**
 * AtlasUI Component Registry
 *
 * Defines every component, its category, source path,
 * and npm dependencies required.
 */

export interface ComponentMeta {
  name: string;
  category: Category;
  description: string;
  deps: string[];
  devDeps?: string[];
  files: string[];
  /** Other AtlasUI components this one depends on */
  registryDeps?: string[];
}

export type Category =
  | "basic"
  | "layout"
  | "navigation"
  | "forms"
  | "advanced-forms"
  | "data-display"
  | "feedback"
  | "overlay"
  | "media"
  | "utility";

export const REGISTRY: ComponentMeta[] = [
  // ─── Basic ───────────────────────────────────────────────────────────────
  {
    name: "button",
    category: "basic",
    description: "Accessible button with variants, sizes, and loading state.",
    deps: ["@radix-ui/react-slot", "class-variance-authority", "clsx", "tailwind-merge"],
    files: ["components/basic/Button.tsx"],
  },
  {
    name: "icon-button",
    category: "basic",
    description: "Square or circular icon-only button.",
    deps: ["@radix-ui/react-slot", "class-variance-authority", "clsx", "tailwind-merge"],
    files: ["components/basic/IconButton.tsx"],
  },
  {
    name: "link",
    category: "basic",
    description: "Styled anchor element with external link support.",
    deps: ["@radix-ui/react-slot"],
    files: ["components/basic/index.tsx"],
  },
  {
    name: "badge",
    category: "basic",
    description: "Compact label for status, counts, or categories.",
    deps: ["class-variance-authority", "clsx", "tailwind-merge"],
    files: ["components/basic/index.tsx"],
  },
  {
    name: "avatar",
    category: "basic",
    description: "User avatar with image, fallback, and status indicator.",
    deps: ["@radix-ui/react-avatar"],
    files: ["components/basic/index.tsx"],
  },
  {
    name: "avatar-group",
    category: "basic",
    description: "Stacked group of avatars with overflow count.",
    deps: ["@radix-ui/react-avatar"],
    registryDeps: ["avatar"],
    files: ["components/basic/index.tsx"],
  },
  {
    name: "divider",
    category: "basic",
    description: "Horizontal or vertical separator, optionally labeled.",
    deps: ["@radix-ui/react-separator"],
    files: ["components/basic/index.tsx"],
  },
  {
    name: "tag",
    category: "basic",
    description: "Closable tag/label component.",
    deps: [],
    files: ["components/basic/index.tsx"],
  },
  {
    name: "chip",
    category: "basic",
    description: "Toggleable chip with avatar or icon support.",
    deps: [],
    files: ["components/basic/index.tsx"],
  },
  {
    name: "tooltip",
    category: "basic",
    description: "Floating label on hover/focus.",
    deps: ["@radix-ui/react-tooltip"],
    files: ["components/basic/index.tsx"],
  },

  // ─── Layout ──────────────────────────────────────────────────────────────
  {
    name: "container",
    category: "layout",
    description: "Responsive max-width wrapper.",
    deps: [],
    files: ["components/layout/index.tsx"],
  },
  {
    name: "stack",
    category: "layout",
    description: "One-dimensional flex layout.",
    deps: [],
    files: ["components/layout/index.tsx"],
  },
  {
    name: "grid",
    category: "layout",
    description: "CSS Grid layout component.",
    deps: [],
    files: ["components/layout/index.tsx"],
  },
  {
    name: "flex",
    category: "layout",
    description: "Flexible box layout component.",
    deps: [],
    files: ["components/layout/index.tsx"],
  },
  {
    name: "section",
    category: "layout",
    description: "Page section with vertical padding presets.",
    deps: [],
    files: ["components/layout/index.tsx"],
  },
  {
    name: "spacer",
    category: "layout",
    description: "Invisible space element.",
    deps: [],
    files: ["components/layout/index.tsx"],
  },
  {
    name: "aspect-ratio",
    category: "layout",
    description: "Constrain content to an aspect ratio.",
    deps: ["@radix-ui/react-aspect-ratio"],
    files: ["components/layout/index.tsx"],
  },
  {
    name: "center",
    category: "layout",
    description: "Perfectly centered content.",
    deps: [],
    files: ["components/layout/index.tsx"],
  },
  {
    name: "scroll-area",
    category: "layout",
    description: "Custom styled scrollable container.",
    deps: ["@radix-ui/react-scroll-area"],
    files: ["components/layout/index.tsx"],
  },
  {
    name: "masonry",
    category: "layout",
    description: "Pinterest-style masonry grid layout.",
    deps: [],
    files: ["components/layout/index.tsx"],
  },

  // ─── Navigation ───────────────────────────────────────────────────────────
  {
    name: "navbar",
    category: "navigation",
    description: "Top navigation bar with sticky and blur options.",
    deps: [],
    files: ["components/navigation/index.tsx"],
  },
  {
    name: "sidebar",
    category: "navigation",
    description: "Collapsible side navigation.",
    deps: [],
    files: ["components/navigation/index.tsx"],
  },
  {
    name: "menu",
    category: "navigation",
    description: "Vertical menu with active state support.",
    deps: [],
    files: ["components/navigation/index.tsx"],
  },
  {
    name: "dropdown-menu",
    category: "navigation",
    description: "Radix-powered dropdown with full keyboard navigation.",
    deps: ["@radix-ui/react-dropdown-menu"],
    files: ["components/navigation/index.tsx"],
  },
  {
    name: "breadcrumb",
    category: "navigation",
    description: "Accessible breadcrumb trail.",
    deps: [],
    files: ["components/navigation/index.tsx"],
  },
  {
    name: "pagination",
    category: "navigation",
    description: "Page navigation with ellipsis support.",
    deps: [],
    files: ["components/navigation/index.tsx"],
  },
  {
    name: "tabs",
    category: "navigation",
    description: "Tabbed interface with line, pills, and enclosed variants.",
    deps: ["@radix-ui/react-tabs"],
    files: ["components/navigation/index.tsx"],
  },
  {
    name: "command-palette",
    category: "navigation",
    description: "Searchable command palette (⌘K style).",
    deps: ["cmdk"],
    registryDeps: ["command-dialog"],
    files: ["components/overlay/index.tsx"],
  },
  {
    name: "navigation-menu",
    category: "navigation",
    description: "Radix Navigation Menu for complex navbars.",
    deps: ["@radix-ui/react-navigation-menu"],
    files: ["components/navigation/index.tsx"],
  },
  {
    name: "stepper",
    category: "navigation",
    description: "Multi-step progress indicator.",
    deps: [],
    files: ["components/navigation/index.tsx"],
  },

  // ─── Forms ────────────────────────────────────────────────────────────────
  {
    name: "input",
    category: "forms",
    description: "Text input with icon slots, sizes, and error state.",
    deps: ["class-variance-authority"],
    files: ["components/forms/index.tsx"],
  },
  {
    name: "textarea",
    category: "forms",
    description: "Multi-line text input.",
    deps: [],
    files: ["components/forms/index.tsx"],
  },
  {
    name: "select",
    category: "forms",
    description: "Accessible select dropdown.",
    deps: ["@radix-ui/react-select"],
    files: ["components/forms/index.tsx"],
  },
  {
    name: "checkbox",
    category: "forms",
    description: "Checkbox with optional label and description.",
    deps: ["@radix-ui/react-checkbox"],
    files: ["components/forms/index.tsx"],
  },
  {
    name: "radio-group",
    category: "forms",
    description: "Radio group with accessible labels.",
    deps: ["@radix-ui/react-radio-group"],
    files: ["components/forms/index.tsx"],
  },
  {
    name: "switch",
    category: "forms",
    description: "Toggle switch with sizes.",
    deps: ["@radix-ui/react-switch"],
    files: ["components/forms/index.tsx"],
  },
  {
    name: "slider",
    category: "forms",
    description: "Range slider input.",
    deps: ["@radix-ui/react-slider"],
    files: ["components/forms/index.tsx"],
  },
  {
    name: "range-slider",
    category: "forms",
    description: "Dual-thumb range slider.",
    deps: ["@radix-ui/react-slider"],
    registryDeps: ["slider"],
    files: ["components/forms/index.tsx"],
  },
  {
    name: "date-picker",
    category: "forms",
    description: "Native date input wrapper.",
    deps: [],
    registryDeps: ["input"],
    files: ["components/forms/index.tsx"],
  },
  {
    name: "time-picker",
    category: "forms",
    description: "Native time input wrapper.",
    deps: [],
    registryDeps: ["input"],
    files: ["components/forms/index.tsx"],
  },

  // ─── Advanced Forms ───────────────────────────────────────────────────────
  {
    name: "file-upload",
    category: "advanced-forms",
    description: "Drag-and-drop file upload area.",
    deps: [],
    files: ["components/advanced-forms/index.tsx"],
  },
  {
    name: "otp-input",
    category: "advanced-forms",
    description: "One-time password / PIN input.",
    deps: [],
    files: ["components/advanced-forms/index.tsx"],
  },
  {
    name: "color-picker",
    category: "advanced-forms",
    description: "Color picker with swatches and hex input.",
    deps: [],
    files: ["components/advanced-forms/index.tsx"],
  },
  {
    name: "search-input",
    category: "advanced-forms",
    description: "Search input with clear button and loading state.",
    deps: [],
    files: ["components/advanced-forms/index.tsx"],
  },
  {
    name: "password-input",
    category: "advanced-forms",
    description: "Password input with show/hide toggle.",
    deps: [],
    files: ["components/advanced-forms/index.tsx"],
  },
  {
    name: "combobox",
    category: "advanced-forms",
    description: "Searchable select / combobox.",
    deps: [],
    files: ["components/advanced-forms/index.tsx"],
  },
  {
    name: "multi-select",
    category: "advanced-forms",
    description: "Multi-value select with chips.",
    deps: [],
    files: ["components/advanced-forms/index.tsx"],
  },
  {
    name: "form-field",
    category: "advanced-forms",
    description: "Form field wrapper with spacing.",
    deps: [],
    files: ["components/advanced-forms/index.tsx"],
  },
  {
    name: "form-label",
    category: "advanced-forms",
    description: "Form label with required/optional indicators.",
    deps: [],
    files: ["components/advanced-forms/index.tsx"],
  },
  {
    name: "form-error",
    category: "advanced-forms",
    description: "Accessible form error message.",
    deps: [],
    files: ["components/advanced-forms/index.tsx"],
  },

  // ─── Data Display ─────────────────────────────────────────────────────────
  {
    name: "card",
    category: "data-display",
    description: "Surface container with header, content, and footer slots.",
    deps: [],
    files: ["components/data-display/index.tsx"],
  },
  {
    name: "table",
    category: "data-display",
    description: "HTML table with Atlas styling.",
    deps: [],
    files: ["components/data-display/index.tsx"],
  },
  {
    name: "data-table",
    category: "data-display",
    description: "Feature-rich sortable data table.",
    deps: [],
    files: ["components/data-display/index.tsx"],
  },
  {
    name: "list",
    category: "data-display",
    description: "Simple, bordered, or divided list.",
    deps: [],
    files: ["components/data-display/index.tsx"],
  },
  {
    name: "list-item",
    category: "data-display",
    description: "List item with icon and extra slot.",
    deps: [],
    files: ["components/data-display/index.tsx"],
  },
  {
    name: "statistic",
    category: "data-display",
    description: "Key metric display with trend indicator.",
    deps: [],
    files: ["components/data-display/index.tsx"],
  },
  {
    name: "timeline",
    category: "data-display",
    description: "Vertical event timeline.",
    deps: [],
    files: ["components/data-display/index.tsx"],
  },
  {
    name: "calendar",
    category: "data-display",
    description: "Month calendar with date selection.",
    deps: [],
    files: ["components/data-display/index.tsx"],
  },
  {
    name: "chart",
    category: "data-display",
    description: "Chart wrapper (bring your own chart library).",
    deps: [],
    files: ["components/data-display/index.tsx"],
  },
  {
    name: "code-block",
    category: "data-display",
    description: "Syntax-highlighted code block with copy button.",
    deps: [],
    files: ["components/data-display/index.tsx"],
  },

  // ─── Feedback ─────────────────────────────────────────────────────────────
  {
    name: "alert",
    category: "feedback",
    description: "Contextual info, success, warning, and error alerts.",
    deps: ["class-variance-authority"],
    files: ["components/feedback/index.tsx"],
  },
  {
    name: "toast",
    category: "feedback",
    description: "Radix Toast notifications.",
    deps: ["@radix-ui/react-toast"],
    files: ["components/feedback/index.tsx"],
  },
  {
    name: "snackbar",
    category: "feedback",
    description: "Positioned snackbar message.",
    deps: [],
    files: ["components/feedback/index.tsx"],
  },
  {
    name: "progress",
    category: "feedback",
    description: "Linear progress bar.",
    deps: ["@radix-ui/react-progress"],
    files: ["components/feedback/index.tsx"],
  },
  {
    name: "circular-progress",
    category: "feedback",
    description: "Circular / ring progress indicator.",
    deps: [],
    files: ["components/feedback/index.tsx"],
  },
  {
    name: "skeleton",
    category: "feedback",
    description: "Loading skeleton placeholder.",
    deps: [],
    files: ["components/feedback/index.tsx"],
  },
  {
    name: "loading-spinner",
    category: "feedback",
    description: "Animated loading spinner.",
    deps: [],
    files: ["components/feedback/index.tsx"],
  },
  {
    name: "empty-state",
    category: "feedback",
    description: "Empty state with icon, title, and action.",
    deps: [],
    files: ["components/feedback/index.tsx"],
  },
  {
    name: "status-indicator",
    category: "feedback",
    description: "Colored dot for online/offline/busy/away status.",
    deps: [],
    files: ["components/feedback/index.tsx"],
  },
  {
    name: "notification",
    category: "feedback",
    description: "Notification item with avatar, title, and timestamp.",
    deps: [],
    files: ["components/feedback/index.tsx"],
  },

  // ─── Overlay ──────────────────────────────────────────────────────────────
  {
    name: "modal",
    category: "overlay",
    description: "Dialog modal with size variants.",
    deps: ["@radix-ui/react-dialog"],
    files: ["components/overlay/index.tsx"],
  },
  {
    name: "dialog",
    category: "overlay",
    description: "Low-level Radix Dialog primitives.",
    deps: ["@radix-ui/react-dialog"],
    files: ["components/overlay/index.tsx"],
  },
  {
    name: "drawer",
    category: "overlay",
    description: "Side/bottom drawer panel.",
    deps: ["@radix-ui/react-dialog"],
    files: ["components/overlay/index.tsx"],
  },
  {
    name: "popover",
    category: "overlay",
    description: "Floating popover panel.",
    deps: ["@radix-ui/react-popover"],
    files: ["components/overlay/index.tsx"],
  },
  {
    name: "hover-card",
    category: "overlay",
    description: "Rich hover card preview.",
    deps: ["@radix-ui/react-hover-card"],
    files: ["components/overlay/index.tsx"],
  },
  {
    name: "context-menu",
    category: "overlay",
    description: "Right-click context menu.",
    deps: ["@radix-ui/react-context-menu"],
    files: ["components/overlay/index.tsx"],
  },
  {
    name: "command-dialog",
    category: "overlay",
    description: "⌘K command palette dialog.",
    deps: ["cmdk", "@radix-ui/react-dialog"],
    files: ["components/overlay/index.tsx"],
  },
  {
    name: "sheet",
    category: "overlay",
    description: "Alias for Drawer.",
    deps: ["@radix-ui/react-dialog"],
    registryDeps: ["drawer"],
    files: ["components/overlay/index.tsx"],
  },
  {
    name: "lightbox",
    category: "overlay",
    description: "Full-screen image lightbox.",
    deps: ["@radix-ui/react-dialog"],
    files: ["components/overlay/index.tsx"],
  },
  {
    name: "image-viewer",
    category: "overlay",
    description: "Alias for Lightbox.",
    deps: ["@radix-ui/react-dialog"],
    registryDeps: ["lightbox"],
    files: ["components/overlay/index.tsx"],
  },

  // ─── Media ────────────────────────────────────────────────────────────────
  {
    name: "image",
    category: "media",
    description: "Image with fallback, aspect ratio, and fit options.",
    deps: [],
    files: ["components/media/index.tsx"],
  },
  {
    name: "video-player",
    category: "media",
    description: "HTML5 video player with caption support.",
    deps: [],
    files: ["components/media/index.tsx"],
  },
  {
    name: "audio-player",
    category: "media",
    description: "Custom audio player UI.",
    deps: [],
    files: ["components/media/index.tsx"],
  },
  {
    name: "carousel",
    category: "media",
    description: "Slideshow carousel with autoplay and dots.",
    deps: [],
    files: ["components/media/index.tsx"],
  },
  {
    name: "gallery",
    category: "media",
    description: "Responsive image grid gallery.",
    deps: [],
    files: ["components/media/index.tsx"],
  },

  // ─── Utility ──────────────────────────────────────────────────────────────
  {
    name: "theme-switcher",
    category: "utility",
    description: "Light/dark/system theme toggle.",
    deps: [],
    files: ["components/utility/index.tsx"],
  },
  {
    name: "copy-button",
    category: "utility",
    description: "One-click clipboard copy button.",
    deps: [],
    files: ["components/utility/index.tsx"],
  },
  {
    name: "keyboard-shortcut",
    category: "utility",
    description: "Styled keyboard shortcut display.",
    deps: [],
    files: ["components/utility/index.tsx"],
  },
  {
    name: "resizable-panel",
    category: "utility",
    description: "Drag-to-resize panel.",
    deps: [],
    files: ["components/utility/index.tsx"],
  },
  {
    name: "drag-drop-area",
    category: "utility",
    description: "Drag-and-drop file drop zone.",
    deps: [],
    files: ["components/utility/index.tsx"],
  },
];

export const COMPONENTS_BY_NAME = new Map(
  REGISTRY.map((c) => [c.name, c])
);

export const CATEGORIES = [
  "basic",
  "layout",
  "navigation",
  "forms",
  "advanced-forms",
  "data-display",
  "feedback",
  "overlay",
  "media",
  "utility",
] as const;
