// Shared TypeScript types for the site

export interface Publication {
  title: string;
  authors: string;            // full author string, bold your name in the component
  venue: string;              // e.g. "CVPR 2025" or "arXiv 2025"
  year: number;
  type: "conference" | "workshop" | "preprint" | "journal";
  badge?: string;             // short label: "Oral", "Best Paper", etc.
  abstract?: string;
  links?: {
    paper?: string;
    arxiv?: string;
    code?: string;
    poster?: string;
    project?: string;
  };
  slug?: string;
  content?: string;
}

export interface Project {
  title: string;
  description: string;
  period: string;             // e.g. "2025.10 – 2025.12"
  tech: string[];
  award?: string;             // e.g. "🏆 1st Place"
  image?: string;
  links?: {
    github?: string;
    demo?: string;            // project/demo page
    demoLabel?: string;       // custom label like "Report" or "Link"
    page?: string;
    pdf?: string;
  };
  slug?: string;
  content?: string;
}

export interface Experience {
  org: string;                // organization name
  orgUrl?: string;
  location: string;
  role: string;
  period: string;
  image?: string;
  bullets: string[];
}

export interface Education {
  school: string;
  schoolUrl?: string;
  location: string;
  degree: string;
  period: string;
  image?: string;
  bullets: string[];
}

export interface TeachingItem {
  title: string;
  org: string;
  period: string;
  category?: string;
  description?: string;
  slug?: string;
  content?: string;
}

export interface NavItem {
  label: string;
  href: string;               // "#section-id" or "/page"
  external?: boolean;
}
