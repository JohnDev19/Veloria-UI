import * as React from "react";

// ─── useDisclosure ─────────────────────────────────────────────────────────

export interface UseDisclosureOptions {
  defaultOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export function useDisclosure(options: UseDisclosureOptions = {}) {
  const [isOpen, setIsOpen] = React.useState(options.defaultOpen ?? false);

  const open = React.useCallback(() => {
    setIsOpen(true);
    options.onOpen?.();
  }, [options]);

  const close = React.useCallback(() => {
    setIsOpen(false);
    options.onClose?.();
  }, [options]);

  const toggle = React.useCallback(() => {
    setIsOpen((prev) => {
      if (prev) options.onClose?.();
      else options.onOpen?.();
      return !prev;
    });
  }, [options]);

  return { isOpen, open, close, toggle, onOpenChange: setIsOpen };
}

// ─── useMediaQuery ─────────────────────────────────────────────────────────

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

// ─── useBreakpoint ─────────────────────────────────────────────────────────

const breakpoints = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
};

export function useBreakpoint(bp: keyof typeof breakpoints): boolean {
  return useMediaQuery(breakpoints[bp]);
}

// ─── useClipboard ──────────────────────────────────────────────────────────

export interface UseClipboardOptions {
  timeout?: number;
}

export function useClipboard(options: UseClipboardOptions = {}) {
  const [copied, setCopied] = React.useState(false);

  const copy = React.useCallback(async (text: string) => {
    if (typeof navigator === "undefined") return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), options.timeout ?? 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), options.timeout ?? 2000);
    }
  }, [options.timeout]);

  return { copy, copied };
}

// ─── useLocalStorage ──────────────────────────────────────────────────────

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = React.useState<T>(() => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const set = React.useCallback((newValue: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const next = typeof newValue === "function" ? (newValue as (p: T) => T)(prev) : newValue;
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch { /* ignore */ }
      return next;
    });
  }, [key]);

  return [value, set];
}

// ─── useTheme ──────────────────────────────────────────────────────────────

export type AtlasTheme = "light" | "dark" | "system";

export function useTheme() {
  const [theme, setThemeState] = useLocalStorage<AtlasTheme>("atlas-theme", "system");

  const resolvedTheme = React.useMemo<"light" | "dark">(() => {
    if (theme === "system") {
      return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return theme;
  }, [theme]);

  const setTheme = React.useCallback((t: AtlasTheme) => {
    setThemeState(t);
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      if (t !== "system") root.classList.add(t);
    }
  }, [setThemeState]);

  return { theme, resolvedTheme, setTheme };
}

// ─── useDebounce ───────────────────────────────────────────────────────────

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ─── useOnClickOutside ────────────────────────────────────────────────────

export function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  React.useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

// ─── useKeydown ───────────────────────────────────────────────────────────

export function useKeydown(
  key: string,
  handler: (event: KeyboardEvent) => void,
  options: { ctrlKey?: boolean; metaKey?: boolean; shiftKey?: boolean; enabled?: boolean } = {}
) {
  React.useEffect(() => {
    if (options.enabled === false) return;
    const listener = (event: KeyboardEvent) => {
      if (event.key !== key) return;
      if (options.ctrlKey && !event.ctrlKey) return;
      if (options.metaKey && !event.metaKey) return;
      if (options.shiftKey && !event.shiftKey) return;
      handler(event);
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [key, handler, options]);
}

// ─── useMounted ───────────────────────────────────────────────────────────

export function useMounted(): boolean {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
}

// ─── useId (safe wrapper) ─────────────────────────────────────────────────

export { useId } from "react";
