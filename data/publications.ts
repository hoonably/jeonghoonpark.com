import type { Publication } from "@/types";

// Static publications are now replaced by dynamic loading from app/publications/*.md
// See app/actions.ts:getPublicationsAction
export const publications: Publication[] = [];
