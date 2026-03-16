import { useLocalStorage } from "./use-local-storage";
import * as React from "react";

export function useTheme() {
  const [theme, setThemeStorage] = useLocalStorage<"light" | "dark" | "system">(
    "veloria-theme",
    "system"
  );

  const setTheme = React.useCallback(
    (t: "light" | "dark" | "system") => {
      setThemeStorage(t);

      // SSR / non-browser guard
      if (typeof document === "undefined") return;

      document.documentElement.classList.remove("light", "dark");

      let resolved: "light" | "dark";
      if (t === "system") {
        // Guard window.matchMedia — it can be null in jsdom / SSR envs
        resolved =
          typeof window !== "undefined" &&
          typeof window.matchMedia === "function" &&
          window.matchMedia("(prefers-color-scheme: dark)") !== null &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
      } else {
        resolved = t;
      }

      document.documentElement.classList.add(resolved);
    },
    [setThemeStorage]
  );

  return { theme, setTheme };
}