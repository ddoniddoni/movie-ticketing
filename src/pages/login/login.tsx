import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Container,
  Error,
  Form,
  Input,
  Switcher,
  Wrapper,
} from "../../components/auth-components";
import { useMutation } from "@tanstack/react-query";
import { ILoginUser, loginUser } from "../../api/user";
import { useTokenStore, useUserStore } from "../../store/userStore";

interface Error {
  response: {
    data: {
      message: string;
    };
  };
}

export const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: (user: ILoginUser) => loginUser(user),
    onSuccess: (data) => {
      useUserStore.getState().login(data.loginId);
      useTokenStore.getState().setToken(data.token);
      // localStorage.setItem("login-token", data.token);
      navigate("/");
    },
    onError: (error: Error) => {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "id") {
      setId(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || id === "" || password === "") return;
    try {
      setLoading(true);
      mutation.mutate({ id, password });
    } catch (e) {
      setError("error");
    } finally {
      setLoading(false);
    }
    // 계정 생성
    // 사용자 이름 지정
    // 홈페이지로 리다이렉션
  };
  return (
    <Container>
      <Wrapper>
        <Title>영화 예매 사이트 😊</Title>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={onChange}
            name="id"
            value={id}
            placeholder="ID"
            type="id"
            required
          />
          <Input
            onChange={onChange}
            value={password}
            name="password"
            placeholder="Password"
            type="password"
            required
          />
          <Input type="submit" value={isLoading ? "Loading..." : "Log in"} />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
          계정이 없으신가요 ? <Link to="/create-account">계정 생성</Link>
        </Switcher>
      </Wrapper>
    </Container>
  );
};

const Title = styled.h1`
  font-size: 42px;
`;
