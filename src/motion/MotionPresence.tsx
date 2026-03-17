/**
 * veloria-ui/motion — <MotionPresence>
 *
 * Manages enter and exit animations for children that mount/unmount.
 * When a child is removed from the tree, MotionPresence plays its exit
 * animation before actually removing it from the DOM.
 *
 * Usage:
 *   <MotionPresence motion="fade-scale">
 *     {isOpen && <MyPanel key="panel" />}
 *   </MotionPresence>
 *
 * The child MUST have a stable `key` prop so MotionPresence can detect
 * when it has been removed and replaced.
 *
 * The child must accept a `ref` (use React.forwardRef or a native element).
 */

"use client";

import * as React from "react";
import type { MotionPresenceProps, MotionPreset, MotionConfig } from "./types";
import { resolveConfig, animate } from "./engine";

// ─── Internal state ────────────────────────────────────────────────────────

type PresenceState = "mounting" | "mounted" | "exiting" | "exited";

interface PresenceItem {
  key:     React.Key;
  element: React.ReactElement;
  state:   PresenceState;
  nodeRef: React.RefObject<HTMLElement | null>;
}

// ─── MotionPresence ────────────────────────────────────────────────────────

export function MotionPresence({
  children,
  motion,
  onExitComplete,
}: MotionPresenceProps) {
  const config = React.useMemo(() => resolveConfig(motion), [motion]);

  // Track current and exiting items
  const [items, setItems] = React.useState<PresenceItem[]>(() => {
    if (!children) return [];
    return [makeItem(children, config)];
  });

  // When children change, reconcile the item list
  React.useEffect(() => {
    setItems((prev) => {
      const nextChild  = children;
      const nextKey    = nextChild ? nextChild.key ?? "__default__" : null;
      const prevItem   = prev[0];
      const prevKey    = prevItem?.key ?? null;

      // Same key — no change
      if (nextKey === prevKey && nextChild) return prev;

      // Child removed — start exit on existing item
      if (!nextChild && prevItem && prevItem.state !== "exiting" && prevItem.state !== "exited") {
        return [{ ...prevItem, state: "exiting" }];
      }

      // Child added / replaced
      if (nextChild) {
        const newItem = makeItem(nextChild, config);
        if (prevItem && prevItem.state !== "exited") {
          // Outgoing item exists — exit it, then mount the new one
          return [{ ...prevItem, state: "exiting" }, newItem];
        }
        return [newItem];
      }

      return prev;
    });
  }, [children, config]);

  // Run animations when item state changes
  React.useEffect(() => {
    items.forEach((item) => {
      const el = item.nodeRef.current;
      if (!el) return;

      if (item.state === "mounting") {
        el.style.opacity = "0";
        animate({ el, config, phase: "enter" })
          .then(() => {
            setItems((prev) =>
              prev.map((i) => i.key === item.key ? { ...i, state: "mounted" } : i)
            );
          })
          .catch(() => {/* silently ignore */});

        // Mark as mounted so we don't re-run
        setItems((prev) =>
          prev.map((i) => i.key === item.key && i.state === "mounting" ? { ...i, state: "mounted" } : i)
        );
      }

      if (item.state === "exiting") {
        animate({ el, config, phase: "exit" })
          .then(() => {
            setItems((prev) => prev.filter((i) => i.key !== item.key));
            onExitComplete?.();
          })
          .catch(() => {/* silently ignore */});

        // Prevent re-triggering
        setItems((prev) =>
          prev.map((i) => i.key === item.key && i.state === "exiting" ? { ...i, state: "exited" } : i)
        );
      }
    });
  }, [items, config, onExitComplete]);

  return (
    <>
      {items
        .filter((i) => i.state !== "exited")
        .map((item) =>
          React.cloneElement(item.element, {
            ref: item.nodeRef,
          })
        )}
    </>
  );
}

// ─── Helper ────────────────────────────────────────────────────────────────

function makeItem(
  element: React.ReactElement,
  _config: ReturnType<typeof resolveConfig>
): PresenceItem {
  return {
    key:     element.key ?? "__default__",
    element,
    state:   "mounting",
    nodeRef: React.createRef<HTMLElement | null>(),
  };
}
