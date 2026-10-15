import type { SupabaseClient } from "@supabase/supabase-js";
import type { CreateFlatCheck, FlatCheck, FlatCheckSummary, FlatCheckValues } from "@flat-checker/shared";
import type { FlatCheckRepository } from "./flatcheck.repository.js";

interface FlatCheckRow {
  id: string;
  template_version: number;
  title: string;
  link: string | null;
  price: number | string;
  answers: FlatCheckValues;
  created_at: string;
}

const FULL = "id, template_version, title, link, price, answers, created_at";
const SUMMARY = "id, template_version, title, price, created_at";

// Postgres returns timestamptz as "2026-10-10T10:00:00.123+00:00"; normalise to ISO Z.
const iso = (ts: string) => new Date(ts).toISOString();

function toFlatCheck(row: FlatCheckRow): FlatCheck {
  return {
    id: row.id,
    templateVersion: row.template_version,
    meta: { title: row.title, price: Number(row.price), ...(row.link ? { link: row.link } : {}) },
    values: row.answers,
    createdAt: iso(row.created_at),
  };
}

function toSummary(row: Omit<FlatCheckRow, "link" | "answers">): FlatCheckSummary {
  return {
    id: row.id,
    templateVersion: row.template_version,
    title: row.title,
    price: Number(row.price),
    createdAt: iso(row.created_at),
  };
}

export class SupabaseFlatCheckRepository implements FlatCheckRepository {
  constructor(private readonly db: SupabaseClient) {}

  async create(userId: string, input: CreateFlatCheck) {
    const { data, error } = await this.db
      .from("flatchecks")
      .insert({
        user_id: userId,
        template_version: input.templateVersion,
        title: input.meta.title,
        link: input.meta.link ?? null,
        price: input.meta.price,
        answers: input.values,
      })
      .select(FULL)
      .single();
    if (error) throw error;
    return toFlatCheck(data as FlatCheckRow);
  }

  async list(userId: string) {
    const { data, error } = await this.db
      .from("flatchecks")
      .select(SUMMARY)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as FlatCheckRow[]).map(toSummary);
  }

  async get(userId: string, id: string) {
    const { data, error } = await this.db
      .from("flatchecks")
      .select(FULL)
      .eq("user_id", userId)
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data ? toFlatCheck(data as FlatCheckRow) : null;
  }

  async delete(userId: string, id: string) {
    const { count, error } = await this.db
      .from("flatchecks")
      .delete({ count: "exact" })
      .eq("user_id", userId)
      .eq("id", id);
    if (error) throw error;
    return (count ?? 0) > 0;
  }
}
