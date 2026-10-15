import { FlatCheckMetaSchema, type FlatCheckMeta } from "@flat-checker/shared";
import type { FlatSignErrors, FlatSignValue } from "../../ui/index.js";

/** "250.000", "250,000", "250 000" → 250000; "1234,5" → 1234.5. */
export function parsePrice(text: string): number {
  const cleaned = text.replace(/[^\d.,]/g, "");
  if (/^\d{1,3}([.,]\d{3})+$/.test(cleaned)) return Number(cleaned.replace(/[.,]/g, ""));
  return cleaned ? Number(cleaned.replace(",", ".")) : Number.NaN;
}

export function parseMeta(sign: FlatSignValue): { meta: FlatCheckMeta } | { errors: FlatSignErrors } {
  const link = sign.link.trim();
  const result = FlatCheckMetaSchema.safeParse({
    title: sign.title,
    price: parsePrice(sign.price),
    ...(link ? { link } : {}),
  });
  if (result.success) return { meta: result.data };
  const errors: FlatSignErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if (key === "title") errors.title = "Give the flat a name.";
    if (key === "price") errors.price = "Enter the asking price as a number.";
    if (key === "link") errors.link = "Paste the full link, starting with https://";
  }
  return { errors };
}
