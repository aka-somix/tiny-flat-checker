import { act, renderHook } from "@testing-library/react";
import { useChecklistDraft } from "./useChecklistDraft.js";

describe("useChecklistDraft", () => {
  beforeEach(() => localStorage.clear());

  it("persists per version and restores after a reload", () => {
    const first = renderHook(() => useChecklistDraft(1));
    act(() => {
      first.result.current.setSign({ title: "Elm" });
      first.result.current.setValue("cracks", true);
    });
    first.unmount();

    const again = renderHook(() => useChecklistDraft(1));
    expect(again.result.current.draft).toEqual({ sign: { title: "Elm", link: "", price: "" }, values: { cracks: true } });
    expect(renderHook(() => useChecklistDraft(2)).result.current.draft.values).toEqual({});

    act(() => again.result.current.clear());
    expect(again.result.current.draft.values).toEqual({});
  });
});
