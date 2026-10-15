import { AppShell } from "../ui/index.js";
import { RequireAuth } from "../features/auth/RequireAuth.js";
import { ProfileContainer } from "../features/profile/ProfileContainer.js";
import { AppTopBar } from "../features/shell/AppTopBar.js";

export function ProfilePage() {
  return (
    <AppShell topBar={<AppTopBar />}>
      <RequireAuth>
        <ProfileContainer />
      </RequireAuth>
    </AppShell>
  );
}
