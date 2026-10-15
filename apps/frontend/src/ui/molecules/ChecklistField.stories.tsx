import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { FlatCheckValue } from "@flat-checker/shared";
import { ChecklistField } from "./ChecklistField.js";

const meta = {
  title: "Molecules/ChecklistField",
  component: ChecklistField,
  args: {
    code: "1.2",
    value: undefined,
    field: {
      id: "structure_no_damp",
      section: "Structure",
      label: "No damp patches, mould or peeling paint",
      hint: "Check behind furniture, inside wardrobes and in bathroom corners.",
      type: "boolean",
    },
  },
  render: (args) => {
    const [value, setValue] = useState<FlatCheckValue | undefined>(args.value);
    return <ChecklistField {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof ChecklistField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Boolean: Story = {};
export const Answered: Story = { args: { value: true } };
export const Rating: Story = {
  args: { field: { id: "light", section: "Light & noise", label: "Natural light", type: "rating" }, value: 4 },
};
export const Options: Story = {
  args: {
    field: {
      id: "heating_type",
      section: "Heating & cooling",
      label: "Heating",
      type: "options",
      options: [
        { value: "gas_boiler", label: "Own gas boiler" },
        { value: "centralised", label: "Centralised" },
        { value: "heat_pump", label: "Heat pump" },
        { value: "district", label: "District heating" },
      ],
    },
  },
};
export const Text: Story = { args: { field: { id: "notes_cons", section: "Notes", label: "What worried me", type: "text" } } };
export const ReadOnly: Story = { args: { value: false, readOnly: true } };
