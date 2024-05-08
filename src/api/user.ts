import axios from "axios";

export interface IUser {
  name: string;
  password: string;
  id: string;
}

export interface ILoginUser {
  id: string;
  password: string;
}

export const loginUser = async (userData: ILoginUser) => {
  const { data } = await axios.post(
    "http://localhost:4000/api/user/login",
    userData
  );
  return data;
};

export const signUpUser = async (userData: IUser) => {
  const { data } = await axios.post(
    "http://localhost:4000/api/user/signup",
    userData
  );
  return data;
};
