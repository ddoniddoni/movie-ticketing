import axios from "axios";

export const getTimer = async () => {
  const { data } = await axios.get(
    `http://localhost:4000/api/time/timer/start-timer`
  );
  return data;
};
