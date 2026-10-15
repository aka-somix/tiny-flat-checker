import { cn } from "../lib/cn.js";

export interface Choice {
  value: string;
  label: string;
}

export interface ChoiceTilesProps {
  /** Radio group name; unique per question. */
  name: string;
  /** Id of the element naming the group. */
  labelledBy: string;
  choices: Choice[];
  value: string | null;
  /** Called with null when the selected tile is tapped again. */
  onChange?: (value: string | null) => void;
  readOnly?: boolean;
  layout?: "row" | "wrap";
}

/** One-tap answer tiles. The selected tile reverses to black, like a lit sign. */
export function ChoiceTiles({ name, labelledBy, choices, value, onChange, readOnly, layout = "wrap" }: ChoiceTilesProps) {
  return (
    <div
      role="radiogroup"
      aria-labelledby={labelledBy}
      aria-readonly={readOnly || undefined}
      className={cn("gap-2", layout === "row" ? "grid auto-cols-fr grid-flow-col" : "flex flex-wrap")}
    >
      {choices.map((c) => {
        const checked = value === c.value;
        return (
          <label
            key={c.value}
            className={cn(
              "relative inline-flex min-h-13 min-w-13 items-center justify-center rounded-[4px] border-2 border-ink px-4 text-lg font-semibold",
              "select-none transition-colors duration-100 has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-ink",
              checked ? "bg-ink text-surface" : readOnly ? "border-ink-muted bg-surface font-normal text-ink-muted" : "bg-surface text-ink",
              !readOnly && "cursor-pointer active:scale-[0.97]",
              !readOnly && !checked && "hover:bg-surface-sunken",
            )}
          >
            <input
              type="radio"
              name={name}
              value={c.value}
              checked={checked}
              disabled={readOnly && !checked}
              readOnly={readOnly}
              className="peer sr-only"
              onChange={() => !readOnly && onChange?.(c.value)}
              onClick={() => !readOnly && checked && onChange?.(null)}
            />
            {c.label}
          </label>
        );
      })}
    </div>
  );
}
