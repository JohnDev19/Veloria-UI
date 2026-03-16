import * as React from "react";

// ─── useDisclosure ─────────────────────────────────────────────────────────

export interface UseDisclosureOptions {
  defaultOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

/**
 * Manages open/close state for modals, drawers, popovers — anything
 * that needs to toggle. Returns stable callbacks so child components
 * don't re-render on every parent render.
 */
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

/**
 * Subscribes to a CSS media query and returns whether it currently matches.
 * SSR-safe — returns false on the server.
 */
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

/**
 * Returns true when the viewport is at or above the given Tailwind breakpoint.
 *
 * @example
 * const isDesktop = useBreakpoint("lg");
 */
export function useBreakpoint(bp: keyof typeof breakpoints): boolean {
  return useMediaQuery(breakpoints[bp]);
}

// ─── useClipboard ──────────────────────────────────────────────────────────

export interface UseClipboardOptions {
  timeout?: number;
}

/**
 * Copies text to the clipboard and briefly flips `copied` to true.
 * Falls back to execCommand for older browsers (looking at you, Safari).
 *
 * @example
 * const { copy, copied } = useClipboard();
 * <button onClick={() => copy(code)}>{copied ? "Copied!" : "Copy"}</button>
 */
export function useClipboard({ timeout = 2000 }: UseClipboardOptions = {}) {
  const [copied, setCopied] = React.useState(false);

  const copy = React.useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const el = document.createElement("textarea");
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    },
    [timeout]
  );

  return { copy, copied };
}

// ─── useLocalStorage ───────────────────────────────────────────────────────

/**
 * Persistent useState that syncs to localStorage.
 * SSR-safe — returns the default value on the server.
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = React.useState<T>(() => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? (JSON.parse(stored) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const set = React.useCallback(
    (newValue: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const next =
          typeof newValue === "function"
            ? (newValue as (p: T) => T)(prev)
            : newValue;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch { /* quota exceeded or private mode — silently ignore */ }
        return next;
      });
    },
    [key]
  );

  return [value, set] as const;
}

// ─── useTheme ──────────────────────────────────────────────────────────────

export type VeloriaTheme = "light" | "dark" | "system";

/**
 * Read and set the current Veloria UI theme.
 * Persists the selection to localStorage under "veloria-theme".
 * Applies the "dark" class to <html> so Tailwind's dark: utilities kick in.
 *
 * @example
 * const { theme, setTheme } = useTheme();
 * <button onClick={() => setTheme("dark")}>Go dark</button>
 */
export function useTheme() {
  const [theme, setThemeState] = useLocalStorage<VeloriaTheme>("veloria-theme", "system");

  const resolvedTheme = React.useMemo<"light" | "dark">(() => {
    if (theme === "system") {
      return typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-color-scheme: dark)") !== null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return theme;
  }, [theme]);

  const setTheme = React.useCallback(
    (t: VeloriaTheme) => {
      setThemeState(t);
      if (typeof document !== "undefined") {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        if (t !== "system") root.classList.add(t);
      }
    },
    [setThemeState]
  );

  return { theme, resolvedTheme, setTheme };
}

// ─── useDebounce ───────────────────────────────────────────────────────────

/**
 * Delays updating the returned value until `delay` ms have passed
 * without the input changing. Classic use case: search inputs.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ─── useOnClickOutside ────────────────────────────────────────────────────

/**
 * Fires the handler when a click happens outside of the ref'd element.
 * Used heavily inside Veloria UI popovers, dropdowns, and comboboxes.
 */
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

/**
 * Attaches a keydown listener to window for the given key.
 * Supports modifier keys: ctrl, alt, shift, meta.
 *
 * @example
 * useKeydown("k", { meta: true }, () => openCommandPalette());
 */
export interface UseKeydownOptions {
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean;
}

export function useKeydown(
  key: string,
  options: UseKeydownOptions | (() => void),
  handler?: () => void
) {
  const opts = typeof options === "function" ? {} : options;
  const cb   = typeof options === "function" ? options : handler ?? (() => undefined);

  React.useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== key.toLowerCase()) return;
      if (opts.ctrl  && !e.ctrlKey)  return;
      if (opts.alt   && !e.altKey)   return;
      if (opts.shift && !e.shiftKey) return;
      if (opts.meta  && !e.metaKey)  return;
      e.preventDefault();
      cb();
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [key, opts.ctrl, opts.alt, opts.shift, opts.meta, cb]);
}

// ─── useMounted ───────────────────────────────────────────────────────────

/**
 * Returns true after the component has mounted on the client.
 * Use to avoid SSR hydration mismatches.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
}

// ─── useId ────────────────────────────────────────────────────────────────

let _id = 0;
/**
 * Generates a stable unique ID. Falls back to React.useId if available.
 */
