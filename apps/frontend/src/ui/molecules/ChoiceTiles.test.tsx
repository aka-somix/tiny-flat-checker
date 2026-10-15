import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { ChoiceTiles, type Choice } from "./ChoiceTiles.js";

const choices: Choice[] = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];

function Harness({ onChange }: { onChange: (v: string | null) => void }) {
  const [value, setValue] = useState<string | null>(null);
  return (
    <>
      <span id="q">No cracks</span>
      <ChoiceTiles
        name="q"
        labelledBy="q"
        choices={choices}
        value={value}
        onChange={(v) => {
          setValue(v);
          onChange(v);
        }}
      />
    </>
  );
}

describe("ChoiceTiles", () => {
  it("selects with one tap and clears on a second tap", async () => {
    const onChange = vi.fn();
    render(<Harness onChange={onChange} />);
    expect(screen.getByRole("radiogroup", { name: "No cracks" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("radio", { name: "Yes" }));
    expect(screen.getByRole("radio", { name: "Yes" })).toBeChecked();
    await userEvent.click(screen.getByRole("radio", { name: "Yes" }));
    expect(onChange).toHaveBeenLastCalledWith(null);
    expect(screen.getByRole("radio", { name: "Yes" })).not.toBeChecked();
  });

  it("ignores taps when read-only", async () => {
    const onChange = vi.fn();
    render(
      <>
        <span id="r">Q</span>
        <ChoiceTiles name="r" labelledBy="r" choices={choices} value="false" onChange={onChange} readOnly />
      </>,
    );
    await userEvent.click(screen.getByRole("radio", { name: "No" }));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole("radio", { name: "No" })).toBeChecked();
  });
});
