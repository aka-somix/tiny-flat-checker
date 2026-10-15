import { ChevronRight, Download, Home, Trash2 } from "lucide-react";
import { Pictogram } from "../atoms/Pictogram.js";
import { Spinner } from "../atoms/Spinner.js";
import { formatDate, formatPrice } from "../lib/format.js";
import { PlainLink, type LinkComponent } from "../lib/link.js";

export interface FlatCheckListItem {
  id: string;
  title: string;
  price: number;
  createdAt: string;
}

export interface FlatCheckListProps {
  items: FlatCheckListItem[];
  hrefFor: (id: string) => string;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
  downloadingId?: string | null;
  linkAs?: LinkComponent;
}

const iconButton =
  "grid size-13 place-items-center rounded-[4px] border-2 border-ink bg-surface hover:bg-surface-sunken disabled:opacity-50";

/** Saved checks as departure-board rows: open, download, delete. */
export function FlatCheckList({ items, hrefFor, onDownload, onDelete, downloadingId, linkAs: Link = PlainLink }: FlatCheckListProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-start gap-2 rounded-[6px] border-4 border-dashed border-ink p-5">
        <p className="text-2xl font-bold">No saved checks yet</p>
        <p className="text-lg text-ink-muted">Fill in the checklist at your next viewing and save it here.</p>
      </div>
    );
  }
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.id} className="flex items-stretch gap-2">
          <Link
            to={hrefFor(item.id)}
            className="flex min-w-0 flex-1 items-center gap-3 rounded-[4px] border-2 border-ink bg-surface p-2 pr-3 no-underline hover:bg-surface-sunken"
          >
            <Pictogram icon={Home} />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="line-clamp-2 text-lg leading-snug font-bold break-words">{item.title}</span>
              <span className="text-base text-ink-muted">
                {formatPrice(item.price)} · {formatDate(item.createdAt)}
              </span>
            </span>
            <ChevronRight aria-hidden="true" className="size-6 shrink-0" strokeWidth={2.5} />
          </Link>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              className={iconButton}
              aria-label={`Download PDF of ${item.title}`}
              disabled={downloadingId === item.id}
              onClick={() => onDownload(item.id)}
            >
              {downloadingId === item.id ? <Spinner label="Preparing PDF" /> : <Download aria-hidden="true" className="size-6" strokeWidth={2.5} />}
            </button>
            <button type="button" className={iconButton} aria-label={`Delete ${item.title}`} onClick={() => onDelete(item.id)}>
              <Trash2 aria-hidden="true" className="size-6" strokeWidth={2.5} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
