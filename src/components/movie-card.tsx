import styled from "styled-components";
import { Movies } from "../api/movie";
import { Link } from "react-router-dom";

export const MovieCard = ({ movies }: Movies) => {
  return (
    <>
      {movies.map((movie) => (
        <Container key={movie.id}>
          <Link to={`/movie/${movie.id}`}>
            <Wrapper>
              <ImageContainer>
                <img src={movie.poster_path} alt="" />
              </ImageContainer>
              <TextContainer>
                <Title>{movie.title}</Title>
                <Des>평점 : {movie.vote_average.toFixed(2)}</Des>
              </TextContainer>
            </Wrapper>
          </Link>
        </Container>
      ))}
    </>
  );
};

const Container = styled.div`
  a {
    text-decoration: none;
    color: ${(props) => props.theme.color};
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 300px;
  cursor: pointer;
`;
const ImageContainer = styled.div`
  display: flex;
  width: 170px;
  height: 80%;
  img {
    border-radius: 10%;
    &:hover {
      opacity: 0.7;
    }
  }
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 170px;
  height: 20%;
`;
const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
`;
const Des = styled.span`
  font-weight: 600;
`;
