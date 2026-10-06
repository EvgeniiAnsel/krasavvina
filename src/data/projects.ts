export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  /** Арт-дирекшн плейсхолдера — реальные изображения добавим позже. */
  accent: string;
};

export const projects: Project[] = [
  {
    id: "bi-may-ton",
    title: "BE MY TONE",
    category: "Брендинг · Айдентика",
    year: "2025",
    description:
      "Целостная визуальная система с характером и узнаваемостью на конкурентном рынке.",
    accent: "linear-gradient(135deg, oklch(0.46 0.11 35), oklch(0.18 0.01 260))",
  },
  {
    id: "panaveda",
    title: "Panaveda",
    category: "Брендинг · Упаковка",
    year: "2025",
    description:
      "Премиальная айдентика и упаковка, где тактильность материалов работает на восприятие качества.",
    accent: "linear-gradient(135deg, oklch(0.5 0.08 150), oklch(0.17 0.01 260))",
  },
  {
    id: "flower-salon",
    title: "Цветочный салон",
    category: "Айдентика · Носители",
    year: "2024",
    description:
      "Тонкая, светлая система для бренда с эмоцией: фирменный стиль и ключевые носители.",
    accent: "linear-gradient(135deg, oklch(0.56 0.1 350), oklch(0.18 0.01 260))",
  },
  {
    id: "ceramics",
    title: "Керамика",
    category: "Брендинг · Арт-дирекшн",
    year: "2024",
    description:
      "Ремесленный бренд с акцентом на материал и форму: айдентика, фотостиль и упаковка.",
    accent: "linear-gradient(135deg, oklch(0.52 0.09 60), oklch(0.18 0.01 260))",
  },
  {
    id: "calendar",
    title: "Календарь",
    category: "Издание · Дизайн",
    year: "2024",
    description:
      "Авторское издание как имиджевый носитель бренда: концепция, вёрстка и печать.",
    accent: "linear-gradient(135deg, oklch(0.48 0.11 25), oklch(0.17 0.01 260))",
  },
];
