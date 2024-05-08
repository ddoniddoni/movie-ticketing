import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../api/movie";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { MovieCard } from "../../components/movie-card";
import { useUserStore } from "../../store/userStore";

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const { data: movieData } = useQuery({
    queryKey: ["movies"],
    queryFn: () => getMovies(),
  });

  useEffect(() => {
    if (movieData) {
      setMovies(movieData);
    }
  }, [movieData]);
  return (
    <Container>
      <ImageContainer>
        <img src="/movie.jpg" />
      </ImageContainer>
      <MovieContainer>
        <MovieCard movies={movies} />
      </MovieContainer>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 500px;
  margin-top: 30px;
  img {
    width: 100%;
    height: 100%;
    background-size: cover;
    border-radius: 20px;
  }
`;
const MovieContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 380px;
  margin-top: 20px;
`;
