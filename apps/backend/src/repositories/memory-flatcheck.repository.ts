import type { CreateFlatCheck, FlatCheck } from "@flat-checker/shared";
import type { FlatCheckRepository } from "./flatcheck.repository.js";

/** In-memory implementation, for tests and the OpenAPI generator. */
export class MemoryFlatCheckRepository implements FlatCheckRepository {
  private readonly rows: (FlatCheck & { userId: string })[] = [];

  constructor(
    private readonly newId: () => string,
    private readonly now: () => string,
  ) {}

  async create(userId: string, input: CreateFlatCheck) {
    const flat: FlatCheck = { ...input, id: this.newId(), createdAt: this.now() };
    this.rows.push({ ...flat, userId });
    return flat;
  }

  async list(userId: string) {
    return this.rows
      .filter((r) => r.userId === userId)
      .reverse()
      .map((r) => ({ id: r.id, templateVersion: r.templateVersion, title: r.meta.title, price: r.meta.price, createdAt: r.createdAt }));
  }

  async get(userId: string, id: string) {
    const row = this.rows.find((r) => r.userId === userId && r.id === id);
    if (!row) return null;
    const { userId: _owner, ...flat } = row;
    return flat;
  }

  async delete(userId: string, id: string) {
    const i = this.rows.findIndex((r) => r.userId === userId && r.id === id);
    if (i === -1) return false;
    this.rows.splice(i, 1);
    return true;
  }
}
