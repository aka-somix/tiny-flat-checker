import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar.js";

const meta = { title: "Atoms/Avatar", component: Avatar, args: { name: "Ada Lovelace" } } satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {};
export const Large: Story = { args: { size: "lg" } };
export const OnPanel: Story = {
  args: { size: "lg", tone: "sign" },
  decorators: [(Story) => <div className="bg-ink p-4"><Story /></div>],
};
