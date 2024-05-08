import { StateCreator, create } from "zustand";
import { PersistOptions, createJSONStorage, persist } from "zustand/middleware";

type Persist<T> = (
  config: StateCreator<T>,
  options: PersistOptions<T>
) => StateCreator<T>;

export interface User {
  user: string | null;
  isLoggedIn: boolean;
  login: (userId: string) => void;
  logout: () => void;
}

export interface Token {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

// export const useUserStore = create<User>((set) => ({
//   user: null, // 사용자 정보 초기값은 null
//   isLoggedIn: false, // 로그인 상태
//   login: (userId: string) => set(() => ({ user: userId, isLoggedIn: true })), // 로그인 처리
//   logout: () => set(() => ({ user: null, isLoggedIn: false })), // 로그아웃 처리
// }));

export const useUserStore = create<User>(
  (persist as Persist<User>)(
    (set) => ({
      user: null, // 사용자 정보 초기값은 null
      isLoggedIn: false, // 로그인 상태
      login: (userId: string) =>
        set(() => ({ user: userId, isLoggedIn: true })), // 로그인 처리
      logout: () => set(() => ({ user: null, isLoggedIn: false })), // 로그아웃 처리
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useTokenStore = create<Token>(
  (persist as Persist<Token>)(
    (set) => ({
      token: null, // 토큰 저장을 위한 상태
      setToken: (token: string) => set(() => ({ token: token })), // 토큰 업데이트를 위한 액션
      clearToken: () => set(() => ({ token: null })),
    }),
    {
      name: "token",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// export const useThemeStore = create<ThemeState>(
//   (persist as Persist<ThemeState>)(
//     (set) => ({
//       theme: "Light",
//       toggleTheme: () =>
//         set((state) => ({ theme: state.theme === "Light" ? "Dark" : "Light" })),
//     }),
//     {
//       name: "theme",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );
