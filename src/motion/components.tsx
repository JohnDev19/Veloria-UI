/**
 * veloria-ui/motion — pre-wrapped Veloria UI components
 *
 * These are ready-to-use motion-enhanced versions of the most common
 * Veloria UI components. Import them instead of the base component
 * when you want the `motion` prop.
 *
 * Usage:
 *   import { MotionModal, MotionDrawer, MotionCard } from "veloria-ui/motion";
 *
 *   <MotionModal motion="fade-scale" open={isOpen} onOpenChange={setOpen} title="Hello" />
 *   <MotionDrawer motion="slide-left" open={isOpen} onOpenChange={setOpen} side="left" />
 *   <MotionCard motion={{ preset: "fade-up", delay: 150 }}>Content</MotionCard>
 *
 * Each wrapper is created with withMotion() — zero runtime cost if you
 * don't pass the `motion` prop.
 *
 * NOTE: These wrappers import from "veloria-ui" (the installed package).
 * If you have copied the components locally via `veloria-ui add`, update
 * the imports to point to your local copies instead:
 *
 *   import { Modal } from "@/components/ui/modal";
 *   import { withMotion } from "veloria-ui/motion";
 *   export const MotionModal = withMotion(Modal);
 */

"use client";

// ── Overlay components ────────────────────────────────────────────────────

// We use lazy imports so that unused wrappers are fully tree-shaken.
// Each withMotion() call is < 1 line — cost is only the underlying component.

import { withMotion }    from "./withMotion";

// We import types here only — the actual components come from veloria-ui.
// Tree-shaking ensures unused components are dropped from the bundle.
import type {
  // These are just type-level imports — no runtime cost for unused ones.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ComponentType,
} from "react";

// ── Lazy component wrappers ───────────────────────────────────────────────
//
// We wrap lazily to avoid pulling in all components if only one is used.
// Each export is a factory that memoises the wrapped version.

let _MotionModal: ReturnType<typeof withMotion> | undefined;
let _MotionDrawer: ReturnType<typeof withMotion> | undefined;
let _MotionSheet: ReturnType<typeof withMotion> | undefined;
let _MotionDialog: ReturnType<typeof withMotion> | undefined;
let _MotionToast: ReturnType<typeof withMotion> | undefined;
let _MotionSnackbar: ReturnType<typeof withMotion> | undefined;
let _MotionCard: ReturnType<typeof withMotion> | undefined;
let _MotionAlert: ReturnType<typeof withMotion> | undefined;
let _MotionBannerAlert: ReturnType<typeof withMotion> | undefined;
let _MotionPopover: ReturnType<typeof withMotion> | undefined;
let _MotionHoverCard: ReturnType<typeof withMotion> | undefined;

// ── Overlay — open/close driven ──────────────────────────────────────────

export function getMotionModal() {
  if (!_MotionModal) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Modal } = require("veloria-ui") as { Modal: React.ComponentType<Record<string, unknown>> };
    _MotionModal = withMotion(Modal, { visibleProp: "open" });
  }
  return _MotionModal!;
}

export function getMotionDrawer() {
  if (!_MotionDrawer) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Drawer } = require("veloria-ui") as { Drawer: React.ComponentType<Record<string, unknown>> };
    _MotionDrawer = withMotion(Drawer, { visibleProp: "open" });
  }
  return _MotionDrawer!;
}

export function getMotionSheet() {
  if (!_MotionSheet) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Sheet } = require("veloria-ui") as { Sheet: React.ComponentType<Record<string, unknown>> };
    _MotionSheet = withMotion(Sheet, { visibleProp: "open" });
  }
  return _MotionSheet!;
}

export function getMotionDialog() {
  if (!_MotionDialog) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Dialog } = require("veloria-ui") as { Dialog: React.ComponentType<Record<string, unknown>> };
    _MotionDialog = withMotion(Dialog, { visibleProp: "open" });
  }
  return _MotionDialog!;
}

export function getMotionPopover() {
  if (!_MotionPopover) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Popover } = require("veloria-ui") as { Popover: React.ComponentType<Record<string, unknown>> };
    _MotionPopover = withMotion(Popover, { visibleProp: "open" });
  }
  return _MotionPopover!;
}

