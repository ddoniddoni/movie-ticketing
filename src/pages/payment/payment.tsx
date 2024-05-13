import styled from "styled-components";
import { Timer } from "../../components/timer";
import { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import { useQuery } from "@tanstack/react-query";
import { getUserPaymentData } from "../../api/profile";
import { formDate } from "../reservation-page/reservation-page";

interface UserPayment {
  title: string;
  screening_date: Date;
  start_time: string;
  seat_number: number;
  name: string;
}

export const Payment = () => {
  const { user } = useUserStore();
  const [userPaymentData, setUserPaymentData] = useState<UserPayment[]>([]);

  const { data: paymentData } = useQuery({
    queryKey: ["userPaymentData", user],
    queryFn: () => getUserPaymentData(user),
  });

  useEffect(() => {
    if (paymentData) {
      setUserPaymentData(paymentData);
    }
  }, [paymentData]);
  return (
    <Container>
      <Timer />
      {userPaymentData.length > 0
        ? userPaymentData.map((data, index) => (
            <ReserveContainer key={index}>
              <Des>
                <h1>영화 : {data.title}</h1>
                <h2>상영날짜 : {formDate(data.screening_date)}</h2>
                <h2>상영시간 : {data.start_time.substring(0, 5)}</h2>
                <h2>상영관 : {data.name}</h2>
                <h2>좌석 : {data.seat_number}번</h2>
              </Des>
            </ReserveContainer>
          ))
        : "결제할 내역이 없습니다."}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ReserveContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 150px;
  background-color: #d82341;
  margin-top: 20px;
  border-radius: 20px;
`;

const Des = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 100px;
  flex-direction: column;
`;
