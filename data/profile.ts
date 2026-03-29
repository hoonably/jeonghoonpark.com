// ============================================================
// Profile — edit this file to update personal info
// ============================================================

export const profile = {
  name: "Jeonghoon Park",
  shortName: "Hoon",
  role: "Undergraduate Researcher",
  affiliation: "Computer Science & Engineering · UNIST",
  location: "Ulsan, Republic of Korea",

  bio: [
    "I'm an undergraduate student in the Department of Computer Science and Engineering (CSE) at UNIST, currently serving as a research intern at the Ubiquitous AI Lab under the supervision of Prof. Taesik Gong.",
    "I am particularly interested in On-device AI due to its clear benefits for privacy and personalization. My research focuses on running AI efficiently in hardware-constrained environments.",
  ],

  // Links — leave empty string "" to hide
  email: "hoonably@unist.ac.kr",
  github: "hoonably",
  linkedin: "hoonably",
  googleScholar: "",          // Google Scholar profile ID (leave blank if none)

  // CV link — place file in /public/ or use a hosted link
  cvUrl: "https://drive.google.com/file/d/1I9_mLarky-ie7kCpFxayDdNngEZmmGyG/view?usp=sharing",
} as const;

export type Profile = typeof profile;
