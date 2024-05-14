import styled from "styled-components";
import { Timer } from "../../components/timer";
import { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserPaymentData } from "../../api/profile";
import { formDate } from "../reservation-page/reservation-page";
import { CompleteReserveData, completeReserve } from "../../api/reservation";
import { useNavigate } from "react-router-dom";

interface UserPayment {
  title: string;
  screening_date: Date;
  start_time: string;
  seat_number: number;
  name: string;
  id: number;
}

export const Payment = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [userPaymentData, setUserPaymentData] = useState<UserPayment[]>([]);

  const { mutate: completeReserveMutate } = useMutation({
    mutationFn: (completeReserveData: CompleteReserveData) =>
      completeReserve(completeReserveData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["completeReserve"] });
      alert(data["message"]);
      localStorage.removeItem("startTime");
      navigate("/");
    },
    onError: (data) => {
      alert(data["message"]);
    },
  });

  const { data: paymentData } = useQuery({
    queryKey: ["userPaymentData", user],
    queryFn: () => getUserPaymentData(user),
  });

  useEffect(() => {
    if (paymentData) {
      setUserPaymentData(paymentData);
    }
  }, [paymentData]);

  const reserveClick = (data: UserPayment) => {
    const reserveData = {
      id: data.id,
      userId: user,
    };
    completeReserveMutate(reserveData);
  };

  return (
    <Container>
      {userPaymentData.length > 0
        ? userPaymentData.map((data, index) => (
            <div key={index}>
              <ReserveContainer>
                <Timer />
                <Des>
                  <h1>영화 : {data.title}</h1>
                  <h2>상영날짜 : {formDate(data.screening_date)}</h2>
                  <h2>상영시간 : {data.start_time.substring(0, 5)}</h2>
                  <h2>상영관 : {data.name}</h2>
                  <h2>좌석 : {data.seat_number}번</h2>
                </Des>
              </ReserveContainer>
              <ReserveButton onClick={() => reserveClick(data)}>
                예약
              </ReserveButton>
            </div>
          ))
        : "결제할 내역이 없습니다."}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ReserveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 200px;
  background-color: #d82341;
  margin-top: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const Des = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  height: 150px;
  color: #ffffff;
  font-size: 20px;
`;

const ReserveButton = styled.button`
  width: 350px;
  height: 50px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border: none;
  background-color: green;
  color: white;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;
