import type { ChecklistTemplate } from "@flat-checker/shared";

export interface ChecklistRepository {
  latest(): Promise<ChecklistTemplate | null>;
  byVersion(version: number): Promise<ChecklistTemplate | null>;
}
