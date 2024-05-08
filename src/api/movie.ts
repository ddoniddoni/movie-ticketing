import axios from "axios";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genere_ids: [];
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  overview: string;
  original_title: string;
  popularity: number;
  release_date: string;
}

export interface Movies {
  movies: Movie[];
}

export const getMovies = async () => {
  const { data } = await axios.get("http://localhost:4000/api/movies");
  return data;
};

export const getMovieFindById = async (id: string | undefined) => {
  const { data } = await axios.get(
    `http://localhost:4000/api/movies/movie/${id}`
  );
  return data;
};
