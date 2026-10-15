import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowLeft, Droplets, Home, Zap } from "lucide-react";
import { Pictogram } from "./Pictogram.js";

const meta = { title: "Atoms/Pictogram", component: Pictogram, args: { icon: ArrowLeft } } satisfies Meta<typeof Pictogram>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Medium: Story = {};
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <Pictogram icon={Home} size="sm" />
      <Pictogram icon={Droplets} size="md" />
      <Pictogram icon={Zap} size="lg" />
    </div>
  ),
};
