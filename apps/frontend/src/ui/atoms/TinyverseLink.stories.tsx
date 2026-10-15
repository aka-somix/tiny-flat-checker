import type { Meta, StoryObj } from "@storybook/react-vite";
import { TinyverseLink } from "./TinyverseLink.js";

const meta = { title: "Atoms/TinyverseLink", component: TinyverseLink } satisfies Meta<typeof TinyverseLink>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Hover or focus the link to set the planet running. */
export const Default: Story = {};
export const OnPanel: Story = {
  render: () => (
    <div className="bg-ink p-4 text-surface">
      <TinyverseLink />
    </div>
  ),
};
