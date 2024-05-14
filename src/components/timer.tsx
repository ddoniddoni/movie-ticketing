import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getTimer } from "../api/timer";
import { useNavigate } from "react-router-dom";

interface Timer {
  currentTime: Date;
}

export const Timer = () => {
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState<number>(() => {
    const storedStartTime = localStorage.getItem("startTime");
    return storedStartTime ? parseInt(storedStartTime, 10) : Date.now();
  });

  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  const { data: timeData } = useQuery({
    queryKey: ["getTimer"],
    queryFn: () => getTimer(),
  });

  useEffect(() => {
    if (timeData) {
      const serverTime = new Date(timeData.startTime).getTime();
      // localStorage에 startTime이 없을 경우에만 서버 시간으로 설정
      if (!localStorage.getItem("startTime")) {
        localStorage.setItem("startTime", serverTime.toString());
        setStartTime(serverTime);
      }
    }
  }, [timeData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 남은 시간 계산
  const timeLeft = Math.max(0, startTime + 5 * 60000 - currentTime);
  const minutesLeft = Math.floor(timeLeft / 60000);
  const secondsLeft = Math.floor((timeLeft % 60000) / 1000);
  useEffect(() => {
    if (timeLeft === 0) {
      localStorage.removeItem("startTime");
      alert("5분동안 최종 예약이 이루어지지 않아 Home으로 돌아갑니다.");
      navigate("/");
    }
  }, [timeLeft]);

  return (
    <TimerContainer>
      남은 시간: {minutesLeft}분 {secondsLeft}초
    </TimerContainer>
  );
};
const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  font-size: 30px;
  color: #ffffff;
`;
