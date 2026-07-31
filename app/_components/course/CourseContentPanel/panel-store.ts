import { create } from "zustand";

interface PanelState {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const usePanelStore = create<PanelState>((set) => ({
  collapsed: false,
  setCollapsed: (collapsed) => set({ collapsed }),
}));

export default usePanelStore;
