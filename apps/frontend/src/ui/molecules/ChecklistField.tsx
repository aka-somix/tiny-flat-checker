import type { ChecklistField as Field, FlatCheckValue } from "@flat-checker/shared";
import { TextArea } from "../atoms/TextArea.js";
import { cn } from "../lib/cn.js";
import { ChoiceTiles, type Choice } from "./ChoiceTiles.js";

export interface ChecklistFieldProps {
  field: Field;
  /** Short reference shown on the sign, e.g. "3.2". */
  code: string;
  value: FlatCheckValue | undefined;
  onChange?: (value: FlatCheckValue) => void;
  readOnly?: boolean;
}

const YES_NO: Choice[] = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];
const RATING: Choice[] = ["1", "2", "3", "4", "5"].map((v) => ({ value: v, label: v }));

function toTile(value: FlatCheckValue | undefined): string | null {
  return value === null || value === undefined ? null : String(value);
}

/** One check: its sign code, question, hint and answer control. */
export function ChecklistField({ field, code, value, onChange, readOnly }: ChecklistFieldProps) {
  const labelId = `check-${field.id}`;
  const hintId = field.hint ? `${labelId}-hint` : undefined;
  const answered = value !== null && value !== undefined && value !== "";

  const tiles = (choices: Choice[], parse: (v: string) => FlatCheckValue, layout: "row" | "wrap" = "wrap") => (
    <ChoiceTiles
      name={field.id}
      labelledBy={labelId}
      choices={choices}
      value={toTile(value)}
      onChange={(v) => onChange?.(v === null ? null : parse(v))}
      readOnly={readOnly}
      layout={layout}
    />
  );

  return (
    <div className="flex flex-col gap-3 border-b-2 border-ink py-5 last:border-b-0" data-answered={answered || undefined}>
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={cn(
            "mt-0.5 inline-grid h-7 min-w-11 place-items-center rounded-[3px] border-2 border-ink px-1 text-sm font-bold",
            answered ? "bg-ink text-surface" : "text-ink",
          )}
        >
          {code}
        </span>
        <div className="flex flex-col gap-1">
          <span id={labelId} className="text-xl font-semibold leading-tight text-balance">
            {field.label}
          </span>
          {field.hint && (
            <span id={hintId} className="text-base leading-snug text-ink-muted">
              {field.hint}
            </span>
          )}
        </div>
      </div>

      {field.type === "boolean" && tiles(YES_NO, (v) => v === "true", "row")}
      {field.type === "rating" && (
        <div className="flex flex-col gap-1">
          {tiles(RATING, Number, "row")}
          <div aria-hidden="true" className="flex justify-between text-sm font-semibold text-ink-muted">
            <span>Poor</span>
            <span>Great</span>
          </div>
        </div>
      )}
      {field.type === "options" && tiles(field.options, (v) => v)}
      {field.type === "text" &&
        (readOnly ? (
          <p className="whitespace-pre-wrap text-lg">{typeof value === "string" && value ? value : "—"}</p>
        ) : (
          <TextArea
            aria-labelledby={labelId}
            aria-describedby={hintId}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange?.(e.target.value === "" ? null : e.target.value)}
          />
        ))}
    </div>
  );
}
