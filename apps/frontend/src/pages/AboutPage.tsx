import { AboutSign, AppShell } from "../ui/index.js";
import { AppTopBar } from "../features/shell/AppTopBar.js";

const PORTFOLIO_URL = "https://salvatorecirone.dev";
const REPO_URL = "https://github.com/aka-somix/tiny-flat-checker";

export function AboutPage() {
  return (
    <AppShell topBar={<AppTopBar />}>
      <AboutSign portfolioUrl={PORTFOLIO_URL} repoUrl={REPO_URL} />
    </AppShell>
  );
}
