import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, LogIn, RotateCcw, Save, X } from "lucide-react";
import type { ChecklistTemplate, FlatCheckValues } from "@flat-checker/shared";
import { useChecklist, useCreateFlatCheck } from "../../api/hooks.js";
import {
  ActionBar,
  Button,
  ChecklistForm,
  ConfirmDialog,
  FlatSign,
  Spinner,
  StartSign,
  type FlatSignErrors,
} from "../../ui/index.js";
import { useAuth } from "../auth/AuthProvider.js";
import { downloadFlatCheckPdf } from "../pdf/downloadFlatCheckPdf.js";
import { parseMeta, parsePrice } from "./meta.js";
import { toSections } from "./sections.js";
import { useChecklistDraft } from "./useChecklistDraft.js";

const answeredValues = (values: FlatCheckValues) =>
  Object.fromEntries(Object.entries(values).filter(([, v]) => v !== null && v !== ""));

/** The landing checklist: loads the current template, then hands over to the form. */
export function ChecklistContainer() {
  const { data: template, isPending, isError, refetch } = useChecklist("current");
  if (isPending) return <Spinner label="Loading the checklist" className="py-10 text-lg" />;
  if (isError || !template) {
    return (
      <div role="alert" className="flex flex-col items-start gap-3 rounded-[6px] border-4 border-ink p-4">
        <p className="text-xl font-bold">The checklist didn't load.</p>
        <p className="text-lg text-ink-muted">Check your connection, then try again.</p>
        <Button variant="secondary" icon={RotateCcw} onClick={() => void refetch()}>
          Try again
        </Button>
      </div>
    );
  }
  return <ChecklistEditor template={template} />;
}

function ChecklistEditor({ template }: { template: ChecklistTemplate }) {
  const { user, signIn, error: authError, dismissError } = useAuth();
  const navigate = useNavigate();
  const { draft, setSign, setValue, clear } = useChecklistDraft(template.version);
  const create = useCreateFlatCheck();
  const [errors, setErrors] = useState<FlatSignErrors>({});
  const [confirmClear, setConfirmClear] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
  const signRef = useRef<HTMLDivElement>(null);

  const sections = useMemo(() => toSections(template), [template]);
  const values = answeredValues(draft.values);
  const answered = template.fields.filter((f) => f.id in values).length;

  const save = () => {
    const parsed = parseMeta(draft.sign);
    if ("errors" in parsed) {
      setErrors(parsed.errors);
      signRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      signRef.current?.querySelector<HTMLInputElement>("[aria-invalid=true]")?.focus({ preventScroll: true });
      return;
    }
    setErrors({});
    create.mutate(
      { templateVersion: template.version, meta: parsed.meta, values },
      {
        onSuccess: (flat) => {
          clear();
          void navigate(`/flatchecks/${flat.id}`);
        },
      },
    );
  };

  const downloadPdf = async () => {
    setPdfBusy(true);
    try {
      const price = parsePrice(draft.sign.price);
      await downloadFlatCheckPdf(
        template,
        { title: draft.sign.title.trim(), link: draft.sign.link.trim() || undefined, price: Number.isNaN(price) ? undefined : price },
        values,
      );
    } finally {
      setPdfBusy(false);
    }
  };

  const status = create.isError
    ? `Couldn't save: ${create.error.message}`
    : create.isPending
      ? "Saving…"
      : user
        ? "Draft kept on this device"
        : "Draft kept on this device · sign in to save it";

  return (
    <>
      {authError && (
        <div role="alert" className="flex items-start gap-3 rounded-[6px] bg-ink p-4 text-surface">
          <p className="flex-1 text-lg font-semibold">{authError}</p>
          <button type="button" aria-label="Dismiss" onClick={dismissError} className="grid size-11 place-items-center rounded-[4px]">
            <X aria-hidden="true" className="size-6" strokeWidth={2.5} />
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <h1 className="text-[clamp(2.75rem,12vw,4.5rem)] leading-[0.95] font-extrabold tracking-[-0.03em] text-balance">
          Check the flat, not the photos.
        </h1>
        <p className="text-xl leading-snug">What you'd forget on the day.</p>
      </div>

      {sections[0] && <StartSign href="#section-1-region" firstSection={sections[0].title} checks={template.fields.length} />}

      <ChecklistForm sections={sections} values={draft.values} onChange={setValue} />

      <div ref={signRef} className="scroll-mt-4">
        <FlatSign value={draft.sign} errors={errors} onChange={setSign} />
      </div>

      <div className="flex justify-center border-t-4 border-ink pt-6">
        <Button variant="ghost" icon={RotateCcw} onClick={() => setConfirmClear(true)}>
          Start a new check
        </Button>
      </div>

      <ConfirmDialog
        open={confirmClear}
        title="Start a new check?"
        body="This clears every answer on this device. Saved checks aren't affected."
        confirmLabel="Clear answers"
        onConfirm={() => {
          clear();
          setErrors({});
          setConfirmClear(false);
          window.scrollTo({ top: 0 });
        }}
        onCancel={() => setConfirmClear(false)}
      />

      <ActionBar answered={answered} total={template.fields.length} status={status}>
        <Button variant="secondary" icon={Download} loading={pdfBusy} aria-label="Download PDF" onClick={() => void downloadPdf()}>
          PDF
        </Button>
        {user ? (
          <Button icon={Save} loading={create.isPending} onClick={save}>
            Save
          </Button>
        ) : (
          <Button icon={LogIn} onClick={() => void signIn()}>
            Sign in to save
          </Button>
        )}
      </ActionBar>
    </>
  );
}
