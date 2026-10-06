import { services } from "@/data/services";
import { Kicker } from "@/components/Kicker";
import { Reveal } from "@/components/Reveal";
import { useCursor } from "@/hooks/useCursor";

export function Services() {
  const { hover } = useCursor();

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-5 sm:px-10 md:grid-cols-12">
        {/* Sticky-колонка заголовка */}
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <Kicker index="02" className="mb-8">
              Услуги
            </Kicker>
            <h2 className="font-display display-tight text-[clamp(2.4rem,5vw,4.5rem)] uppercase">
              Что мы
              <br />
              <span className="text-ember">делаем</span>
            </h2>
            <p className="mt-6 max-w-xs text-muted-foreground">
              Три направления, в которых мы доводим бренд до целостной системы.
            </p>
          </div>
        </div>

        {/* Список услуг */}
        <div className="md:col-span-8">
          <div className="flex flex-col border-t border-white/10">
            {services.map((service) => (
              <Reveal
                key={service.index}
                as="div"
                className="group border-b border-white/10 py-10"
                {...hover("view", "Подробнее")}
              >
                <div className="flex items-baseline gap-5">
                  <span className="kicker text-ember">{service.index}</span>
                  <h3 className="font-display text-3xl uppercase tracking-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-5xl">
                    {service.title}
                  </h3>
                </div>
                <div className="mt-6 grid gap-6 pl-0 sm:grid-cols-2 sm:pl-12">
                  <p className="text-muted-foreground sm:text-lg">
                    {service.summary}
                  </p>
                  <ul className="flex flex-col gap-3">
                    {service.scope.map((s) => (
                      <li
                        key={s}
                        className="flex items-center gap-3 border-b border-white/5 pb-3 text-sm"
                      >
                        <span className="size-1.5 shrink-0 bg-[var(--ember)]" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
