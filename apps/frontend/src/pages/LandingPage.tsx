import { AppShell } from "../ui/index.js";
import { ChecklistContainer } from "../features/checklist/ChecklistContainer.js";
import { AppTopBar } from "../features/shell/AppTopBar.js";

export function LandingPage() {
  return (
    <AppShell topBar={<AppTopBar />} hasActionBar>
      <ChecklistContainer />
    </AppShell>
  );
}
