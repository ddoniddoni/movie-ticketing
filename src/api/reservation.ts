import axios from "axios";

export interface ReservationParams {
  seat_number: string;
  // isReserved: boolean;
}

export const getSeat = async () => {
  const { data } = await axios.get(
    "http://localhost:4000/api/reservations/seat"
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
