import { useRef, useCallback, useEffect } from "react";

export function useScrollIntoView<T extends HTMLElement>(
  ...dependencies: any[]
) {
  const ref = useRef<T | null>(null);

  const scroll = useCallback(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (dependencies) {
      scroll();
    }
  }, dependencies?.concat(scroll) ?? []);

  return { ref, scroll };
}
