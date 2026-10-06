import { cn } from "@/lib/utils";

type KickerProps = {
  index?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "ember" | "fog";
};

/** Моно-кикер в духе editorial: номер + лейбл капсом + ember-черта. */
export function Kicker({
  index,
  children,
  className,
  tone = "fog",
}: KickerProps) {
  return (
    <span className={cn("kicker flex items-center gap-3", className)}>
      {index && <span className="text-ember">{index}</span>}
      <span className={tone === "ember" ? "text-ember" : "text-muted-foreground"}>
        {children}
      </span>
      <span aria-hidden className="h-px w-8 bg-[var(--ember)]/70" />
    </span>
  );
}
