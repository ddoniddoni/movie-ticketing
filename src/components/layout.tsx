import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useThemeStore } from "../store/themeStore";
import { useTokenStore, useUserStore } from "../store/userStore";

export const Layout = () => {
  const { toggleTheme, theme } = useThemeStore();
  const { user, logout } = useUserStore();
  const navigate = useNavigate();
  const onLogOut = async () => {
    const ok = confirm("정말 로그아웃 하시겠습니까?");
    if (ok) {
      useTokenStore.getState().clearToken();
      logout();
      // localStorage.removeItem("login-token");
      navigate("/login");
    }
  };
  return (
    <Container>
      <Wrapper>
        <HomeButton to={"/"}>Home</HomeButton>
        <PaymentButton to={`/payment/${user}`}>Payment</PaymentButton>
        <MyPageButton to={`/my-page/${user}`}>MyPage</MyPageButton>
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

const PaymentButton = styled(Link)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  right: 40px;
  bottom: 280px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.theme.color};
  color: ${(props) => props.theme.background};
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const HomeButton = styled(Link)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  right: 40px;
  bottom: 360px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.theme.color};
  color: ${(props) => props.theme.background};
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const MyPageButton = styled(Link)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  right: 40px;
  bottom: 200px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.theme.color};
  color: ${(props) => props.theme.background};
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
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
