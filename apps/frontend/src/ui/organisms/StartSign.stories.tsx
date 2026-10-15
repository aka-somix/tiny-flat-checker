import type { Meta, StoryObj } from "@storybook/react-vite";
import { StartSign } from "./StartSign.js";

const meta = {
  title: "Organisms/StartSign",
  component: StartSign,
  args: { href: "#section-1", firstSection: "Structure", checks: 46 },
  decorators: [(Story) => <div className="max-w-md p-4"><Story /></div>],
} satisfies Meta<typeof StartSign>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const LongSection: Story = { args: { firstSection: "Heating & cooling" } };
