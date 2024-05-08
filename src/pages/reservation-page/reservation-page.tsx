import { useEffect, useState } from "react";
import styled from "styled-components";
import { MovieScreen } from "../../components/movieScreen";
import { Modal } from "../../components/modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMovieAndDate,
  getSeat,
  updateReservationStatus,
} from "../../api/reservation";
import { useParams } from "react-router-dom";

const formDate = (date: Date) => {
  const temp = new Date(date);
  const year = temp.getFullYear();
  // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const month = (temp.getMonth() + 1).toString().padStart(2, "0");
  const day = temp.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

interface ISeat {
  isReserved: boolean;
  reserve_date: string;
  reserve_name: string;
  seat_number: string;
  status: string;
}

interface Schedule {
  movie_title: string;
  screening_date: Date;
  start_time: string;
  theater_location: string;
  theater_name: string;
}

export const ReservationPage = () => {
  const movieId = useParams().id;
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [movieName, setMovieName] = useState("");

  const { data: scheduleData } = useQuery({
    queryKey: ["searchMovieAndDate", movieId],
    queryFn: () => getMovieAndDate(movieId),
  });

  useEffect(() => {
    if (scheduleData) {
      setSchedule(scheduleData);
      setMovieName(scheduleData[0].movie_title);
    }
  }, [scheduleData]);
  // const queryClient = useQueryClient();
  // const [seats, setSeats] = useState<ISeat[]>([]);
  // const [showModal, setShowModal] = useState(false);
  // const [selectedSeat, setSelectedSeat] = useState({});

  // const mutation = useMutation({
  //   mutationFn: updateReservationStatus,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["seat"] });
  //   },
  // });

  // const handleReservationUpdate = () => {
  //   mutation.mutate({ seat_number: "1A", isReserved: true });
  // };

  // const { data: seatData } = useQuery({
  // queryKey: ["seat"],
  // queryFn: () => getSeat(),
  // refetchOnWindowFocus: false,
  // });

  // useEffect(() => {
  // if (seatData) {
  // setSeats(seatData);
  // }
  // }, [seatData]);

  // const toggleSeatSelection = (seat: any) => {
  // const updatedSeats = seats.map((seat) =>
  //   seat.seat_number === seat_number
  //     ? { ...seat, isReserved: !seat.isReserved }
  //     : seat
  // );
  // setSeats(updatedSeats);
  // setSelectedSeat(seat);
  // setShowModal(true);
  // };

  // const onConfirm = (confirm: any) => {
  //   mutation.mutate({ seat_number: "2", isReserved: 0 });
  //   setShowModal(false);
  // };

  return (
    <Container>
      <Title>{movieName}</Title>
      <ScheduleWrapper>
        {schedule.map((s, index) => (
          <Theater key={index}>
            <h1>{s.theater_location}</h1>
            <h2>{formDate(s.screening_date)}</h2>
            <p>{s.start_time.replace(/:\d{2}$/, "")}</p>
          </Theater>
        ))}
      </ScheduleWrapper>
    </Container>
  );
};
{
  /* <MovieScreen />
      <SeatContainer>
        {seats.map((seat) => (
          <Seat
            key={seat.seat_number}
            $SeatProps={seat.isReserved}
            onClick={() => toggleSeatSelection(seat)}
          >
            {seat.seat_number}
          </Seat>
        ))}
      </SeatContainer>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        seat={selectedSeat}
        onConfirm={onConfirm}
      /> */
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 42px;
  margin-top: 50px;
`;

const Theater = styled.div`
  width: 200px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: aqua;
  h1 {
    font-size: 24px;
    font-weight: 700;
  }
  h2 {
    margin-top: 5px;
    font-size: 20px;
    font-weight: 700;
  }
  p {
    margin-top: 10px;
    font-size: 20px;
    font-weight: 600;
  }
`;

const ScheduleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const SeatContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
  padding: 20px;
  height: 300px;
`;

const Seat = styled.div<{ $SeatProps?: boolean }>`
  width: 50px;
  height: 50px;
  margin: 5px;
  background-color: ${(props) => (props.$SeatProps ? "lightgreen" : "tomato")};
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
  border-radius: 5px;
  &:hover {
    transform: scale(1.1);
  }
`;
