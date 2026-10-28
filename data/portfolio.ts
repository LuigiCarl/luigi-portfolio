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
  icon: "brackets" | "server" | "database" | "cloud";
  items: Array<{
    name: string;
    icon: string | null;
    fallback: string;
    color: string;
  }>;
};

export const skills: Skill[] = [
  {
    title: "Frontend",
    icon: "brackets",
    items: [
      { name: "React", icon: "devicon:react", fallback: "Re", color: "#61dafb" },
      { name: "React Native", icon: "devicon:reactnative-wordmark", fallback: "RN", color: "#61dafb" },
      { name: "Expo", icon: "devicon:expo", fallback: "Ex", color: "#ffffff" },
      { name: "Next.js", icon: "devicon:nextjs", fallback: "N", color: "#ffffff" },
      { name: "TypeScript", icon: "devicon:typescript", fallback: "TS", color: "#3178c6" },
      { name: "JavaScript", icon: "devicon:javascript", fallback: "JS", color: "#f7df1e" },
      { name: "Tailwind CSS", icon: "devicon:tailwindcss", fallback: "TW", color: "#38bdf8" },
    ],
  },
  {
    title: "Backend",
    icon: "server",
    items: [
      { name: "PHP", icon: "devicon:php", fallback: "PHP", color: "#777bb4" },
      { name: "Laravel", icon: "devicon:laravel", fallback: "La", color: "#ff2d20" },
      { name: "REST API Development", icon: null, fallback: "API", color: "#a78bfa" },
    ],
  },
  {
    title: "Databases & ORM",
    icon: "database",
    items: [
      { name: "PostgreSQL", icon: "devicon:postgresql", fallback: "PG", color: "#336791" },
      { name: "MySQL", icon: "devicon:mysql", fallback: "SQL", color: "#4479a1" },
      { name: "Drizzle ORM", icon: "simple-icons:drizzle", fallback: "Dr", color: "#c5f74f" },
    ],
  },
  {
    title: "Developer Tools & Cloud",
    icon: "cloud",
    items: [
      { name: "Git", icon: "devicon:git", fallback: "Git", color: "#f05032" },
      { name: "GitHub", icon: "devicon:github", fallback: "GH", color: "#ffffff" },
      { name: "Visual Studio Code", icon: "devicon:vscode", fallback: "VS", color: "#23a8f2" },
      { name: "Vercel", icon: "devicon:vercel", fallback: "V", color: "#ffffff" },
      { name: "AWS EC2", icon: "logos:aws-ec2", fallback: "EC2", color: "#ff9900" },
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
    stack: ["Expo", "React Native", "TypeScript", "PHP", "Laravel", "MySQL"],
    features: ["Role-based workflows", "Pickup and delivery orders", "Order status tracking", "Live rider updates", "Order-scoped chat"],
    status: "Capstone Project · Full-Stack Mobile Application",
    screenshots: ["/projects/labadasc.png"],
    screenshotAlt: "Labada mobile application mockups",
    evidenceUrl: "https://expo.dev/accounts/luigicarl/projects/labada/builds/1ff144ad-ce0c-444c-8997-7af88374d357",
    featured: true,
  },
  {
    name: "DevStash",
    type: "Web",
    title: "Developer Resource Management Platform",
    description:
      "A responsive developer-resource manager for saving, organizing, and quickly finding useful links, with guest access and private authenticated libraries.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    features: ["Resource bookmarking", "Collections and tags", "Guest and private libraries"],
    status: "Full-Stack Web Application",
    screenshots: ["/projects/devstash.png"],
    screenshotAlt: "DevStash developer resource manager landing page",
    liveUrl: "https://devstash-gamma-hazel.vercel.app/",
    githubUrl: "https://github.com/LuigiCarl/devstash",
    featured: true,
  },
  {
    name: "FinanEase",
    type: "Web",
    title: "Personal Finance & Budget Management System",
    description:
      "A personal finance management application for tracking income, expenses, budgets, and financial records through a responsive frontend and Laravel backend API.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "PHP", "Laravel", "REST API", "MySQL"],
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
  {
    label: "Email",
    value: "luigi.brezuela@sorsu.edu.ph",
    href: "mailto:luigi.brezuela@sorsu.edu.ph?subject=Software%20Development%20Internship%20Inquiry%20-%20Luigi%20Carl%20Brezuela",
    icon: "email",
  },
  { label: "Phone", value: "+63 994 286 8565", href: "tel:+639942868565", icon: "phone" },
  { label: "GitHub", value: "github.com/LuigiCarl", href: "https://github.com/LuigiCarl", icon: "github" },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/luigi-carl-brezuela-317825445",
    href: "https://www.linkedin.com/in/luigi-carl-brezuela-317825445",
    icon: "linkedin",
  },
];
