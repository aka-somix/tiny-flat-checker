import type { Meta, StoryObj } from "@storybook/react-vite";
import { LogIn } from "lucide-react";
import { Avatar } from "../atoms/Avatar.js";
import { Button } from "../atoms/Button.js";
import { TopBar } from "./TopBar.js";

const meta = { title: "Organisms/TopBar", component: TopBar, parameters: { layout: "fullscreen" } } satisfies Meta<typeof TopBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SignedOut: Story = {
  args: {
    children: (
      <Button variant="ghost" icon={LogIn}>
        Sign in
      </Button>
    ),
  },
};
export const SignedIn: Story = {
  args: {
    children: (
      <a href="/profile" aria-label="Your profile">
        <Avatar name="Ada Lovelace" />
      </a>
    ),
  },
};
