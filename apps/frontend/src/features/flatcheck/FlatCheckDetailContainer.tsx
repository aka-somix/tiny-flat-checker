import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Trash2 } from "lucide-react";
import { useChecklist, useDeleteFlatCheck, useFlatCheck } from "../../api/hooks.js";
import { ActionBar, Button, ChecklistForm, ConfirmDialog, FlatSign, Spinner, formatDate } from "../../ui/index.js";
import { toSections } from "../checklist/sections.js";
import { downloadFlatCheckPdf } from "../pdf/downloadFlatCheckPdf.js";

/** A saved check, read-only, rendered with the template version it was filled on. */
export function FlatCheckDetailContainer({ id }: { id: string }) {
  const navigate = useNavigate();
  const flat = useFlatCheck(id);
  const template = useChecklist(flat.data?.templateVersion);
  const remove = useDeleteFlatCheck();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
  const sections = useMemo(() => (template.data ? toSections(template.data) : []), [template.data]);

  const back = (
    <Link to="/profile" className="inline-flex items-center gap-2 self-start text-lg font-semibold underline">
      <ArrowLeft aria-hidden="true" className="size-5" strokeWidth={2.5} /> All my checks
    </Link>
  );

  if (flat.isError) {
    return (
      <>
        {back}
        <p role="alert" className="text-2xl font-bold">
          {flat.error.message.includes("not found") ? "This check doesn't exist, or it isn't yours." : "This check didn't load."}
        </p>
      </>
    );
  }
  if (!flat.data || !template.data) return <Spinner label="Loading the check" className="text-lg" />;

  const { meta, values, createdAt } = flat.data;
  const answered = template.data.fields.filter((f) => values[f.id] !== undefined && values[f.id] !== null).length;

  const downloadPdf = async () => {
    setPdfBusy(true);
    try {
      await downloadFlatCheckPdf(template.data, meta, values, new Date(createdAt));
    } finally {
      setPdfBusy(false);
    }
  };

  return (
    <>
      {back}
      <FlatSign readOnly value={{ title: meta.title, link: meta.link ?? "", price: String(meta.price) }} />
      <p className="text-base text-ink-muted">
        Checked on {formatDate(createdAt)} · checklist v{flat.data.templateVersion}
      </p>
      <ChecklistForm sections={sections} values={values} readOnly />

      <ConfirmDialog
        open={confirmDelete}
        title="Delete this check?"
        body={`“${meta.title}” will be removed from your profile. This can't be undone.`}
        confirmLabel="Delete"
        busy={remove.isPending}
        onConfirm={() => remove.mutate(id, { onSuccess: () => void navigate("/profile", { replace: true }) })}
        onCancel={() => setConfirmDelete(false)}
      />

      <ActionBar answered={answered} total={template.data.fields.length} status="Saved to your profile">
        <Button variant="secondary" icon={Trash2} aria-label="Delete this check" onClick={() => setConfirmDelete(true)}>
          <span className="sr-only sm:not-sr-only">Delete</span>
        </Button>
        <Button icon={Download} loading={pdfBusy} onClick={() => void downloadPdf()}>
          PDF
        </Button>
      </ActionBar>
    </>
  );
}
