import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { motion } from "motion/react";
import { navItems } from "@/data/navigation";
import { useLenis } from "@/hooks/useLenis";
import { useModalLock } from "@/hooks/useModalLock";
import { useCursor } from "@/hooks/useCursor";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollTo } = useLenis();
  const { hover } = useCursor();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useModalLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    scrollTo(href, -40);
  };

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled
          ? "surface-steel border-b border-white/10 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 sm:px-10">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            go("#hero");
          }}
          {...hover("link")}
          className="flex flex-col gap-0.5 leading-none"
          aria-label="Krasavvina Agency — на главную"
        >
          <span className="font-display text-lg tracking-[0.2em] uppercase">
            Krasavvina
          </span>
          <span className="font-display text-lg tracking-[0.2em] uppercase text-muted-foreground">
            Agency
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.href);
                }}
                {...hover("link")}
                className="group flex cursor-pointer items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                <span className="kicker text-[0.6rem] text-ember opacity-60 transition-opacity group-hover:opacity-100">
                  {item.index}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              go("#contact");
            }}
            {...hover("link")}
            className="hidden cursor-pointer bg-[var(--ember)] px-5 py-2.5 text-sm font-medium text-[var(--accent-foreground)] uppercase-wide transition-opacity hover:opacity-90 lg:block"
          >
            Обсудить проект
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Открыть меню"
                className="flex size-11 cursor-pointer items-center justify-center border border-white/15 text-foreground transition-colors hover:bg-white/5 lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="surface-steel flex h-[100svh] max-h-[100svh] flex-col border-white/10 sm:max-w-md"
            >
              <SheetTitle className="kicker shrink-0 px-6 pt-3 text-muted-foreground">
                Навигация
              </SheetTitle>
              <ul className="mt-4 flex min-h-0 flex-1 flex-col overflow-hidden">
                {navItems.map((item) => (
                  <li key={item.href} className="border-t border-white/10 last:border-b">
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        go(item.href);
                      }}
                      className="flex cursor-pointer items-baseline gap-3 px-6 py-4 font-display text-2xl uppercase tracking-tight transition-colors hover:text-ember"
                    >
                      <span className="kicker text-ember text-[0.65rem]">
                        {item.index}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="shrink-0 px-6 pb-6 pt-4">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    go("#contact");
                  }}
                  className="block cursor-pointer bg-[var(--ember)] px-5 py-4 text-center text-sm font-medium text-[var(--accent-foreground)] uppercase-wide"
                >
                  Обсудить проект
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
