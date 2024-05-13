import styled, { keyframes } from "styled-components";

export const Loading = () => {
  return (
    <div>
      <Spinner />
      <p>Loading...</p>
    </div>
  );
};
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// styled-components를 사용하여 스피너 스타일 정의
const Spinner = styled.div`
  border: 5px solid rgba(255, 255, 255, 0.2); // 스피너 경계선 색
  border-top-color: #ffffff; // 스피너 상단 색
  border-radius: 50%; // 원형 모양
  width: 50px; // 너비
  height: 50px; // 높이
  animation: ${spin} 1s linear infinite; // 애니메이션 적용
`;
