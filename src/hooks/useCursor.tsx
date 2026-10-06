import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CursorVariant = "default" | "view" | "drag" | "link";

type CursorState = {
  variant: CursorVariant;
  label: string;
};

type CursorContextValue = CursorState & {
  setCursor: (state: Partial<CursorState>) => void;
  resetCursor: () => void;
  /** Готовые пропсы для наведения: <a {...cursorHover('view','Смотреть')} /> */
  hover: (variant: CursorVariant, label?: string) => {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
};

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CursorState>({
    variant: "default",
    label: "",
  });

  const setCursor = useCallback((partial: Partial<CursorState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetCursor = useCallback(() => {
    setState({ variant: "default", label: "" });
  }, []);

  const hover = useCallback(
    (variant: CursorVariant, label = "") => ({
      onMouseEnter: () => setState({ variant, label }),
      onMouseLeave: () => setState({ variant: "default", label: "" }),
    }),
    []
  );

  const value = useMemo(
    () => ({ ...state, setCursor, resetCursor, hover }),
    [state, setCursor, resetCursor, hover]
  );

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursor must be used within CursorProvider");
  return ctx;
}
