import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageLoader } from "./PageLoader.js";

const meta = { title: "Molecules/PageLoader", component: PageLoader } satisfies Meta<typeof PageLoader>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Wait three seconds for the about link to appear. */
export const Default: Story = { args: { label: "Loading the checklist" } };
