import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { UserCard } from "./UserCard.js";

const meta = {
  title: "Organisms/UserCard",
  component: UserCard,
  args: { name: "Ada Lovelace", email: "ada@example.com", onSignOut: fn() },
} satisfies Meta<typeof UserCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
