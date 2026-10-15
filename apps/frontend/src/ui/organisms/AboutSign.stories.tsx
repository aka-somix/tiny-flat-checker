import type { Meta, StoryObj } from "@storybook/react-vite";
import { AboutSign } from "./AboutSign.js";

const meta = { title: "Organisms/AboutSign", component: AboutSign } satisfies Meta<typeof AboutSign>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { portfolioUrl: "https://salvatorecirone.dev", repoUrl: "https://github.com/aka-somix/tiny-flat-checker" },
};
