import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Droplets, Sun } from "lucide-react";
import type { FlatCheckValues } from "@flat-checker/shared";
import { ChecklistForm, type ChecklistSectionData } from "./ChecklistForm.js";

const sections: ChecklistSectionData[] = [
  {
    title: "Plumbing",
    icon: Droplets,
    fields: [
      { code: "1.1", field: { id: "pressure", section: "Plumbing", label: "Water pressure", hint: "Run the shower and the kitchen tap at the same time.", type: "rating" } },
      { code: "1.2", field: { id: "hot", section: "Plumbing", label: "Hot water arrives within about 30 seconds", type: "boolean" } },
    ],
  },
  {
    title: "Light & noise",
    icon: Sun,
    fields: [
      {
        code: "2.1",
        field: {
          id: "orientation",
          section: "Light & noise",
          label: "Main orientation",
          type: "options",
          options: ["North", "East", "South", "West", "Multiple sides"].map((l) => ({ value: l, label: l })),
        },
      },
    ],
  },
];

const meta = {
  title: "Organisms/ChecklistForm",
  component: ChecklistForm,
  args: { sections, values: { hot: true } },
  decorators: [(Story) => <div className="mx-auto max-w-2xl px-4"><Story /></div>],
  render: (args) => {
    const [values, setValues] = useState<FlatCheckValues>(args.values);
    return <ChecklistForm {...args} values={values} onChange={(id, v) => setValues((s) => ({ ...s, [id]: v }))} />;
  },
} satisfies Meta<typeof ChecklistForm>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Filling: Story = {};
export const ReadOnly: Story = { args: { readOnly: true, values: { pressure: 4, hot: true, orientation: "South" } } };
