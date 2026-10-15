import type { ChecklistTemplate } from "@flat-checker/shared";
import type { ChecklistRepository } from "./checklist.repository.js";

/** In-memory implementation, for tests and the OpenAPI generator. */
export class MemoryChecklistRepository implements ChecklistRepository {
  constructor(private readonly templates: ChecklistTemplate[]) {}

  async latest() {
    return this.templates.reduce<ChecklistTemplate | null>((a, t) => (!a || t.version > a.version ? t : a), null);
  }

  async byVersion(version: number) {
    return this.templates.find((t) => t.version === version) ?? null;
  }
}
