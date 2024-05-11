import axios from "axios";

export interface ReservationData {
  userId: string | null;
  scheduleId: number | undefined;
  seatNumber: number | undefined;
}

export interface GetSeatsParams {
  scheduleId: number;
  theaterId: number;
}

export const getSeat = async (params: GetSeatsParams) => {
  const { scheduleId, theaterId } = params;
  const { data } = await axios.get(
    "http://localhost:4000/api/reservations/seat",
    {
      params: {
        schedule_id: scheduleId,
        theater_id: theaterId,
      },
    }
  );
  return data;
};

export const reserveSeat = async (reservationData: ReservationData) => {
  const { data } = await axios.post(
    "http://localhost:4000/api/reservations/reserve",
    reservationData
  );
  return data;
};

export const getMovieAndDate = async (movieId: string | undefined) => {
  const { data } = await axios.get(
    `http://localhost:4000/api/reservations/date/${movieId}`
  );
  return data;
};

// export const reserveSeat = async ()
