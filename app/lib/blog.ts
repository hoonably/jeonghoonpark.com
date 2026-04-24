export const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Study: { bg: "rgba(37,99,235,0.12)", text: "#2563eb" },
  Algorithm: { bg: "rgba(124,58,237,0.12)", text: "#7c3aed" },
  Talk: { bg: "rgba(16,185,129,0.12)", text: "#10b981" },
  Review: { bg: "rgba(245,158,11,0.12)", text: "#f59e0b" },
  Project: { bg: "rgba(239,68,68,0.12)", text: "#ef4444" },
  Tip: { bg: "rgba(236,72,153,0.12)", text: "#db2777" },
  "Paper Review": { bg: "rgba(245,158,11,0.12)", text: "#f59e0b" },
};

export function getCategoryStyle(category: string) {
  return CATEGORY_COLORS[category] ?? { bg: "rgba(100,116,139,0.12)", text: "#64748b" };
}
