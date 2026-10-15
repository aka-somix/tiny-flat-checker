import { useState } from "react";
import { Link } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import { useDeleteFlatCheck, useFlatChecks, useLoadFlatCheckWithTemplate } from "../../api/hooks.js";
import { Button, ConfirmDialog, FlatCheckList, Spinner, UserCard } from "../../ui/index.js";
import { useAuth } from "../auth/AuthProvider.js";
import { downloadFlatCheckPdf } from "../pdf/downloadFlatCheckPdf.js";

export function ProfileContainer() {
  const { user, signOut } = useAuth();
  const list = useFlatChecks();
  const remove = useDeleteFlatCheck();
  const load = useLoadFlatCheckWithTemplate();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!user) return null;
  const pending = list.data?.find((f) => f.id === toDelete);

  const download = async (id: string) => {
    setDownloadingId(id);
    setError(null);
    try {
      const { flat, template } = await load(id);
      await downloadFlatCheckPdf(template, flat.meta, flat.values, new Date(flat.createdAt));
    } catch (e) {
      setError(`Couldn't make the PDF: ${(e as Error).message}`);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <>
      <UserCard name={user.name} email={user.email} avatarUrl={user.avatarUrl} onSignOut={() => void signOut()} />

      <section aria-labelledby="saved-title" className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between gap-3">
          <h2 id="saved-title" className="text-3xl font-extrabold">
            Saved checks
          </h2>
          {list.data && list.data.length > 0 && <span className="text-xl font-bold">{list.data.length}</span>}
        </div>
        {error && (
          <p role="alert" className="text-lg font-bold text-danger">
            {error}
          </p>
        )}
        {list.isPending && <Spinner label="Loading your saved checks" className="text-lg" />}
        {list.isError && (
          <div role="alert" className="flex flex-col items-start gap-3">
            <p className="text-lg font-bold">Your saved checks didn't load.</p>
            <Button variant="secondary" icon={RotateCcw} onClick={() => void list.refetch()}>
              Try again
            </Button>
          </div>
        )}
        {list.data && (
          <FlatCheckList
            items={list.data}
            hrefFor={(id) => `/flatchecks/${id}`}
            linkAs={Link}
            downloadingId={downloadingId}
            onDownload={(id) => void download(id)}
            onDelete={setToDelete}
          />
        )}
      </section>

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete this check?"
        body={`“${pending?.title ?? "This check"}” will be removed from your profile. This can't be undone.`}
        confirmLabel="Delete"
        busy={remove.isPending}
        onConfirm={() => remove.mutate(toDelete!, { onSettled: () => setToDelete(null) })}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
}
