import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Download, LogIn } from "lucide-react";
import { Button } from "./Button.js";

const meta = {
  title: "Atoms/Button",
  component: Button,
  args: { children: "Save check", icon: ArrowRight },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary", icon: Download, children: "PDF" } };
export const Ghost: Story = { args: { variant: "ghost", icon: LogIn, children: "Sign in" } };
export const Inverse: Story = {
  args: { variant: "inverse", children: "Sign out" },
  decorators: [(Story) => <div className="bg-ink p-4"><Story /></div>],
};
export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };
export const NoIcon: Story = { args: { icon: undefined, children: "Cancel", variant: "secondary" } };
