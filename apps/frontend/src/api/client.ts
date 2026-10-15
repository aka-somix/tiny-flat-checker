import type {
  ChecklistTemplate,
  CreateFlatCheck,
  FlatCheck,
  FlatCheckSummary,
  HealthResponse,
} from "@flat-checker/shared";
import { getAccessToken } from "./supabase.js";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";
const API_KEY = import.meta.env.VITE_API_KEY ?? "";

/** `public` sends the web app API key, `private` the Supabase access token. */
type Access = "open" | "public" | "private";

async function request<T>(path: string, access: Access, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = { ...(init?.headers as Record<string, string> | undefined) };
  if (init?.body) headers["Content-Type"] = "application/json";
  if (access === "public") headers["x-api-key"] = API_KEY;
  if (access === "private") {
    const token = await getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${BASE_URL}${path}`, { ...init, headers });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = (await res.json()) as { error?: string };
      if (body.error) message = body.error;
    } catch {
      /* ignore non-JSON error bodies */
    }
    throw new Error(message);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const api = {
  getHealth: () => request<HealthResponse>("/health", "open"),
  getChecklist: (version: number | "current") =>
    request<ChecklistTemplate>(`/public/checklists/${version}`, "public"),
  listFlatChecks: () => request<FlatCheckSummary[]>("/private/flatchecks", "private"),
  getFlatCheck: (id: string) => request<FlatCheck>(`/private/flatchecks/${id}`, "private"),
  createFlatCheck: (input: CreateFlatCheck) =>
    request<FlatCheck>("/private/flatchecks", "private", { method: "POST", body: JSON.stringify(input) }),
  deleteFlatCheck: (id: string) => request<void>(`/private/flatchecks/${id}`, "private", { method: "DELETE" }),
};
