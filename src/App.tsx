import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useThemeStore } from "./store/themeStore";
import { darkTheme, lightTheme } from "./theme";
import { ReservationPage } from "./pages/reservation-page/reservation-page";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/login/login";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CreateAccount } from "./pages/login/create-account";
import { Home } from "./pages/home/home";
import { ProtectedRoute } from "./components/protected-route";
import { Layout } from "./components/layout";
import { MovieDetail } from "./pages/detail/movie-detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/reserve/:id",
        element: <ReservationPage />,
      },
      {
        path: "/movie/:id",
        element: <MovieDetail />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);

const GlobalStyles = createGlobalStyle`
${reset};
* {
  box-sizing: border-box;
}
body {
  font-family: "Jua", sans-serif;
}
::-webkit-scrollbar {
  display:none;
}
`;

export const App = () => {
  const queryClient = new QueryClient();
  const { theme } = useThemeStore();
  const currentTheme = theme === "Light" ? lightTheme : darkTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <Wrapper>
        <ThemeProvider theme={currentTheme}>
          <GlobalStyles />
          <RouterProvider router={router} />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </Wrapper>
    </QueryClientProvider>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
