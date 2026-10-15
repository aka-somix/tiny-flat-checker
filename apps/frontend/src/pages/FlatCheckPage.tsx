import { useParams } from "react-router-dom";
import { AppShell } from "../ui/index.js";
import { RequireAuth } from "../features/auth/RequireAuth.js";
import { FlatCheckDetailContainer } from "../features/flatcheck/FlatCheckDetailContainer.js";
import { AppTopBar } from "../features/shell/AppTopBar.js";

export function FlatCheckPage() {
  const { id = "" } = useParams();
  return (
    <AppShell topBar={<AppTopBar />} hasActionBar>
      <RequireAuth>
        <FlatCheckDetailContainer id={id} />
      </RequireAuth>
    </AppShell>
  );
}
