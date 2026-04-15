export interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  hero: string;
  overview: string;
  problem: string;
  solution: string;
  images?: string[];
}

export const projects: Project[] = [
  {
    slug: "design-system",
    title: "Design System",
    description:
      "A comprehensive component library built for consistency and speed across product teams.",
    tech: ["React", "TypeScript", "Storybook", "Figma"],
    hero: "/projects/design-system.jpg",
    overview:
      "A unified design system that bridges design and engineering, providing a shared language of components, tokens, and patterns.",
    problem:
      "Product teams were building inconsistent interfaces with duplicated effort. There was no single source of truth for UI components.",
    solution:
      "Built a modular component library with strict design tokens, automated visual regression testing, and comprehensive documentation that reduced UI development time significantly.",
    images: [
      "/projects/design-system-1.jpg",
      "/projects/design-system-2.jpg",
    ],
  },
  {
    slug: "dashboard-analytics",
    title: "Dashboard Analytics",
    description:
      "A real-time analytics dashboard with data visualization and intuitive filtering.",
    tech: ["Next.js", "D3.js", "PostgreSQL", "Tailwind"],
    hero: "/projects/dashboard.jpg",
    overview:
      "An analytics platform that transforms complex datasets into clear, actionable insights through thoughtful visualization design.",
    problem:
      "Existing analytics tools were cluttered and overwhelming, making it difficult for teams to extract meaningful insights quickly.",
    solution:
      "Designed and built a minimal dashboard interface with progressive disclosure, real-time updates, and carefully crafted charts that communicate data at a glance.",
    images: ["/projects/dashboard-1.jpg", "/projects/dashboard-2.jpg"],
  },
  {
    slug: "ecommerce-experience",
    title: "E-Commerce Experience",
    description:
      "A premium shopping experience focused on product photography and seamless checkout.",
    tech: ["Next.js", "Stripe", "Framer Motion", "Sanity"],
    hero: "/projects/ecommerce.jpg",
    overview:
      "A high-end e-commerce platform where the product is the hero. Every interaction is designed to feel effortless and premium.",
    problem:
      "Traditional e-commerce interfaces prioritize density over experience, creating friction that reduces conversion and brand perception.",
    solution:
      "Created a visually immersive shopping experience with cinematic product presentations, fluid transitions, and a streamlined checkout flow that increased conversion.",
    images: ["/projects/ecommerce-1.jpg", "/projects/ecommerce-2.jpg"],
  },
  {
    slug: "brand-identity",
    title: "Brand Identity Platform",
    description:
      "A digital brand guideline tool that keeps teams aligned on visual identity.",
    tech: ["React", "Node.js", "AWS S3", "Figma API"],
    hero: "/projects/brand.jpg",
    overview:
      "A living brand platform that ensures consistency across every touchpoint, from marketing to product interfaces.",
    problem:
      "Brand guidelines lived in static PDFs that were outdated the moment they were published. Teams constantly deviated from the intended identity.",
    solution:
      "Built an interactive, always-up-to-date brand platform with live asset management, usage examples, and direct integration with design tools.",
    images: ["/projects/brand-1.jpg", "/projects/brand-2.jpg"],
  },
];
