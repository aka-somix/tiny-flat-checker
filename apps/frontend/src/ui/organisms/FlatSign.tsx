import { ExternalLink } from "lucide-react";
import { Input } from "../atoms/Input.js";
import { FormField } from "../molecules/FormField.js";
import { formatPrice } from "../lib/format.js";

export interface FlatSignValue {
  title: string;
  link: string;
  /** Kept as typed text; parsed when saving. */
  price: string;
}

export type FlatSignErrors = Partial<Record<keyof FlatSignValue, string>>;

export interface FlatSignProps {
  value: FlatSignValue;
  errors?: FlatSignErrors;
  onChange?: (patch: Partial<FlatSignValue>) => void;
  readOnly?: boolean;
}

/** The flat's identity: what you'd write on the sign at the door. */
export function FlatSign({ value, errors = {}, onChange, readOnly }: FlatSignProps) {
  if (readOnly) {
    const price = Number(value.price);
    return (
      <section aria-label="Flat" className="flex flex-col gap-3 rounded-[6px] border-4 border-ink p-4">
        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-balance">{value.title}</h1>
        <p className="flex items-baseline gap-2">
          <span className="text-base font-semibold text-ink-muted">Asking price</span>
          <span className="text-3xl font-extrabold">{Number.isFinite(price) ? formatPrice(price) : value.price}</span>
        </p>
        {value.link && (
          <a href={value.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 self-start text-lg font-semibold underline">
            Open listing <ExternalLink aria-hidden="true" className="size-4" strokeWidth={2.5} />
          </a>
        )}
      </section>
    );
  }

  return (
    <section aria-labelledby="flat-sign-title" className="flex flex-col gap-4 rounded-[6px] border-4 border-ink p-4">
      <h2 id="flat-sign-title" className="text-2xl font-bold">
        Which flat?
      </h2>
      <FormField id="flat-title" label="Name it" hint="Something you'll recognise later, like the street." error={errors.title}>
        {(p) => (
          <Input {...p} invalid={p.invalid} value={value.title} autoComplete="off" onChange={(e) => onChange?.({ title: e.target.value })} />
        )}
      </FormField>
      <div className="grid gap-4 sm:grid-cols-[1fr_12rem]">
        <FormField id="flat-link" label="Listing link" optional error={errors.link}>
          {(p) => (
            <Input {...p} invalid={p.invalid} type="url" inputMode="url" placeholder="https://" value={value.link} onChange={(e) => onChange?.({ link: e.target.value })} />
          )}
        </FormField>
        <FormField id="flat-price" label="Asking price" error={errors.price}>
          {(p) => (
            <Input {...p} invalid={p.invalid} inputMode="decimal" placeholder="250000" value={value.price} onChange={(e) => onChange?.({ price: e.target.value })} />
          )}
        </FormField>
      </div>
    </section>
  );
}
