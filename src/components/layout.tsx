import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useThemeStore } from "../store/themeStore";
import { useTokenStore, useUserStore } from "../store/userStore";

export const Layout = () => {
  const { toggleTheme, theme } = useThemeStore();
  const navigate = useNavigate();
  const onLogOut = async () => {
    const ok = confirm("정말 로그아웃 하시겠습니까?");
    if (ok) {
      useTokenStore.getState().clearToken();
      useUserStore.getState().logout();
      // localStorage.removeItem("login-token");
      navigate("/login");
    }
  };
  return (
    <Container>
      <Wrapper>
        <ThemeButton onClick={toggleTheme}>
          {theme === "Light" ? "Dark" : "Light"}
        </ThemeButton>
        <LogoutButton onClick={onLogOut}>Logout</LogoutButton>
        {/* <LogoutButton onClick={onLogOut}>Logout</LogoutButton> */}
        <Outlet />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 1240px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
`;

const ThemeButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  right: 40px;
  bottom: 120px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.theme.color};
  color: ${(props) => props.theme.background};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;
const LogoutButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  right: 40px;
  bottom: 40px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.theme.color};
  color: ${(props) => props.theme.background};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;
