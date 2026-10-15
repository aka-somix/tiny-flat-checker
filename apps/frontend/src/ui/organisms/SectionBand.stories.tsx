import type { Meta, StoryObj } from "@storybook/react-vite";
import { Droplets, NotebookPen } from "lucide-react";
import { SectionBand } from "./SectionBand.js";

const meta = {
  title: "Organisms/SectionBand",
  component: SectionBand,
  args: { id: "s3", index: 3, total: 11, title: "Plumbing", icon: Droplets, answered: 2, count: 5, next: "Electrical" },
  decorators: [(Story) => <div className="px-4"><Story /></div>],
} satisfies Meta<typeof SectionBand>;
export default meta;
type Story = StoryObj<typeof meta>;

export const InProgress: Story = {};
export const Done: Story = { args: { answered: 5 } };
export const LastSection: Story = { args: { index: 11, title: "Notes", icon: NotebookPen, answered: 0, count: 2, next: undefined } };
