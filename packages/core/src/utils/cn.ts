import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Atlas utility for merging Tailwind classes safely.
 * Combines clsx and tailwind-merge.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Compose multiple event handlers into one.
 */
export function composeEventHandlers<E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {}
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);
    if (
      !checkForDefaultPrevented ||
      !(event as unknown as Event).defaultPrevented
    ) {
      return ourEventHandler?.(event);
    }
  };
}

/**
 * Generate unique IDs for accessibility attributes.
 */
let idCounter = 0;
export function generateId(prefix = "atlas"): string {
  return `${prefix}-${++idCounter}`;
}

/**
 * Safely access window object (SSR-safe).
 */
export const isBrowser = typeof window !== "undefined";

/**
 * Noop function.
 */
export const noop = () => undefined;

/**
 * Check if value is defined.
 */
export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

/**
 * Slot helper for composable components.
 */
export function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  ) as React.ReactElement[];
}

import React from "react";
