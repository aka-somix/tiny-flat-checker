import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { ConfirmDialog } from "./ConfirmDialog.js";

const meta = {
  title: "Molecules/ConfirmDialog",
  component: ConfirmDialog,
  args: {
    open: true,
    title: "Delete this check?",
    body: "“2-bed on Elm Street” will be removed from your profile. This can't be undone.",
    confirmLabel: "Delete",
    onConfirm: fn(),
    onCancel: fn(),
  },
} satisfies Meta<typeof ConfirmDialog>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};
export const Busy: Story = { args: { busy: true } };
