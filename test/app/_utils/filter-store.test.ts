import { beforeEach, describe, expect, it } from "vitest";
import useFilterStore from "@/app/_utils/filter-store";

const initialState = useFilterStore.getState();

beforeEach(() => {
  useFilterStore.setState(initialState, true);
});

describe("filter-store", () => {
  it("defaults to the 'ALL' tab with no exam types selected", () => {
    const { activeTab, examTypeList } = useFilterStore.getState();
    expect(activeTab).toBe("ALL");
    expect(examTypeList).toEqual([]);
  });

  it("setActiveTab replaces the active tab", () => {
    useFilterStore.getState().setActiveTab("ICAN");

    expect(useFilterStore.getState().activeTab).toBe("ICAN");
  });

  it("setExamTypeList replaces the whole list", () => {
    useFilterStore.getState().setExamTypeList([1, 2, 3]);

    expect(useFilterStore.getState().examTypeList).toEqual([1, 2, 3]);
  });

  it("addExamType adds a selectable id that isn't already selected", () => {
    useFilterStore.getState().addExamType(5, true);

    expect(useFilterStore.getState().examTypeList).toEqual([5]);
  });

  it("addExamType toggles off an id that's already selected", () => {
    useFilterStore.getState().addExamType(5, true);
    useFilterStore.getState().addExamType(5, true);

    expect(useFilterStore.getState().examTypeList).toEqual([]);
  });

  it("addExamType is a no-op when selectable is false, regardless of current state", () => {
    useFilterStore.getState().addExamType(5, false);
    expect(useFilterStore.getState().examTypeList).toEqual([]);

    useFilterStore.getState().addExamType(5, true);
    useFilterStore.getState().addExamType(5, false);
    expect(useFilterStore.getState().examTypeList).toEqual([5]);
  });
});
