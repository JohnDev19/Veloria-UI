/**
 * veloria-ui/motion — useMotion hook
 *
 * Low-level hook that drives enter/exit animations on a DOM element ref.
 * Used internally by <Animated> and withMotion().
 *
 * Usage:
 *   const { ref, isVisible } = useMotion({ show, motion: "fade-up", delay: 100 });
 *   return <div ref={ref}>{children}</div>;
 */

"use client";

import * as React from "react";
import type { MotionConfig, MotionPreset } from "./types";
import { resolveConfig, animate } from "./engine";

// ─── Hook options ─────────────────────────────────────────────────────────

export interface UseMotionOptions {
  /**
   * Controls enter/exit. When changed true → false, the exit animation
   * plays and onExitComplete fires after it finishes.
   */
  show?: boolean;
  /**
   * The animation config — preset name or full MotionConfig.
   */
  motion?: MotionPreset | MotionConfig;
  /**
   * Called after the exit animation completes.
   * Useful for removing the element from the DOM.
   */
  onExitComplete?: () => void;
  /**
   * When true, auto-runs the enter animation once on mount.
   * Default: true
   */
  animateOnMount?: boolean;
}

// ─── Return value ─────────────────────────────────────────────────────────

export interface UseMotionReturn {
  /** Attach this ref to the element you want to animate. */
  ref: React.RefObject<HTMLElement | null>;
  /**
   * True while the element should be in the DOM.
   * During exit, this remains true until the animation completes.
   */
  isVisible: boolean;
}

// ─── Hook ─────────────────────────────────────────────────────────────────

export function useMotion({
  show = true,
  motion,
  onExitComplete,
  animateOnMount = true,
}: UseMotionOptions = {}): UseMotionReturn {
  const ref          = React.useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = React.useState(show);
  const prevShow     = React.useRef(show);
  const abortRef     = React.useRef<AbortController | null>(null);

  const config = React.useMemo(() => resolveConfig(motion), [motion]);

  // ── Enter on mount ────────────────────────────────────────────────────
  React.useEffect(() => {
    if (!animateOnMount) return;
    const el = ref.current;
    if (!el) return;

    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    // Ensure the element starts invisible so the enter frames take effect
    el.style.opacity = "0";

    animate({ el, config, phase: "enter", signal: ctrl.signal }).catch(() => {/* silently ignore */});

    return () => { ctrl.abort(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally only on mount

  // ── React to show changes ─────────────────────────────────────────────
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prevShow.current === show) return;
    prevShow.current = show;

    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    if (show) {
      // Appearing: make visible first, then animate in
      setIsVisible(true);
      el.style.opacity = "0";
      animate({ el, config, phase: "enter", signal: ctrl.signal }).catch(() => {/* silently ignore */});
    } else {
      // Disappearing: animate out, then hide
      animate({ el, config, phase: "exit", signal: ctrl.signal })
        .then(() => {
          if (!ctrl.signal.aborted) {
            setIsVisible(false);
            onExitComplete?.();
          }
        })
        .catch(() => {/* silently ignore */});
    }

    return () => { ctrl.abort(); };
  }, [show, config, onExitComplete]);

  return { ref, isVisible };
}
