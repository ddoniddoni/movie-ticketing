import { useEffect, useState } from "react";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ReservationData,
  getMovieAndDate,
  getSeat,
  reserveSeat,
} from "../../api/reservation";
import { useNavigate, useParams } from "react-router-dom";
import {
  ButtonContainer,
  Cancel,
  CloseButton,
  Interaction,
  ModalBackdrop,
  ModalView,
  Reserve,
  TextContainer,
} from "../../components/reservation-modal";
import { useUserStore } from "../../store/userStore";

export const formDate = (date: Date) => {
  const temp = new Date(date);
  const year = temp.getFullYear();
  // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const month = (temp.getMonth() + 1).toString().padStart(2, "0");
  const day = temp.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

interface ISeat {
  seat_id: number;
  seat_number: number;
  reservation_status: string;
}

interface Schedule {
  movie_title: string;
  screening_date: Date;
  start_time: string;
  theater_location: string;
  theater_name: string;
  theater_id: number;
  schedule_id: number;
}

export const ReservationPage = () => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const movieId = useParams().id;
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [movieName, setMovieName] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );
  const [seats, setSeats] = useState<ISeat[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<ISeat>();

  const { mutate: reserveMutate, isPending } = useMutation({
    mutationFn: (reservationData: ReservationData) =>
      reserveSeat(reservationData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getSeats"] });
      setShowModal(false);
      alert(data["message"]);
      navigate(`/payment/${user}`);
    },
    onError: (data) => {
      alert(data["message"]);
    },
  });

  const { data: scheduleData } = useQuery({
    queryKey: ["searchMovieAndDate", movieId],
    queryFn: () => getMovieAndDate(movieId),
  });

  const { data: seatsData } = useQuery({
    queryKey: [
      "getSeats",
      selectedSchedule?.schedule_id,
      selectedSchedule?.theater_id,
    ],
    queryFn: () =>
      getSeat({
        scheduleId: selectedSchedule!.schedule_id,
        theaterId: selectedSchedule!.theater_id,
      }),
    enabled: !!selectedSchedule,
  });

  useEffect(() => {
    if (scheduleData) {
      setSchedules(scheduleData);
      setMovieName(scheduleData[0].movie_title);
    }
    console.log(scheduleData);
  }, [scheduleData]);

  useEffect(() => {
    if (seatsData) {
      setSeats(seatsData);
    }
  }, [seatsData]);

  const handleTheaterClick = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
  };

  const toggleSeat = (seat: ISeat) => {
    console.log(seat);
    setSelectedSeat(seat);
    setShowModal(true);
  };
  const onReserveClick = (seat: ISeat | undefined) => {
    const reservationData = {
      userId: useUserStore.getState().user,
      scheduleId: selectedSchedule?.schedule_id,
      seatNumber: seat?.seat_number,
    };
    reserveMutate(reservationData);
  };

  return (
    <>
      <Container>
        <Title>{movieName}</Title>
        <ScheduleWrapper>
          {schedules.map((schedule, index) => (
            <Theater onClick={() => handleTheaterClick(schedule)} key={index}>
              <h1>{schedule.theater_location}</h1>
              <h2>{formDate(schedule.screening_date)}</h2>
              <p>{schedule.start_time.replace(/:\d{2}$/, "")}</p>
            </Theater>
          ))}
        </ScheduleWrapper>
        <SeatContainer>
          {seats.map((seat) => (
            <Seat
              key={seat.seat_id}
              $SeatProps={seat.reservation_status}
              onClick={() => toggleSeat(seat)}
            >
              {seat.seat_number}
            </Seat>
          ))}
        </SeatContainer>
      </Container>
      {showModal && (
        <ModalBackdrop onClick={() => setShowModal(false)}>
          <ModalView onClick={(e) => e.stopPropagation()}>
            <ButtonContainer>
              <CloseButton
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(false);
                }}
              >
                &times;
              </CloseButton>
            </ButtonContainer>
            <TextContainer>
              {selectedSeat?.seat_number}번 자리를 예약하시겠습니까?
            </TextContainer>
            <Interaction>
              <Reserve
                value="reserve"
                onClick={() => onReserveClick(selectedSeat)}
                disabled={isPending}
              >
                예약
              </Reserve>
              <Cancel
                value="cancel"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(false);
                }}
              >
                취소
              </Cancel>
            </Interaction>
          </ModalView>
        </ModalBackdrop>
      )}
    </>
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
  background-color: #d82341;
  border-radius: 15px;
  cursor: pointer;
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
  &:hover {
    opacity: 0.8;
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
  margin-top: 20px;
`;

const SeatContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
  padding: 20px;
  height: 300px;
`;

const Seat = styled.div<{ $SeatProps?: string }>`
  width: 50px;
  height: 50px;
  margin: 5px;
  background-color: ${(props) =>
    props.$SeatProps === "A"
      ? "lightgreen"
      : props.$SeatProps === "P"
      ? "tomato"
      : "gray"};
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.$SeatProps === "A" ? "pointer" : "not-allowed")};
  transition: transform 0.2s;
  border-radius: 5px;
  &:hover {
    transform: scale(1.1);
  }
`;
