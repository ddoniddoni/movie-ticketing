import styled from "styled-components";
import { useUserStore } from "../../store/userStore";
import { useQuery } from "@tanstack/react-query";
import { getUsetReserveData } from "../../api/profile";
import { useEffect } from "react";

export const MyPage = () => {
  const { user } = useUserStore();
  const { data: reserveData } = useQuery({
    queryKey: ["userReserveData", user],
    queryFn: () => getUsetReserveData(user),
  });

  useEffect(() => {
    if (reserveData) {
      console.log(reserveData);
    }
  }, [reserveData]);
  return (
    <Container>
      <h1>예약 내역</h1>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  h1 {
    font-size: 50px;
    margin-top: 30px;
  }
`;
