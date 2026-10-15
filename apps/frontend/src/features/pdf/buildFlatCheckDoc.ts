import type { ChecklistField, ChecklistTemplate, FlatCheckValue, FlatCheckValues } from "@flat-checker/shared";
import type { Content, TDocumentDefinitions } from "pdfmake/interfaces";
import { toSections } from "../checklist/sections.js";

export interface PdfMeta {
  title: string;
  link?: string;
  price?: number;
}

const INK = "#0b0b0b";
const YELLOW = "#ffcc00";
const MUTED = "#5c4a00";

export function formatAnswer(field: ChecklistField, value: FlatCheckValue | undefined): string {
  if (value === null || value === undefined || value === "") return "Not checked";
  switch (field.type) {
    case "boolean":
      return value ? "Yes" : "No";
    case "rating":
      return `${value} / 5`;
    case "options":
      return field.options.find((o) => o.value === value)?.label ?? String(value);
    case "text":
      return String(value);
  }
}

/** A pdfmake document: the flat's sign, then one table per section, codes matching the app. */
export function buildFlatCheckDoc(
  template: ChecklistTemplate,
  meta: PdfMeta,
  values: FlatCheckValues,
  date: Date = new Date(),
): TDocumentDefinitions {
  const sections = toSections(template);
  const answered = template.fields.filter((f) => formatAnswer(f, values[f.id]) !== "Not checked").length;
  const price = meta.price !== undefined && Number.isFinite(meta.price) ? new Intl.NumberFormat().format(meta.price) : "—";

  const body: Content[] = sections.flatMap((section, i) => [
    {
      table: { widths: ["*"], body: [[{ text: `${i + 1}  ${section.title}`, style: "band" }]] },
      layout: "noBorders",
      margin: [0, 14, 0, 4],
    },
    {
      table: {
        widths: [30, "*", 150],
        body: section.fields.map(({ field, code }) => {
          const answer = formatAnswer(field, values[field.id]);
          return [
            { text: code, bold: true },
            { text: field.label },
            { text: answer, bold: answer !== "Not checked", color: answer === "Not checked" ? MUTED : INK },
          ];
        }),
      },
      layout: { hLineWidth: (row) => (row === 0 ? 0 : 0.5), vLineWidth: () => 0, hLineColor: () => INK, paddingTop: () => 5, paddingBottom: () => 5 },
    },
  ]);

  return {
    info: { title: meta.title || "Flat check" },
    pageMargins: [36, 36, 36, 40],
    defaultStyle: { fontSize: 10, color: INK },
    styles: {
      title: { fontSize: 22, bold: true },
      band: { fontSize: 13, bold: true, color: YELLOW, fillColor: INK, margin: [6, 4, 6, 4] },
    },
    footer: (page, pages) => ({
      text: `Tiny Flat Checker · checklist v${template.version} · page ${page} of ${pages}`,
      alignment: "center",
      fontSize: 8,
      color: MUTED,
    }),
    content: [
      { text: meta.title || "Untitled flat", style: "title" },
      {
        columns: [
          { text: [{ text: "Asking price  ", color: MUTED }, { text: price, bold: true, fontSize: 14 }] },
          { text: `${answered} of ${template.fields.length} checked · ${date.toLocaleDateString()}`, alignment: "right", color: MUTED },
        ],
        margin: [0, 6, 0, 0],
      },
      ...(meta.link ? [{ text: meta.link, link: meta.link, color: INK, decoration: "underline" as const, margin: [0, 4, 0, 0] as [number, number, number, number] }] : []),
      ...body,
    ],
  };
}
