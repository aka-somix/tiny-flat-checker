import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Avatar, Button, TopBar } from "../../ui/index.js";
import { useAuth } from "../auth/AuthProvider.js";

export function AppTopBar() {
  const { user, loading, signIn } = useAuth();
  return (
    <TopBar linkAs={Link}>
      {loading ? null : user ? (
        <Link to="/profile" aria-label="Your profile and saved checks" className="flex items-center gap-2 rounded-[4px] p-1 font-semibold no-underline">
          <span className="hidden sm:inline">My checks</span>
          <Avatar name={user.name} src={user.avatarUrl} />
        </Link>
      ) : (
        <Button variant="ghost" icon={LogIn} onClick={() => void signIn()}>
          Sign in
        </Button>
      )}
    </TopBar>
  );
}
