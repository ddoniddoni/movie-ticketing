import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../../components/auth-components";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { IUser, signUpUser } from "../../api/user";

export const CreateAccount = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: (user: IUser) => signUpUser(user),
    onSuccess: () => {
      navigate("/login");
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "id") {
      setId(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || id === "" || password === "") return;
    try {
      setLoading(true);
      mutation.mutate({
        name,
        id,
        password,
      });
      //   navigate("/");
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
        <Title>Join 😊</Title>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={onChange}
            name="name"
            value={name}
            placeholder="Name"
            type="text"
            required
          />
          <Input
            onChange={onChange}
            name="id"
            value={id}
            placeholder="ID"
            type="text"
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
          <Input type="submit" value={isLoading ? "Loading..." : "계정 생성"} />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
          이미 계정이 있으신가요? <Link to="/login">Log in</Link>
        </Switcher>
      </Wrapper>
    </Container>
  );
};
