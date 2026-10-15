import { validateValues, type CreateFlatCheck, type FlatCheck, type FlatCheckSummary } from "@flat-checker/shared";
import { HttpError, NotFoundError } from "../http/errors.js";
import type { ChecklistRepository } from "../repositories/checklist.repository.js";
import type { FlatCheckRepository } from "../repositories/flatcheck.repository.js";

export class FlatCheckService {
  constructor(
    private readonly flatchecks: FlatCheckRepository,
    private readonly checklists: ChecklistRepository,
  ) {}

  async create(userId: string, input: CreateFlatCheck): Promise<FlatCheck> {
    const template = await this.checklists.byVersion(input.templateVersion);
    if (!template) throw new HttpError(400, `Unknown checklist version: ${input.templateVersion}`);
    const errors = validateValues(template, input.values);
    if (Object.keys(errors).length > 0) throw new HttpError(400, "Invalid values", errors);
    return this.flatchecks.create(userId, input);
  }

  list(userId: string): Promise<FlatCheckSummary[]> {
    return this.flatchecks.list(userId);
  }

  async get(userId: string, id: string): Promise<FlatCheck> {
    const flat = await this.flatchecks.get(userId, id);
    if (!flat) throw new NotFoundError("Flat check", id);
    return flat;
  }

  async delete(userId: string, id: string): Promise<void> {
    if (!(await this.flatchecks.delete(userId, id))) throw new NotFoundError("Flat check", id);
  }
}
