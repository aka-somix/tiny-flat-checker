import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input.js";

const meta = {
  title: "Atoms/Input",
  component: Input,
  args: { "aria-label": "Flat title", placeholder: "e.g. 2-bed on Elm Street" },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const Filled: Story = { args: { defaultValue: "2-bed on Elm Street" } };
export const Invalid: Story = { args: { invalid: true } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "Read only" } };
