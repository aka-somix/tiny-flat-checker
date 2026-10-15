import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../atoms/Input.js";
import { FormField } from "./FormField.js";

const meta = {
  title: "Molecules/FormField",
  component: FormField,
  args: { id: "title", label: "Flat title", children: (p) => <Input {...p} /> },
} satisfies Meta<typeof FormField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: "Something you'll recognise later, like the street." } };
export const Optional: Story = { args: { id: "link", label: "Listing link", optional: true } };
export const WithError: Story = { args: { error: "Give the flat a name." } };
