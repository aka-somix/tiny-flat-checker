import type { ChecklistTemplate, FlatCheckValues } from "@flat-checker/shared";
import { buildFlatCheckDoc, type PdfMeta } from "./buildFlatCheckDoc.js";

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "flat-check";

/** Builds and downloads the PDF. pdfmake (~1 MB with fonts) loads only on first use. */
export async function downloadFlatCheckPdf(template: ChecklistTemplate, meta: PdfMeta, values: FlatCheckValues, date?: Date) {
  const [pdfMakeModule, vfsModule] = await Promise.all([import("pdfmake/build/pdfmake"), import("pdfmake/build/vfs_fonts")]);
  const pdfMake = ("default" in pdfMakeModule ? pdfMakeModule.default : pdfMakeModule) as typeof import("pdfmake/build/pdfmake");
  const vfs = ("default" in vfsModule ? vfsModule.default : vfsModule) as Parameters<typeof pdfMake.addVirtualFileSystem>[0];
  pdfMake.addVirtualFileSystem(vfs);
  await pdfMake.createPdf(buildFlatCheckDoc(template, meta, values, date)).download(`${slug(meta.title)}.pdf`);
}
