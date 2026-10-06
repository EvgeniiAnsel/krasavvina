import { useEffect } from "react";
import { useCursor } from "@/hooks/useCursor";
import { useLenis } from "@/hooks/useLenis";

const LOCKED_SELECTOR = "main, header, footer";

/**
 * Блокирует скролл и клики по фону пока открыта модалка / sheet.
 * Без inert — иначе модалки внутри main не закрываются.
 */
export function useModalLock(open: boolean) {
  const { stopScroll, startScroll } = useLenis();
  const { resetCursor } = useCursor();

  useEffect(() => {
    if (!open) return;

    resetCursor();
    stopScroll();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.setAttribute("data-modal-open", "");
    document.documentElement.classList.remove("cursor-none-fine");

    const locked = document.querySelectorAll<HTMLElement>(LOCKED_SELECTOR);
    locked.forEach((el) => el.classList.add("modal-locked"));

    return () => {
      startScroll();
      document.body.style.overflow = prevOverflow;
      document.documentElement.removeAttribute("data-modal-open");

      const fine = window.matchMedia("(pointer: fine)").matches;
      if (fine) document.documentElement.classList.add("cursor-none-fine");

      locked.forEach((el) => el.classList.remove("modal-locked"));
    };
  }, [open, resetCursor, startScroll, stopScroll]);
}
