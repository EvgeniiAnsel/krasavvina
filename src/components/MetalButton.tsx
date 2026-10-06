import { type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { useCursor } from "@/hooks/useCursor";
import { cn } from "@/lib/utils";

type MetalButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "ember" | "ghost";
  className?: string;
  withIcon?: boolean;
  ariaLabel?: string;
};

/**
 * Премиальная кнопка: острые углы, ember/ghost, эффект «свет по металлу»
 * на hover без сдвига layout. Влияет на кастомный курсор.
 */
export function MetalButton({
  children,
  onClick,
  href,
  variant = "ember",
  className,
  withIcon = true,
  ariaLabel,
}: MetalButtonProps) {
  const { hover } = useCursor();
  const base =
    "group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden px-8 py-4 text-sm uppercase-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const variants = {
    ember: "bg-[var(--ember)] text-[var(--accent-foreground)]",
    ghost:
      "border border-white/15 text-foreground hover:border-white/40 hover:text-white",
  };

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {withIcon && (
        <ArrowUpRight className="relative z-10 size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
    </>
  );

  const props = {
    className: cn(base, variants[variant], className),
    "aria-label": ariaLabel,
    ...hover("link"),
  };

  if (href) {
    return (
      <a href={href} {...props}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} {...props}>
      {inner}
    </button>
  );
}
