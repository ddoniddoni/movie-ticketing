export interface Theme {
  background: string;
  color: string;
  // 기타 테마 관련 속성
}

export const lightTheme: Theme = {
  background: "#FFFFFF",
  color: "#2f3640",
  // 기타 light 테마 속성
};

export const darkTheme: Theme = {
  background: "#111014",
  color: "#FFFFFF",
  // 기타 dark 테마 속성
};
