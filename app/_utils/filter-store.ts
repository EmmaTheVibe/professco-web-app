import { create } from "zustand";

interface FilterState {
  activeTab: string;
  examTypeList: string[];
  setActiveTab: (tab: string) => void;
  setExamTypeList: (list: string[]) => void;
  addExamType: (name: string, selectable: boolean) => void;
}

const useFilterStore = create<FilterState>((set) => ({
  activeTab: "ALL",
  examTypeList: [],

  setActiveTab: (tab) => set({ activeTab: tab }),

  setExamTypeList: (list) => set({ examTypeList: list }),

  addExamType: (name, selectable) => {
    if (!selectable) return;
    set((state) => ({
      examTypeList: state.examTypeList.includes(name)
        ? state.examTypeList.filter((item) => item !== name)
        : [...state.examTypeList, name],
    }));
  },
}));

export default useFilterStore;
