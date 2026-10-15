import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { FlatCheckList } from "./FlatCheckList.js";

const meta = {
  title: "Organisms/FlatCheckList",
  component: FlatCheckList,
  args: {
    hrefFor: (id: string) => `#${id}`,
    onDownload: fn(),
    onDelete: fn(),
    items: [
      { id: "a", title: "2-bed on Elm Street, 3rd floor", price: 248500, createdAt: "2026-10-09T17:20:00.000Z" },
      { id: "b", title: "Loft by the canal", price: 312000, createdAt: "2026-10-02T10:05:00.000Z" },
    ],
  },
} satisfies Meta<typeof FlatCheckList>;
export default meta;
type Story = StoryObj<typeof meta>;

export const WithChecks: Story = {};
export const Downloading: Story = { args: { downloadingId: "a" } };
export const Empty: Story = { args: { items: [] } };
