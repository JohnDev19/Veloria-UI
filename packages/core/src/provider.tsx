/**
 * AtlasUI Provider for Next.js
 *
 * Wrap your app with AtlasProvider to enable:
 *   - Toast notifications
 *   - Theme context
 *   - Tooltip provider
 *
 * Usage in app/layout.tsx:
 *
 *   import { AtlasProvider } from "@atlasui/core/provider";
 *
 *   export default function RootLayout({ children }) {
 *     return (
 *       <html lang="en">
 *         <body>
 *           <AtlasProvider>{children}</AtlasProvider>
 *         </body>
 *       </html>
 *     );
 *   }
 */

"use client";

import * as React from "react";
import { ToastProvider, ToastViewport } from "./components/feedback";
import { TooltipProvider } from "./components/basic";

export interface AtlasProviderProps {
  children: React.ReactNode;
  /** Toast duration in ms (default: 5000) */
  toastDuration?: number;
  /** Toast swipe direction */
  toastSwipeDirection?: "up" | "down" | "left" | "right";
  /** Tooltip open delay in ms (default: 300) */
  tooltipDelay?: number;
}

export function AtlasProvider({
  children,
  toastDuration = 5000,
  toastSwipeDirection = "right",
  tooltipDelay = 300,
}: AtlasProviderProps) {
  return (
    <ToastProvider duration={toastDuration} swipeDirection={toastSwipeDirection}>
      <TooltipProvider delayDuration={tooltipDelay}>
        {children}
        <ToastViewport />
      </TooltipProvider>
    </ToastProvider>
  );
}
