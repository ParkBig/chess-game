import styled from 'styled-components';
import useGameState from '../../../store/useGameState';

import alertImg from '../../../assets/background/alertImg.png';

const GameAlert = () => {
  const { gameAlert } = useGameState();

  return <Modal>{gameAlert.alertDetail}</Modal>;
};

export default GameAlert;

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
