import styled from "styled-components";
import { useUserStore } from "../../store/userStore";
import { useQuery } from "@tanstack/react-query";
import { getUserReserveData } from "../../api/profile";
import { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { formDate } from "../reservation-page/reservation-page";

interface UserReserve {
  title: string;
  screening_date: Date;
  start_time: string;
  seat_number: number;
  name: string;
}

export const MyPage = () => {
  const { user } = useUserStore();
  const [userReserveData, setReserveData] = useState<UserReserve[]>([]);

  const { data: reserveData } = useQuery({
    queryKey: ["userReserveData", user],
    queryFn: () => getUserReserveData(user),
  });

  useEffect(() => {
    if (reserveData) {
      setReserveData(reserveData);
    }
  }, [reserveData]);
  return (
    <Container>
      <Title>예약 내역</Title>
      {userReserveData.length > 0 ? (
        userReserveData.map((data, index) => (
          <ReserveContainer key={index}>
            <QRcodeContainer>
              <QRCode
                value={JSON.stringify({ 영화제목: data.title })}
                style={{ width: "100%", height: "100%" }}
              />
            </QRcodeContainer>
            <Des>
              <h1>영화 : {data.title}</h1>
              <h2>상영날짜 : {formDate(data.screening_date)}</h2>
              <h2>상영시간 : {data.start_time.substring(0, 5)}</h2>
              <h2>상영관 : {data.name}</h2>
              <h2>좌석 : {data.seat_number}번</h2>
            </Des>
          </ReserveContainer>
        ))
      ) : (
        <h1 style={{ marginTop: "20px" }}>예약 내역이 없습니다.</h1>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 42px;
  font-weight: 600;
  margin-top: 20px;
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

const QRcodeContainer = styled.div`
  display: flex;
  width: 100px;
  height: 100px;
`;

const Des = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 100px;
  flex-direction: column;
`;
