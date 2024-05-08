import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Movie, getMovieFindById } from "../../api/movie";
import styled from "styled-components";
import { getMovieAndDate } from "../../api/reservation";

export const MovieDetail = () => {
  const id = useParams().id;
  const [movie, setMovie] = useState<Movie>();

  const { data: movieData } = useQuery({
    queryKey: ["findByIdAndMovie", id],
    queryFn: () => getMovieFindById(id),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (movieData) {
      setMovie(movieData);
    }
  }, [movieData]);

  return (
    <>
      <Container>
        <TitleContainer>
          <h1>
            {movie?.title}({movie?.original_title})
          </h1>
        </TitleContainer>
        <PosterContainer>
          <ImageContainer>
            <img src={movie?.poster_path} />
          </ImageContainer>
          <TextContainer>
            <p>영화 설명</p>
            <h1>{movie?.overview}</h1>
            <span>
              {movie?.adult !== true ? "청소년 관람 가능" : "청소년 관람 불가"}
            </span>
            <span>인기도 : {movie?.popularity.toFixed(0)}</span>
            <span>개봉일 : {movie?.release_date}</span>
            <span>평점 : {movie?.vote_average.toFixed(2)}</span>
          </TextContainer>
        </PosterContainer>
      </Container>
      <TicketingButton to={`/reserve/${movie?.id}`}>예매</TicketingButton>
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const TitleContainer = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 56px;
    font-weight: 700;
  }
`;
const PosterContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImageContainer = styled.div`
  width: 70%;
  height: 600px;
  img {
    border-radius: 10%;
    width: 100%;
    height: 100%;
    background-size: cover;
  }
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 100%;
  margin-left: 60px;
  h1 {
    margin-top: 5px;
    font-size: 20px;
    letter-spacing: 2px;
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 40px;
    background-color: #d82341;
    border-radius: 10px;
    margin-top: 30px;
    color: white;
  }
`;

const TicketingButton = styled(Link)`
  width: 300px;
  height: 50px;
  position: absolute;
  bottom: 50px;
  border-radius: 10px;
  border: none;
  background-color: #d82341;
  font-size: 24px;
  color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    opacity: 0.9;
  }
`;