export function useId(prefix = "veloria"): string {
  const [id] = React.useState(() => `${prefix}-${++_id}`);
  return id;
}

// ─── useForm ──────────────────────────────────────────────────────────────

export interface UseFormOptions<T extends Record<string, unknown>> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit?: (values: T) => void | Promise<void>;
}

export interface UseFormReturn<T extends Record<string, unknown>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  setValue: (field: keyof T, value: T[keyof T]) => void;
  setTouched: (field: keyof T) => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  reset: () => void;
}

export function useForm<T extends Record<string, unknown>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = React.useState<T>(initialValues);
  const [errors, setErrors] = React.useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouchedState] = React.useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const setValue = React.useCallback((field: keyof T, value: T[keyof T]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const setTouched = React.useCallback((field: keyof T) => {
    setTouchedState((prev) => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = React.useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    const validationErrors = validate?.(values) ?? {};
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setIsSubmitting(true);
    try { await onSubmit?.(values); } finally { setIsSubmitting(false); }
  }, [values, validate, onSubmit]);

  const reset = React.useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouchedState({});
  }, [initialValues]);

  return { values, errors, touched, isSubmitting, setValue, setTouched, handleSubmit, reset };
}

// ─── usePagination ────────────────────────────────────────────────────────

export interface UsePaginationOptions {
  total: number;
  pageSize?: number;
  initialPage?: number;
}

export interface UsePaginationReturn {
  page: number;
  pageSize: number;
  totalPages: number;
  from: number;
  to: number;
  hasPrev: boolean;
  hasNext: boolean;
  setPage: (p: number) => void;
  prevPage: () => void;
  nextPage: () => void;
}

export function usePagination({ total, pageSize = 10, initialPage = 1 }: UsePaginationOptions): UsePaginationReturn {
  const [page, setPageState] = React.useState(initialPage);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const setPage = React.useCallback((p: number) => setPageState(Math.min(Math.max(1, p), totalPages)), [totalPages]);
  return {
    page, pageSize, totalPages,
    from: Math.min((page - 1) * pageSize + 1, total),
    to:   Math.min(page * pageSize, total),
    hasPrev: page > 1,
    hasNext: page < totalPages,
    setPage,
    prevPage: () => setPage(page - 1),
    nextPage: () => setPage(page + 1),
  };
}

// ─── useIntersection ──────────────────────────────────────────────────────

export interface UseIntersectionOptions extends IntersectionObserverInit {
  once?: boolean;
}

export function useIntersection<T extends Element>(
  ref: React.RefObject<T>,
  options: UseIntersectionOptions = {}
): boolean {
  const { once, ...observerOptions } = options;
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (once && entry.isIntersecting) observer.disconnect();
    }, observerOptions);
    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, once]);

  return isIntersecting;
}

// ─── useWindowSize ────────────────────────────────────────────────────────

export interface WindowSize { width: number; height: number; }

export function useWindowSize(): WindowSize {
  const [size, setSize] = React.useState<WindowSize>({ width: 0, height: 0 });
  React.useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

// ─── useStep ──────────────────────────────────────────────────────────────

export interface UseStepOptions { steps: number; initialStep?: number; }
export interface UseStepReturn {
  step: number; totalSteps: number; isFirst: boolean; isLast: boolean;
  progress: number; next: () => void; prev: () => void; goTo: (s: number) => void;
}

export function useStep({ steps, initialStep = 1 }: UseStepOptions): UseStepReturn {
  const [step, setStep] = React.useState(initialStep);
  const goTo = React.useCallback((s: number) => setStep(Math.min(Math.max(1, s), steps)), [steps]);
  return {
    step, totalSteps: steps,
    isFirst: step === 1, isLast: step === steps,
    progress: Math.round(((step - 1) / (steps - 1)) * 100),
    next: () => goTo(step + 1), prev: () => goTo(step - 1), goTo,
  };
}

// ─── useCountdown ─────────────────────────────────────────────────────────

export interface UseCountdownOptions { seconds: number; onEnd?: () => void; }
export interface UseCountdownReturn {
  remaining: number; isRunning: boolean;
  start: () => void; pause: () => void; reset: () => void;
}

export function useCountdown({ seconds, onEnd }: UseCountdownOptions): UseCountdownReturn {
  const [remaining, setRemaining] = React.useState(seconds);
  const [isRunning, setIsRunning] = React.useState(false);

  React.useEffect(() => {
    if (!isRunning) return;
    if (remaining <= 0) { setIsRunning(false); onEnd?.(); return; }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [isRunning, remaining, onEnd]);

  return {
    remaining, isRunning,
    start: () => setIsRunning(true),
    pause: () => setIsRunning(false),
    reset: () => { setIsRunning(false); setRemaining(seconds); },
  };
}