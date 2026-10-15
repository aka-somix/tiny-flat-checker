import type { CreateFlatCheck, FlatCheck, FlatCheckSummary } from "@flat-checker/shared";
import type { AuthUser } from "../auth/token-verifier.js";
import type { FlatCheckService } from "../services/flatcheck.service.js";

export class FlatCheckController {
  constructor(private readonly service: FlatCheckService) {}

  create(user: AuthUser, input: CreateFlatCheck): Promise<FlatCheck> {
    return this.service.create(user.id, input);
  }

  list(user: AuthUser): Promise<FlatCheckSummary[]> {
    return this.service.list(user.id);
  }

  get(user: AuthUser, id: string): Promise<FlatCheck> {
    return this.service.get(user.id, id);
  }

  delete(user: AuthUser, id: string): Promise<void> {
    return this.service.delete(user.id, id);
  }
}
