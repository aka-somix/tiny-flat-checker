import type { ChecklistTemplate } from "@flat-checker/shared";
import type { AuthUser, TokenVerifier } from "../auth/token-verifier.js";
import { createContainer, memoryDeps } from "../container.js";

export const API_KEY = "test-key";
export const ALICE: AuthUser = { id: "11111111-1111-4111-8111-111111111111", email: "alice@example.com" };
export const BOB: AuthUser = { id: "22222222-2222-4222-8222-222222222222", email: "bob@example.com" };

export const TEMPLATES: ChecklistTemplate[] = [
  { version: 1, fields: [{ id: "cracks", label: "No cracks", section: "Structure", type: "boolean" }] },
  {
    version: 2,
    fields: [
      { id: "cracks", label: "No cracks", section: "Structure", type: "boolean" },
      { id: "light", label: "Natural light", section: "Light", type: "rating" },
      {
        id: "heating",
        label: "Heating",
        section: "Heating",
        type: "options",
        options: [
          { value: "gas", label: "Gas" },
          { value: "heat_pump", label: "Heat pump" },
        ],
      },
    ],
  },
];

/** Accepts the bearer token `token-<user id>` for Alice and Bob. */
const fakeVerifier: TokenVerifier = {
  async verify(token) {
    const user = [ALICE, BOB].find((u) => token === `token-${u.id}`);
    if (!user) throw new Error("bad token");
    return user;
  },
};

export function bearer(user: AuthUser): Record<string, string> {
  return { authorization: `Bearer token-${user.id}` };
}

export function testContainer() {
  let n = 0;
  return createContainer({
    ...memoryDeps({
      templates: TEMPLATES,
      apiKeys: { [API_KEY]: "webapp" },
      newId: () => `00000000-0000-4000-8000-${String(++n).padStart(12, "0")}`,
      now: () => "2026-10-10T10:00:00.000Z",
    }),
    tokenVerifier: fakeVerifier,
  });
}
