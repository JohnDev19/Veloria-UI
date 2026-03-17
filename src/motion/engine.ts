/**
 * veloria-ui/motion — engine
 *
 * The core animation runner. Wraps the Web Animations API with:
 *   - prefers-reduced-motion detection and automatic fallback
 *   - preset resolution and distance substitution
 *   - promise-based completion tracking
 *   - graceful cancel on concurrent runs
 */

import type { MotionConfig, MotionPreset, MotionEasing } from "./types";
import { PRESETS, DURATIONS, EASINGS, resolveKeyframes } from "./presets";

// ─── Defaults ─────────────────────────────────────────────────────────────

const DEFAULT_CONFIG: Required<Omit<MotionConfig, "enterKeyframes" | "exitKeyframes">> = {
  preset:      "fade",
  duration:    DURATIONS.fast,
  delay:       0,
  easing:      "ease-out",
  distance:    16,
  exitReverse: true,
};

// ─── prefers-reduced-motion ───────────────────────────────────────────────

/**
 * Returns true if the user has requested reduced motion.
 * Safe to call in SSR (returns false on the server).
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

// ─── Config normalisation ─────────────────────────────────────────────────

/**
 * Normalises a MotionPreset string | MotionConfig object into a full
 * resolved config with all defaults filled in.
 */
export function resolveConfig(
  motion: MotionPreset | MotionConfig | undefined
): Required<Omit<MotionConfig, "enterKeyframes" | "exitKeyframes">> & {
  enterKeyframes?: Keyframe[];
  exitKeyframes?:  Keyframe[];
} {
  if (!motion) return { ...DEFAULT_CONFIG };

  if (typeof motion === "string") {
    return {
      ...DEFAULT_CONFIG,
      preset: motion,
      // bounce preset uses spring easing by default
      easing: motion === "bounce" ? "spring" : DEFAULT_CONFIG.easing,
    };
  }

  return {
    ...DEFAULT_CONFIG,
    ...motion,
    easing: motion.easing ?? (motion.preset === "bounce" ? "spring" : DEFAULT_CONFIG.easing),
  };
}

// ─── Easing resolution ────────────────────────────────────────────────────

function resolveEasing(easing: MotionEasing | string): string {
  return EASINGS[easing as MotionEasing] ?? easing;
}

// ─── Core animate function ────────────────────────────────────────────────

export interface AnimateOptions {
  el:      HTMLElement;
  config:  ReturnType<typeof resolveConfig>;
  phase:   "enter" | "exit";
  signal?: AbortSignal;
}

/**
 * Runs a single enter or exit animation on the given element using
 * the Web Animations API. Returns a promise that resolves when the
 * animation finishes (or immediately if reduced motion is preferred).
 */
export async function animate({ el, config, phase, signal }: AnimateOptions): Promise<void> {
  // If the user prefers reduced motion, skip all animation entirely.
  // For enter: ensure element is visible. For exit: ensure hidden.
  if (prefersReducedMotion() || config.preset === "none") {
    if (phase === "enter") {
      el.style.opacity = "1";
      el.style.transform = "";
    }
    return;
  }

  const preset = PRESETS[config.preset] ?? PRESETS["fade"];
  const distance = config.distance;
  const easingStr = resolveEasing(config.easing);

  // Resolve keyframes
  let rawEnter = config.enterKeyframes ?? preset.enter;
  let rawExit  = config.exitKeyframes  ?? preset.exit;

  // If no explicit exit frames, reverse the enter frames
  if (!rawExit) {
    rawExit = config.exitReverse ? [...rawEnter].reverse() : rawEnter;
  }

  const enterFrames = resolveKeyframes(rawEnter, distance);
  const exitFrames  = resolveKeyframes(rawExit,  distance);

  const frames  = phase === "enter" ? enterFrames : exitFrames;
  const timing: KeyframeAnimationOptions = {
    duration:   config.duration,
    delay:      phase === "enter" ? config.delay : 0,
    easing:     easingStr,
    fill:       "forwards",
  };

  return new Promise<void>((resolve) => {
    // Cancel any in-flight animation on this element for this phase
    const existing = (el as HTMLElement & { __veloria_anim__?: Animation }).__veloria_anim__;
    if (existing) {
      try { existing.cancel(); } catch { /* ignore */ }
    }

    const anim = el.animate(frames, timing);
    (el as HTMLElement & { __veloria_anim__?: Animation }).__veloria_anim__ = anim;

    // If the caller aborts (e.g. component unmounts mid-animation), cancel cleanly
    signal?.addEventListener("abort", () => {
      try { anim.cancel(); } catch { /* ignore */ }
      resolve();
    }, { once: true });

    anim.onfinish  = () => resolve();
    anim.oncancel  = () => resolve();
  });
}

// ─── Stagger helper ───────────────────────────────────────────────────────

/**
 * Returns a delay in ms for staggered animations.
 * Use in a list: items.map((_, i) => stagger(i, 60))
 */
export function stagger(index: number, stepMs = 60, baseDelayMs = 0): number {
  return baseDelayMs + index * stepMs;
}
