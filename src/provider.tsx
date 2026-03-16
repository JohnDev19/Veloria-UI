/**
 * VeloriaProvider — wrap your app with this once.
 *
 * Covers Toast (needed for useToast) and TooltipProvider (so you don't
 * have to wrap every single Tooltip yourself).
 *
 * Usage in app/layout.tsx:
 *
 *   import { VeloriaProvider } from "veloria-ui/provider";
 *
 *   export default function RootLayout({ children }) {
 *     return (
 *       <html lang="en">
 *         <body>
 *           <VeloriaProvider>{children}</VeloriaProvider>
 *         </body>
 *       </html>
 *     );
 *   }
 *
 * — JohnDev19, Veloria UI
 */

"use client";

import * as React from "react";
import { ToastProvider, ToastViewport } from "./components/feedback";
import { TooltipProvider } from "./components/basic";

export interface VeloriaProviderProps {
  children: React.ReactNode;
  /** How long toasts stay on screen in ms. Default: 5000 */
  toastDuration?: number;
  /** Swipe direction to dismiss toasts. Default: "right" */
  toastSwipeDirection?: "up" | "down" | "left" | "right";
  /** Delay before tooltips open in ms. Default: 300 */
  tooltipDelay?: number;
}

export function VeloriaProvider({
  children,
  toastDuration = 5000,
  toastSwipeDirection = "right",
  tooltipDelay = 300,
}: VeloriaProviderProps) {
  return (
    <ToastProvider duration={toastDuration} swipeDirection={toastSwipeDirection}>
      <TooltipProvider delayDuration={tooltipDelay}>
        {children}
        <ToastViewport />
      </TooltipProvider>
    </ToastProvider>
  );
}