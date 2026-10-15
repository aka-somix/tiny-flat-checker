import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextArea } from "./TextArea.js";

const meta = { title: "Atoms/TextArea", component: TextArea, args: { "aria-label": "What worried me" } } satisfies Meta<typeof TextArea>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const Filled: Story = { args: { defaultValue: "Bathroom fan doesn't work; mould on the ceiling." } };
export const Invalid: Story = { args: { invalid: true } };
