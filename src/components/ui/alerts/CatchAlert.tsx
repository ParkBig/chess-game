import styled from "styled-components";
import useBoardList from "../../../store/useBoardList";

import alertImg from "../../../assets/background/alertImg.png";

const CatchAlert = () => {
  const { gotcha } = useBoardList();

  return (
    <>
      <Modal>
        {`${gotcha.caughtChessColor}의 ${gotcha.chessmenType}이 잡혔습니다!`}
      </Modal>
    </>
  );
};

export default CatchAlert;

const Modal = styled.div`
  border: 5px solid gold;
  border-radius: 10px;
  padding: 40px 80px 40px 80px;
  background-image: url(${alertImg});
  background-size: cover;
  color: gold;
  font-size: var(--size-5);
  font-weight: 600;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.6);
  position: absolute;
  z-index: 400;
`;
