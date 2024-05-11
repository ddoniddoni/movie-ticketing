import axios from "axios";

export const getUsetReserveData = async (userId: string | null) => {
  const { data } = await axios.get(
    `http://localhost:4000/api/profile/user/${userId}`
  );
  return data;
};
