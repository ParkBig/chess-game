import { Player } from '../../types/interface';
import styled from 'styled-components';
import useGameState from '../../store/useGameState';
import Alert from './alerts/Alert';

import hourGlass from '../../assets/gif/hourGlass.gif';

const TurnNoticeAndAlert = () => {
  const { nowTurn, isStart } = useGameState();

  return (
    <>
      <Wrap turn={nowTurn} isStart={isStart.toString()}>
        <UpperMyTurn turn={nowTurn}>
          <MyTurn>Turn!</MyTurn>
          <img src={hourGlass} />
        </UpperMyTurn>
      </Wrap>
      <Alert />
    </>
  );
};

export default TurnNoticeAndAlert;

const Wrap = styled.div<{ turn: Player; isStart: string }>`
  height: 100%;
  width: 100%;
  display: ${prop => (prop.isStart === 'true' ? null : 'none')};
  position: absolute;
  z-index: 50;
  background: ${prop =>
    prop.turn === 'player-1'
      ? 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(235, 248, 225, 0.1), rgba(235, 248, 225, 0.1), rgba(39, 174, 96, 1))'
      : 'linear-gradient( rgba(39, 174, 96, 1), rgba(235, 248, 225, 0.1), rgba(235, 248, 225, 0.1), rgba(255, 255, 255, 0.1))'};
`;
const UpperMyTurn = styled.div<{ turn: Player }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  gap: 10px;
  top: ${prop => (prop.turn === 'player-1' ? '55%' : '45%')};
  right: 100px;
`;
const MyTurn = styled.div`
  font-size: var(--size-5);
  font-weight: 600;
`;
