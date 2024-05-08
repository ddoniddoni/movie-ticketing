import styled from "styled-components";

export const Modal = ({ showModal, setShowModal, seat, onConfirm }: any) => {
  const handleClick = (e: any) => {
    const value = e.target.value;
    if (value === "reserve") {
      onConfirm(e.target.value);
    } else {
      e.stopPropagation();
      setShowModal(false);
    }
  };
  return showModal ? (
    <ModalBackdrop onClick={() => setShowModal(false)}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <ButtonContainer>
          <CloseButton
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(false);
            }}
          >
            &times;
          </CloseButton>
        </ButtonContainer>
        <TextContainer>
          {seat.seat_number}번 자리를 예약하시겠습니까?
        </TextContainer>
        <Interaction>
          <Reserve value="reserve" onClick={handleClick}>
            예약
          </Reserve>
          <Cancel value="cancel" onClick={handleClick}>
            취소
          </Cancel>
        </Interaction>
      </ModalView>
    </ModalBackdrop>
  ) : null;
};

const ModalBackdrop = styled.div`
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

const ModalView = styled.div`
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
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  height: 10%;
  width: 100%;
`;
const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;
  width: 100%;
`;
const Interaction = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;
const Reserve = styled.button`
  width: 80px;
  height: 50px;
  background-color: green;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 15px;
`;
const Cancel = styled.button`
  width: 80px;
  height: 50px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 15px;
`;
const CloseButton = styled.button`
  align-self: flex-end;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;
