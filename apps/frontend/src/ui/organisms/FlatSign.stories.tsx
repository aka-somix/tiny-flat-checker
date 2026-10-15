import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FlatSign, type FlatSignValue } from "./FlatSign.js";

const meta = {
  title: "Organisms/FlatSign",
  component: FlatSign,
  args: { value: { title: "", link: "", price: "" } },
  render: (args) => {
    const [value, setValue] = useState<FlatSignValue>(args.value);
    return <FlatSign {...args} value={value} onChange={(p) => setValue((v) => ({ ...v, ...p }))} />;
  },
} satisfies Meta<typeof FlatSign>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const WithErrors: Story = {
  args: { errors: { title: "Give the flat a name.", price: "Enter the asking price as a number." } },
};
export const ReadOnly: Story = {
  args: { readOnly: true, value: { title: "2-bed on Elm Street, 3rd floor", link: "https://example.com/listing/123", price: "248500" } },
};
