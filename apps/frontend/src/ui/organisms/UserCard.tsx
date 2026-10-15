import { LogOut } from "lucide-react";
import { Avatar } from "../atoms/Avatar.js";
import { Button } from "../atoms/Button.js";

export interface UserCardProps {
  name: string;
  email: string;
  avatarUrl?: string | null;
  onSignOut: () => void;
}

export function UserCard({ name, email, avatarUrl, onSignOut }: UserCardProps) {
  return (
    <section aria-label="Your account" className="flex flex-col gap-4 rounded-[6px] bg-ink p-4 text-surface sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <Avatar name={name} src={avatarUrl} size="lg" tone="sign" />
        <div className="flex min-w-0 flex-col">
          <h1 className="text-3xl leading-tight font-extrabold break-words">{name}</h1>
          <p className="text-base break-all text-surface/85">{email}</p>
        </div>
      </div>
      <Button variant="inverse" icon={LogOut} onClick={onSignOut} className="self-start sm:self-auto">
        Sign out
      </Button>
    </section>
  );
}
