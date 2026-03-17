/**
 * veloria-ui/motion — types
 */

// ─── Preset names ─────────────────────────────────────────────────────────

export type MotionPreset =
  | "fade"
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade-scale"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "zoom"
  | "zoom-out"
  | "flip"
  | "flip-x"
  | "bounce"
  | "none";

// ─── Easing names ─────────────────────────────────────────────────────────

export type MotionEasing =
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "spring"
  | "bounce"
  | "linear";

// ─── Per-animation config ─────────────────────────────────────────────────

export interface MotionConfig {
  /** The named animation preset to use. Default: "fade" */
  preset?: MotionPreset;
  /** Duration in milliseconds. Default: 220 */
  duration?: number;
  /** Delay before the enter animation starts, in milliseconds. Default: 0 */
  delay?: number;
  /** Named easing curve or a custom cubic-bezier string. Default: "ease-out" */
  easing?: MotionEasing | string;
  /**
   * Distance in pixels used by translate-based presets (fade-up, slide-up, etc.).
   * Default: 16
   */
  distance?: number;
  /**
   * When true, runs the exit animation in reverse of the enter animation.
   * Default: true
   */
  exitReverse?: boolean;
  /** Custom enter keyframes — overrides the preset enter frames entirely. */
  enterKeyframes?: Keyframe[];
  /** Custom exit keyframes — overrides the preset exit frames entirely. */
  exitKeyframes?: Keyframe[];
}

// ─── Motion props added to components ────────────────────────────────────

export interface MotionProps {
  /**
   * Either a preset name (shorthand) or a full MotionConfig object.
   *
   * @example
   * // Shorthand
   * <Modal motion="slide-up" />
   *
   * // Full config
   * <Card motion={{ preset: "fade-up", delay: 150, duration: 300 }} />
   */
  motion?: MotionPreset | MotionConfig;
}

// ─── Animated component props ─────────────────────────────────────────────

export interface AnimatedProps
  extends React.HTMLAttributes<HTMLElement>,
    MotionProps {
  /**
   * Whether the element is "open" / visible.
   * When toggled from true → false, the exit animation plays before unmounting.
   */
  show?: boolean;
  /**
   * The HTML element to render. Default: "div"
   */
  as?: React.ElementType;
  /**
   * When true, the element is never removed from the DOM — only hidden.
   * Useful for elements that are expensive to remount (e.g. iframes, canvases).
   */
  keepMounted?: boolean;
  children?: React.ReactNode;
}

// ─── MotionPresence props ─────────────────────────────────────────────────

export interface MotionPresenceProps {
  /**
   * The child element. Must accept a `ref`. When the child unmounts,
   * the exit animation will play before it is removed from the DOM.
   */
  children: React.ReactElement;
  /**
   * Motion config applied to the child's enter/exit.
   */
  motion?: MotionPreset | MotionConfig;
  /**
   * Called after the exit animation finishes and the element is removed.
   */
  onExitComplete?: () => void;
}
