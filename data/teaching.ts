import type { TeachingItem } from "@/types";

// Static teaching items are now replaced by dynamic loading from app/teaching/*.md
// See app/actions.ts:getTeachingAction
export const teachingItems: TeachingItem[] = [];
