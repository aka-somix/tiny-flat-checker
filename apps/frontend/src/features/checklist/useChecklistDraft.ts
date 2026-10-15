import { useCallback, useEffect, useState } from "react";
import type { FlatCheckValue, FlatCheckValues } from "@flat-checker/shared";
import type { FlatSignValue } from "../../ui/index.js";

export interface Draft {
  sign: FlatSignValue;
  values: FlatCheckValues;
}

const EMPTY: Draft = { sign: { title: "", link: "", price: "" }, values: {} };
const keyFor = (version: number) => `tfc.draft.v${version}`;

function load(version: number): Draft {
  try {
    const raw = localStorage.getItem(keyFor(version));
    return raw ? { ...EMPTY, ...(JSON.parse(raw) as Draft) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

/**
 * The in-progress check, kept in localStorage per template version so it survives
 * the Google sign-in redirect and an accidental tab close.
 */
export function useChecklistDraft(version: number) {
  const [draft, setDraft] = useState<Draft>(() => load(version));

  useEffect(() => {
    try {
      localStorage.setItem(keyFor(version), JSON.stringify(draft));
    } catch {
      /* storage full or blocked: the draft still lives in memory */
    }
  }, [version, draft]);

  const setSign = useCallback((patch: Partial<FlatSignValue>) => setDraft((d) => ({ ...d, sign: { ...d.sign, ...patch } })), []);
  const setValue = useCallback(
    (id: string, value: FlatCheckValue) => setDraft((d) => ({ ...d, values: { ...d.values, [id]: value } })),
    [],
  );
  const clear = useCallback(() => setDraft(EMPTY), []);

  return { draft, setSign, setValue, clear };
}
