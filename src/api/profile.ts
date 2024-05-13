import axios from "axios";

export const getUserReserveData = async (userId: string | null) => {
  const { data } = await axios.get(
    `http://localhost:4000/api/profile/user/${userId}`
  );
  return data;
};

export const getUserPaymentData = async (userId: string | null) => {
  const { data } = await axios.get(
    `http://localhost:4000/api/payment/user/${userId}`
  );
  return data;
};
