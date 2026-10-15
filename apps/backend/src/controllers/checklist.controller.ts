import type { ChecklistTemplate } from "@flat-checker/shared";
import type { ChecklistService } from "../services/checklist.service.js";

export class ChecklistController {
  constructor(private readonly service: ChecklistService) {}

  current(): Promise<ChecklistTemplate> {
    return this.service.current();
  }

  byVersion(version: number): Promise<ChecklistTemplate> {
    return this.service.byVersion(version);
  }
}
