import type { Meta, StoryObj } from "@storybook/react-vite";
import { TopBar } from "../organisms/TopBar.js";
import { AppShell } from "./AppShell.js";

const meta = {
  title: "Templates/AppShell",
  component: AppShell,
  parameters: { layout: "fullscreen" },
  args: {
    topBar: <TopBar />,
    children: <p className="text-lg">Page content goes here.</p>,
  },
} satisfies Meta<typeof AppShell>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
