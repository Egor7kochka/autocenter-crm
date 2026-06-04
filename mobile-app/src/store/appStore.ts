import { create } from "zustand";

interface AppStore {
  refreshDashboard: boolean;

  setRefreshDashboard: (
    value: boolean
  ) => void;
}

export const useAppStore =
  create<AppStore>((set) => ({
    refreshDashboard: false,

    setRefreshDashboard: (value) =>
      set({
        refreshDashboard: value,
      }),
  }));