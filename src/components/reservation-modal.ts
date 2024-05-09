import styled from "styled-components";

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalView = styled.div`
  width: 500px;
  height: 300px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  color: #000000;
`;
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  height: 10%;
  width: 100%;
`;
export const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;
  width: 100%;
`;
export const Interaction = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;
export const Reserve = styled.button`
  width: 80px;
  height: 50px;
  background-color: green;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 15px;
`;
export const Cancel = styled.button`
  width: 80px;
  height: 50px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 15px;
`;
export const CloseButton = styled.button`
  align-self: flex-end;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;
