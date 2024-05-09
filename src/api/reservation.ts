import axios from "axios";

export interface ReservationParams {
  seat_number: string;
  // isReserved: boolean;
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

export const updateReservationStatus = async (reservationData: any) => {
  const { data } = await axios.put(
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
