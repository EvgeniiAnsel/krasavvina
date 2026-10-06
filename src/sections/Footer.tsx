import { navItems } from "@/data/navigation";
import { useLenis } from "@/hooks/useLenis";
import { SteelMarquee } from "@/components/SteelMarquee";

export function Footer() {
  const { scrollTo } = useLenis();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10">
      <div className="surface-steel border-b border-white/10 py-8">
        <SteelMarquee
          items={["Создадим бренд", "Krasavvina Agency", "Брендинг с характером"]}
          duration={28}
        />
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-5 py-14 sm:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#hero", -20);
              }}
              className="font-display text-3xl uppercase tracking-[0.18em]"
            >
              Krasavvina
            </a>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Агентство брендинга и визуальной идентичности.
            </p>
          </div>
          <nav aria-label="Подвал">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.href, -20);
                    }}
                    className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Krasavvina Agency. Все права защищены.</span>
          <span className="kicker">Брендинг · Дизайн · Издания</span>
        </div>
      </div>
    </footer>
  );
}
