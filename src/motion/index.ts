/**
 * veloria-ui/motion
 *
 * Thin animation layer built entirely on the Web Animations API.
 * Zero runtime dependencies — no Framer Motion, no GSAP.
 * Respects prefers-reduced-motion automatically.
 *
 * Sub-path export: import { ... } from "veloria-ui/motion"
 *
 * By JohnDev19 — https://github.com/JohnDev19/Veloria-UI
 */

export { MotionPresence } from "./MotionPresence";
export { Animated }       from "./Animated";
export { useMotion }      from "./useMotion";
export { withMotion }     from "./withMotion";

// Pre-wrapped Veloria UI components with motion prop built in
export {
  MotionModal,
  MotionDrawer,
  MotionSheet,
  MotionDialog,
  MotionPopover,
  MotionHoverCard,
  MotionToast,
  MotionSnackbar,
  MotionBannerAlert,
  MotionCard,
  MotionAlert,
  // Factory getters (for custom wrapping)
  getMotionModal,
  getMotionDrawer,
  getMotionSheet,
  getMotionDialog,
  getMotionPopover,
  getMotionHoverCard,
  getMotionToast,
  getMotionSnackbar,
  getMotionBannerAlert,
  getMotionCard,
  getMotionAlert,
} from "./components";

export type {
  MotionPreset,
  MotionConfig,
  MotionProps,
  AnimatedProps,
  MotionPresenceProps,
} from "./types";

// Re-export preset constants so users can reference them without magic strings
export { PRESETS, DURATIONS, EASINGS } from "./presets";

// Engine utilities
export { stagger, prefersReducedMotion, resolveConfig, animate } from "./engine";
