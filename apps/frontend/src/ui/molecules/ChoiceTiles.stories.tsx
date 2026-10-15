import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ChoiceTiles } from "./ChoiceTiles.js";

const yesNo = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];
const rating = ["1", "2", "3", "4", "5"].map((v) => ({ value: v, label: v }));

const meta = {
  title: "Molecules/ChoiceTiles",
  component: ChoiceTiles,
  args: { name: "q", labelledBy: "q-label", choices: yesNo, value: null },
  decorators: [
    (Story) => (
      <div className="flex max-w-sm flex-col gap-2">
        <span id="q-label" className="font-bold">
          No cracks in walls or ceilings
        </span>
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <ChoiceTiles {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof ChoiceTiles>;
export default meta;
type Story = StoryObj<typeof meta>;

export const YesNo: Story = {};
export const Rating: Story = { args: { choices: rating, layout: "row", value: "4" } };
export const Options: Story = {
  args: {
    choices: ["Own gas boiler", "Centralised", "Heat pump", "District heating", "Other"].map((l) => ({ value: l, label: l })),
  },
};
export const ReadOnly: Story = { args: { value: "true", readOnly: true } };
