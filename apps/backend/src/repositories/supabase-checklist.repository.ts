import type { SupabaseClient } from "@supabase/supabase-js";
import { ChecklistTemplateSchema, type ChecklistTemplate } from "@flat-checker/shared";
import type { ChecklistRepository } from "./checklist.repository.js";

interface TemplateRow {
  version: number;
  fields: unknown;
}

const toTemplate = (row: TemplateRow): ChecklistTemplate => ChecklistTemplateSchema.parse(row);

export class SupabaseChecklistRepository implements ChecklistRepository {
  constructor(private readonly db: SupabaseClient) {}

  async latest() {
    const { data, error } = await this.db
      .from("checklist_templates")
      .select("version, fields")
      .order("version", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return data ? toTemplate(data as TemplateRow) : null;
  }

  async byVersion(version: number) {
    const { data, error } = await this.db
      .from("checklist_templates")
      .select("version, fields")
      .eq("version", version)
      .maybeSingle();
    if (error) throw error;
    return data ? toTemplate(data as TemplateRow) : null;
  }
}
