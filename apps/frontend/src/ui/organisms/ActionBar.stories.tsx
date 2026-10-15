import type { Meta, StoryObj } from "@storybook/react-vite";
import { Download, LogIn } from "lucide-react";
import { Button } from "../atoms/Button.js";
import { ActionBar } from "./ActionBar.js";

const meta = {
  title: "Organisms/ActionBar",
  component: ActionBar,
  parameters: { layout: "fullscreen" },
  args: {
    answered: 12,
    total: 46,
    status: "Draft kept on this device",
    children: (
      <>
        <Button variant="secondary" icon={Download} aria-label="Download PDF">PDF</Button>
        <Button icon={LogIn}>Sign in to save</Button>
      </>
    ),
  },
} satisfies Meta<typeof ActionBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Anonymous: Story = {};
export const Complete: Story = { args: { answered: 46, status: "All checked" } };