export function getMotionHoverCard() {
  if (!_MotionHoverCard) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { HoverCard } = require("veloria-ui") as { HoverCard: React.ComponentType<Record<string, unknown>> };
    _MotionHoverCard = withMotion(HoverCard, { visibleProp: "open" });
  }
  return _MotionHoverCard!;
}

// ── Feedback — open driven ────────────────────────────────────────────────

export function getMotionToast() {
  if (!_MotionToast) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Toast } = require("veloria-ui") as { Toast: React.ComponentType<Record<string, unknown>> };
    _MotionToast = withMotion(Toast, { visibleProp: "open" });
  }
  return _MotionToast!;
}

export function getMotionSnackbar() {
  if (!_MotionSnackbar) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Snackbar } = require("veloria-ui") as { Snackbar: React.ComponentType<Record<string, unknown>> };
    _MotionSnackbar = withMotion(Snackbar, { visibleProp: "open" });
  }
  return _MotionSnackbar!;
}

export function getMotionBannerAlert() {
  if (!_MotionBannerAlert) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { BannerAlert } = require("veloria-ui") as { BannerAlert: React.ComponentType<Record<string, unknown>> };
    _MotionBannerAlert = withMotion(BannerAlert, { visibleProp: "open" });
  }
  return _MotionBannerAlert!;
}

// ── Data Display — mount-only ─────────────────────────────────────────────

export function getMotionCard() {
  if (!_MotionCard) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Card } = require("veloria-ui") as { Card: React.ComponentType<Record<string, unknown>> };
    _MotionCard = withMotion(Card, { visibleProp: null });
  }
  return _MotionCard!;
}

export function getMotionAlert() {
  if (!_MotionAlert) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Alert } = require("veloria-ui") as { Alert: React.ComponentType<Record<string, unknown>> };
    _MotionAlert = withMotion(Alert, { visibleProp: null });
  }
  return _MotionAlert!;
}

// ── Convenience re-export as named components ─────────────────────────────
//
// These are the idiomatic imports. They resolve lazily on first use.
//
// Import:  import { MotionModal, MotionCard } from "veloria-ui/motion";

import * as React from "react";
import type { MotionProps } from "./types";

// Overlay
export const MotionModal      = React.memo((p: Record<string, unknown> & MotionProps) => React.createElement(getMotionModal(), p));
export const MotionDrawer     = React.memo((p: Record<string, unknown> & MotionProps) => React.createElement(getMotionDrawer(), p));
export const MotionSheet      = React.memo((p: Record<string, unknown> & MotionProps) => React.createElement(getMotionSheet(), p));
export const MotionDialog     = React.memo((p: Record<string, unknown> & MotionProps) => React.createElement(getMotionDialog(), p));
export const MotionPopover    = React.memo((p: Record<string, unknown> & MotionProps) => React.createElement(getMotionPopover(), p));
export const MotionHoverCard  = React.memo((p: Record<string, unknown> & MotionProps) => React.createElement(getMotionHoverCard(), p));

// Feedback
export const MotionToast       = React.memo((p: Record<string, unknown> & MotionProps) => React.createElement(getMotionToast(), p));
export const MotionSnackbar    = React.memo((p: Record<string, unknown> & MotionProps) => React.createElement(getMotionSnackbar(), p));
export const MotionBannerAlert = React.memo((p: Record<string, unknown> & MotionProps) => React.createElement(getMotionBannerAlert(), p));

// Data Display (mount-triggered)
export const MotionCard  = React.memo((p: Record<string, unknown> & MotionProps) => React.createElement(getMotionCard(), p));
export const MotionAlert = React.memo((p: Record<string, unknown> & MotionProps) => React.createElement(getMotionAlert(), p));

// Display names for React DevTools
MotionModal.displayName      = "MotionModal";
MotionDrawer.displayName     = "MotionDrawer";
MotionSheet.displayName      = "MotionSheet";
MotionDialog.displayName     = "MotionDialog";
MotionPopover.displayName    = "MotionPopover";
MotionHoverCard.displayName  = "MotionHoverCard";
MotionToast.displayName      = "MotionToast";
MotionSnackbar.displayName   = "MotionSnackbar";
MotionBannerAlert.displayName = "MotionBannerAlert";
MotionCard.displayName       = "MotionCard";
MotionAlert.displayName      = "MotionAlert";
