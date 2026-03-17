/**
 * veloria-ui/motion — withMotion()
 *
 * Higher-order component that wraps any Veloria UI component and adds
 * a `motion` prop for enter/exit animation.
 *
 * This is how the motion prop is added to Modal, Drawer, Toast, Card, etc.
 * without modifying their source files.
 *
 * Usage:
 *   // In your own code — wrap a locally copied component
 *   import { Modal } from "@/components/ui/modal";
 *   import { withMotion } from "veloria-ui/motion";
 *
 *   const MotionModal = withMotion(Modal);
 *
 *   <MotionModal motion="fade-scale" open={isOpen} onOpenChange={setOpen} title="Hello" />
 *
 * The HOC:
 *   1. Listens to the `open` prop (or a custom `visibleProp` name) for enter/exit.
 *   2. Finds the first rendered DOM element via the ref.
 *   3. Plays the enter animation when `open` becomes true.
 *   4. Plays the exit animation when `open` becomes false (before any
 *      Radix unmount fires — timing is handled via a small delay buffer).
 *   5. For non-overlay components (no `open` prop), runs the enter
 *      animation once on mount.
 */

"use client";

import * as React from "react";
import type { MotionProps, MotionPreset, MotionConfig } from "./types";
import { resolveConfig, animate } from "./engine";

// ─── Options ──────────────────────────────────────────────────────────────

export interface WithMotionOptions {
  /**
   * The prop name to watch for open/close state.
   * Default: "open". Set to null to only animate on mount.
   */
  visibleProp?: string | null;
}

// ─── HOC ──────────────────────────────────────────────────────────────────

export function withMotion<
  P extends Record<string, unknown>
>(
  Component: React.ComponentType<P>,
  options: WithMotionOptions = {}
): React.FC<P & MotionProps> {
  const { visibleProp = "open" } = options;

  const MotionWrapped: React.FC<P & MotionProps> = (props) => {
    const { motion, ...rest } = props as P & MotionProps;
    const config = React.useMemo(() => resolveConfig(motion), [motion]);

    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const abortRef   = React.useRef<AbortController | null>(null);

    // Track the open prop value
    const isOpen = visibleProp ? Boolean((rest as Record<string, unknown>)[visibleProp]) : true;
    const prevOpen = React.useRef<boolean>(isOpen);

    // ── Animate on mount (for non-overlay components) ──────────────────
    React.useEffect(() => {
      if (visibleProp !== null) return; // handled by open watcher below
      const el = findFirstElement(wrapperRef.current);
      if (!el) return;

      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;

      el.style.opacity = "0";
      animate({ el, config, phase: "enter", signal: ctrl.signal }).catch(() => {/* silently ignore */});

      return () => { ctrl.abort(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── React to open/close changes ────────────────────────────────────
    React.useEffect(() => {
      if (visibleProp === null) return;
      if (prevOpen.current === isOpen) return;
      prevOpen.current = isOpen;

      const el = findFirstElement(wrapperRef.current);
      if (!el) return;

      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;

      if (isOpen) {
        el.style.opacity = "0";
        animate({ el, config, phase: "enter", signal: ctrl.signal }).catch(() => {/* silently ignore */});
      } else {
        animate({ el, config, phase: "exit", signal: ctrl.signal }).catch(() => {/* silently ignore */});
      }

      return () => { ctrl.abort(); };
    }, [isOpen, config, visibleProp]);

    // If no motion prop, render the component directly (zero overhead)
    if (!motion) {
      return <Component {...(rest as P)} />;
    }

    return (
      <div ref={wrapperRef} style={{ display: "contents" }}>
        <Component {...(rest as P)} />
      </div>
    );
  };

  MotionWrapped.displayName = `withMotion(${
    (Component as { displayName?: string; name?: string }).displayName ||
    (Component as { displayName?: string; name?: string }).name ||
    "Component"
  })`;

  return MotionWrapped;
}

// ─── Helper ────────────────────────────────────────────────────────────────

/**
 * Finds the first actual HTML element inside a `display: contents` wrapper.
 * Walks through shadow roots and portals are ignored (they render elsewhere).
 */
function findFirstElement(wrapper: HTMLElement | null): HTMLElement | null {
  if (!wrapper) return null;
  // display: contents means the wrapper itself has no box — look at children
  const child = wrapper.firstElementChild;
  if (child instanceof HTMLElement) return child;
  return null;
}
