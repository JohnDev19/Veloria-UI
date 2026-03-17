/**
 * veloria-ui/motion — presets
 *
 * Each preset defines enter and exit keyframe arrays for the
 * Web Animations API (element.animate()). Every preset is < 200 bytes.
 *
 * The exit keyframes are the enter keyframes in reverse by default,
 * so we only define enter frames here and reverse them in the engine
 * unless the user supplies explicit exitKeyframes.
 */

import type { MotionPreset, MotionEasing } from "./types";

// ─── Duration constants ───────────────────────────────────────────────────

export const DURATIONS = {
  /** Very fast — micro-interactions, tooltips */
  instant: 120,
  /** Fast — default for most overlays */
  fast:    220,
  /** Normal — drawers, modals */
  normal:  300,
  /** Slow — page transitions, hero reveals */
  slow:    450,
  /** Very slow — dramatic reveals */
  dramatic: 600,
} as const;

// ─── Easing constants ─────────────────────────────────────────────────────

export const EASINGS: Record<MotionEasing, string> = {
  "ease":        "ease",
  "ease-in":     "ease-in",
  "ease-out":    "ease-out",
  "ease-in-out": "ease-in-out",
  // Spring approximation via cubic-bezier
  "spring":      "cubic-bezier(0.34, 1.56, 0.64, 1)",
  // Gentle bounce
  "bounce":      "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  "linear":      "linear",
};

// ─── Preset definitions ───────────────────────────────────────────────────
//
// Each entry is [enterFrames, exitFrames].
// If exitFrames is null, the engine reverses enterFrames automatically.
// `distance` is a placeholder — the engine substitutes the actual px value.

export type PresetEntry = {
  enter: Keyframe[];
  exit:  Keyframe[] | null; // null = reverse of enter
};

const D = "__distance__"; // replaced at runtime with the configured distance

export const PRESETS: Record<MotionPreset, PresetEntry> = {

  // ── fade — simple opacity ─────────────────────────────────────────────
  "fade": {
    enter: [{ opacity: 0 }, { opacity: 1 }],
    exit:  null,
  },

  // ── fade-up — fade in from below ──────────────────────────────────────
  "fade-up": {
    enter: [
      { opacity: 0, transform: `translateY(${D}px)` },
      { opacity: 1, transform: "translateY(0)" },
    ],
    exit: null,
  },

  // ── fade-down — fade in from above ────────────────────────────────────
  "fade-down": {
    enter: [
      { opacity: 0, transform: `translateY(-${D}px)` },
      { opacity: 1, transform: "translateY(0)" },
    ],
    exit: null,
  },

  // ── fade-left — fade in from the right ────────────────────────────────
  "fade-left": {
    enter: [
      { opacity: 0, transform: `translateX(${D}px)` },
      { opacity: 1, transform: "translateX(0)" },
    ],
    exit: null,
  },

  // ── fade-right — fade in from the left ───────────────────────────────
  "fade-right": {
    enter: [
      { opacity: 0, transform: `translateX(-${D}px)` },
      { opacity: 1, transform: "translateX(0)" },
    ],
    exit: null,
  },

  // ── fade-scale — fade + scale from slightly smaller ───────────────────
  "fade-scale": {
    enter: [
      { opacity: 0, transform: "scale(0.95)" },
      { opacity: 1, transform: "scale(1)" },
    ],
    exit: null,
  },

  // ── slide-up — slide in from below, no fade ───────────────────────────
  "slide-up": {
    enter: [
      { transform: `translateY(100%)` },
      { transform: "translateY(0)" },
    ],
    exit: null,
  },

  // ── slide-down — slide in from above ─────────────────────────────────
  "slide-down": {
    enter: [
      { transform: "translateY(-100%)" },
      { transform: "translateY(0)" },
    ],
    exit: null,
  },

  // ── slide-left — slide in from the right ─────────────────────────────
  "slide-left": {
    enter: [
      { transform: "translateX(100%)" },
      { transform: "translateX(0)" },
    ],
    exit: null,
  },

  // ── slide-right — slide in from the left ─────────────────────────────
  "slide-right": {
    enter: [
      { transform: "translateX(-100%)" },
      { transform: "translateX(0)" },
    ],
    exit: null,
  },

  // ── zoom — scale from zero ────────────────────────────────────────────
  "zoom": {
    enter: [
      { opacity: 0, transform: "scale(0.5)" },
      { opacity: 1, transform: "scale(1)" },
    ],
    exit: null,
  },

  // ── zoom-out — scale from slightly larger ────────────────────────────
  "zoom-out": {
    enter: [
      { opacity: 0, transform: "scale(1.1)" },
      { opacity: 1, transform: "scale(1)" },
    ],
    exit: null,
  },

  // ── flip — 3D Y-axis flip ─────────────────────────────────────────────
  "flip": {
    enter: [
      { opacity: 0, transform: "perspective(400px) rotateY(90deg)" },
      { opacity: 1, transform: "perspective(400px) rotateY(0deg)" },
    ],
    exit: null,
  },

  // ── flip-x — 3D X-axis flip ──────────────────────────────────────────
  "flip-x": {
    enter: [
      { opacity: 0, transform: "perspective(400px) rotateX(90deg)" },
      { opacity: 1, transform: "perspective(400px) rotateX(0deg)" },
    ],
    exit: null,
  },

  // ── bounce — elastic entrance with overshoot ─────────────────────────
  // Uses spring easing; the keyframes are the same as fade-up.
  "bounce": {
    enter: [
      { opacity: 0, transform: `translateY(${D}px)` },
      { opacity: 1, transform: "translateY(0)" },
    ],
    exit: [
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0, transform: `translateY(${D}px)` },
    ],
  },

  // ── none — no animation ───────────────────────────────────────────────
  "none": {
    enter: [{ opacity: 1 }, { opacity: 1 }],
    exit:  [{ opacity: 1 }, { opacity: 1 }],
  },
};

// ─── Helper: resolve a MotionConfig into resolved keyframes ──────────────
//
// Substitutes the __distance__ placeholder with the actual pixel value
// and converts the preset name to concrete Keyframe arrays.

export function resolveKeyframes(
  frames: Keyframe[],
  distance: number
): Keyframe[] {
  return frames.map((frame) => {
    const resolved: Keyframe = {};
    for (const [key, value] of Object.entries(frame)) {
      resolved[key as keyof Keyframe] =
        typeof value === "string"
          ? value.replace(/__distance__/g, String(distance))
          : value;
    }
    return resolved;
  });
}
