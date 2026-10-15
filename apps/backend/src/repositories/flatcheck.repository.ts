import type { CreateFlatCheck, FlatCheck, FlatCheckSummary } from "@flat-checker/shared";

/** Every method is scoped to the owner: other users' rows behave as missing. */
export interface FlatCheckRepository {
  create(userId: string, input: CreateFlatCheck): Promise<FlatCheck>;
  list(userId: string): Promise<FlatCheckSummary[]>;
  get(userId: string, id: string): Promise<FlatCheck | null>;
  /** Returns false when nothing was deleted. */
  delete(userId: string, id: string): Promise<boolean>;
}
