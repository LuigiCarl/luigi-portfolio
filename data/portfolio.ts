export type Project = {
  name: string;
  type: "Web" | "Mobile";
  title: string;
  description: string;
  stack: string[];
  features: string[];
  status: string;
  screenshots?: string[];
  screenshotAlt?: string;
  liveUrl?: string;
  backendUrl?: string;
  githubUrl?: string;
  backendGithubUrl?: string;
  evidenceUrl?: string;
  featured?: boolean;
};

export type Skill = {
  title: string;
  icon: "brackets" | "server" | "wrench";
  items: Array<readonly [string, string | null]>;
};

export const skills: Skill[] = [
  {
    title: "Frontend",
    icon: "brackets",
    items: [
      ["React", "react"],
      ["React Native", "react"],
      ["Expo", "expo"],
      ["Next.js", "nextdotjs"],
      ["TypeScript", "typescript"],
      ["JavaScript", "javascript"],
      ["Tailwind CSS", "tailwindcss"],
    ],
  },
  {
    title: "Backend",
    icon: "server",
    items: [
      ["PHP", "php"],
      ["Laravel", "laravel"],
      ["REST API Development", "fastapi"],
    ],
  },
  {
    title: "Developer Tools",
    icon: "wrench",
    items: [
      ["Git", "git"],
      ["GitHub", "github"],
      ["VS Code", null],
      ["Vercel", "vercel"],
      ["AWS EC2", null],
    ],
  },
];

export const projects: Project[] = [
  {
    name: "Labada",
    type: "Mobile",
    title: "Laundry Service & Delivery Management Platform",
    description:
      "A laundry service management platform supporting customers, shop owners, delivery riders, and administrators through mobile and backend workflows.",
    stack: ["Expo", "React Native", "TypeScript", "PHP", "Laravel", "Sanctum", "Reverb"],
    features: ["Role-based workflows", "Pickup and delivery orders", "Order status tracking", "Live rider updates", "Order-scoped chat"],
    status: "Capstone Project · Full-Stack Mobile Application",
    screenshots: ["/projects/labadasc.png"],
    screenshotAlt: "Labada mobile application mockups",
    evidenceUrl: "https://expo.dev/accounts/luigicarl/projects/labada/builds/1ff144ad-ce0c-444c-8997-7af88374d357",
    featured: true,
  },
  {
    name: "FinanEase",
    type: "Web",
    title: "Personal Finance & Budget Management System",
    description:
      "A personal finance management application for tracking income, expenses, budgets, and financial records through a responsive frontend and Laravel backend API.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Recharts", "PHP", "Laravel", "Sanctum", "REST API", "SQL"],
    features: ["Authentication", "Income and expense tracking", "Budget planning", "Financial dashboards", "Transaction management"],
    status: "Full-Stack Web Application",
    screenshots: ["/projects/finanease-landing.png", "/projects/finanease-mobile.jpg"],
    screenshotAlt: "FinanEase landing page and mobile dashboard",
    liveUrl: "https://frontend-budget-tracker.vercel.app/",
    backendUrl: "https://budget-tracker-xpoz.onrender.com",
    githubUrl: "https://github.com/LuigiCarl/FinanEase",
    backendGithubUrl: "https://github.com/LuigiCarl/budget-tracker",
    featured: true,
  },
  {
    name: "GIMATA",
    type: "Web",
    title: "Fisheries Data Visualization Application",
    description:
      "A fisheries data visualization application transforming survey records from Bulan, Sorsogon into interactive maps, seasonal catch dashboards, species profiles, and ecological competition visualizations.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Leaflet", "Recharts", "Zustand", "Vite", "PWA"],
    features: ["Catch-survey maps", "Species and season filters", "Monthly catch charts", "Ecology summaries", "Installable PWA"],
    status: "Web Application · PWA",
    screenshots: ["/projects/gimata-home.png", "/projects/gimata-map.png"],
    screenshotAlt: "GIMATA landing page and interactive map",
    liveUrl: "https://gimata.vercel.app/",
  },
  {
    name: "UNLABEL",
    type: "Web",
    title: "Interactive Educational Website",
    description:
      "An interactive educational website exploring gender stereotypes through visual storytelling, educational content, and interactive experiences.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Three.js", "GSAP", "Motion"],
    features: ["Story-based experiences", "Quizzes and reflection challenges", "Data visualizations", "Legal-information resources", "Pledge generator"],
    status: "Interactive Educational Website",
    screenshots: ["/projects/unlabel-home.png"],
    screenshotAlt: "UNLABEL educational website landing page",
    liveUrl: "https://unlabel-dusky.vercel.app/",
    githubUrl: "https://github.com/LuigiCarl/Unlabel",
  },
];

export const education = [
  {
    period: "Expected 2027",
    school: "Sorsogon State University – Bulan Campus",
    degree: "Bachelor of Science in Information Technology (BSIT)",
    description:
      "Bulan, Sorsogon, Philippines",
  },
];

export const contactLinks = [
  { label: "Email", value: "luigi.brezuela@sorsu.edu.ph", href: "mailto:luigi.brezuela@sorsu.edu.ph", icon: "email" },
  { label: "GitHub", value: "github.com/LuigiCarl", href: "https://github.com/LuigiCarl", icon: "github" },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/luigi-carl-brezuela-317825445",
    href: "https://www.linkedin.com/in/luigi-carl-brezuela-317825445",
    icon: "linkedin",
  },
];
