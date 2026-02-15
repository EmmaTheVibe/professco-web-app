"use client";

import { create } from "zustand";

const useFilterStore = create((set) => ({
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
