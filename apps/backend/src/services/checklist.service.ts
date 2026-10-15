import type { ChecklistTemplate } from "@flat-checker/shared";
import { NotFoundError } from "../http/errors.js";
import type { ChecklistRepository } from "../repositories/checklist.repository.js";

export class ChecklistService {
  constructor(private readonly checklists: ChecklistRepository) {}

  async current(): Promise<ChecklistTemplate> {
    const template = await this.checklists.latest();
    if (!template) throw new NotFoundError("Checklist", "current");
    return template;
  }

  async byVersion(version: number): Promise<ChecklistTemplate> {
    const template = await this.checklists.byVersion(version);
    if (!template) throw new NotFoundError("Checklist", String(version));
    return template;
  }
}
