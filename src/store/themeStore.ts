import { StateCreator, create } from "zustand";
import { PersistOptions, createJSONStorage, persist } from "zustand/middleware";

type Persist<T> = (
  config: StateCreator<T>,
  options: PersistOptions<T>
) => StateCreator<T>;

interface ThemeState {
  theme: "Light" | "Dark";
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>(
  (persist as Persist<ThemeState>)(
    (set) => ({
      theme: "Light",
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "Light" ? "Dark" : "Light" })),
    }),
    {
      name: "theme",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
