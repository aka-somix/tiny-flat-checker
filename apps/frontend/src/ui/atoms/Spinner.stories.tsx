import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./Spinner.js";

const meta = { title: "Atoms/Spinner", component: Spinner } satisfies Meta<typeof Spinner>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const OnPanel: Story = {
  render: () => (
    <div className="bg-ink p-4 text-surface">
      <Spinner label="Saving" />
    </div>
  ),
};
