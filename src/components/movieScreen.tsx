import styled from "styled-components";

export const MovieScreen = () => {
  return (
    <Container>
      {/* <Title>A STAR IS BORN</Title> */}
      <Screen></Screen>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
`;
// const Title = styled.h1``;
const Screen = styled.div`
  display: flex;
  width: 800px;
  height: 100%;
  background-image: url("/movie.jpg");
  background-size: cover;
  transform: perspective(1000px) rotateX(-20deg);
`;
