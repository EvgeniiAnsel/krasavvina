export type NavItem = {
  index: string;
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { index: "01", label: "О нас", href: "#about" },
  { index: "02", label: "Услуги", href: "#services" },
  { index: "03", label: "Проекты", href: "#projects" },
  { index: "04", label: "Отзывы", href: "#testimonials" },
  { index: "05", label: "Стоимость", href: "#pricing-v2" },
  { index: "06", label: "Контакты", href: "#contact" },
];
