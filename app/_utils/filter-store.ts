import { create } from "zustand";

interface FilterState {
  activeTab: string;
  examTypeList: number[];
  setActiveTab: (tab: string) => void;
  setExamTypeList: (list: number[]) => void;
  addExamType: (id: number, selectable: boolean) => void;
}

const useFilterStore = create<FilterState>((set) => ({
  activeTab: "ALL",
  examTypeList: [],

  setActiveTab: (tab) => set({ activeTab: tab }),

  setExamTypeList: (list) => set({ examTypeList: list }),

  addExamType: (id, selectable) => {
    if (!selectable) return;
    set((state) => ({
      examTypeList: state.examTypeList.includes(id)
        ? state.examTypeList.filter((item) => item !== id)
        : [...state.examTypeList, id],
    }));
  },
}));

export default useFilterStore;
