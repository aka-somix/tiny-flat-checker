import {
  BrickWall,
  Building2,
  ClipboardCheck,
  CookingPot,
  DoorOpen,
  Droplets,
  FileText,
  Leaf,
  MapPin,
  NotebookPen,
  Sun,
  Thermometer,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { ChecklistTemplate } from "@flat-checker/shared";
import type { ChecklistSectionData } from "../../ui/index.js";

const ICONS: Record<string, LucideIcon> = {
  Structure: BrickWall,
  "Windows & doors": DoorOpen,
  Plumbing: Droplets,
  Electrical: Zap,
  "Heating & cooling": Thermometer,
  Energy: Leaf,
  Kitchen: CookingPot,
  "Light & noise": Sun,
  Building: Building2,
  Documents: FileText,
  Surroundings: MapPin,
  Notes: NotebookPen,
};

/** Groups template fields by section in template order and numbers them "section.item". */
export function toSections(template: ChecklistTemplate): ChecklistSectionData[] {
  const sections: ChecklistSectionData[] = [];
  for (const field of template.fields) {
    let section = sections.find((s) => s.title === field.section);
    if (!section) {
      section = { title: field.section, icon: ICONS[field.section] ?? ClipboardCheck, fields: [] };
      sections.push(section);
    }
    section.fields.push({ field, code: `${sections.indexOf(section) + 1}.${section.fields.length + 1}` });
  }
  return sections;
}
