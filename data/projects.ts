// ============================================================
// Projects
// ============================================================

import type { Project } from "@/types";

// Static projects are now replaced by dynamic loading from app/projects/*.md
// See app/actions.ts:getProjectsAction
export const projects: Project[] = [];
