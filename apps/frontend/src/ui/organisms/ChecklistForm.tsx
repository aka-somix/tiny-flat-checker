import type { LucideIcon } from "lucide-react";
import type { ChecklistField as Field, FlatCheckValue, FlatCheckValues } from "@flat-checker/shared";
import { ChecklistField } from "../molecules/ChecklistField.js";
import { SectionBand } from "./SectionBand.js";

export interface ChecklistSectionData {
  title: string;
  icon: LucideIcon;
  fields: { field: Field; code: string }[];
}

export interface ChecklistFormProps {
  sections: ChecklistSectionData[];
  values: FlatCheckValues;
  onChange?: (id: string, value: FlatCheckValue) => void;
  readOnly?: boolean;
}

const isAnswered = (v: FlatCheckValue | undefined) => v !== null && v !== undefined && v !== "";

/** The whole route: one signed section after another. */
export function ChecklistForm({ sections, values, onChange, readOnly }: ChecklistFormProps) {
  return (
    <div className="flex flex-col gap-6">
      {sections.map((section, i) => {
        const headingId = `section-${i + 1}`;
        return (
          <section key={section.title} id={`${headingId}-region`} aria-labelledby={headingId} className="scroll-mt-2">
            <SectionBand
              id={headingId}
              index={i + 1}
              total={sections.length}
              title={section.title}
              icon={section.icon}
              count={section.fields.length}
              answered={section.fields.filter(({ field }) => isAnswered(values[field.id])).length}
              next={sections[i + 1]?.title}
            />
            <div className="px-0.5">
              {section.fields.map(({ field, code }) => (
                <ChecklistField
                  key={field.id}
                  field={field}
                  code={code}
                  value={values[field.id]}
                  onChange={(v) => onChange?.(field.id, v)}
                  readOnly={readOnly}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
