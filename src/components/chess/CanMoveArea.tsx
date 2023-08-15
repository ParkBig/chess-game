import styled from 'styled-components';
import { socket } from '../../utils/socketIo';
import { useParams } from 'react-router-dom';
import useGameState from '../../store/useGameState';
import useBoardList from '../../store/useBoardList';

const CanMoveArea = ({ index }: { index: number }) => {
  const { roomName } = useParams();
  const { setNowTurn } = useGameState();
  const { chessMove } = useBoardList();

  const moveTo = () => {
    socket.emit('request-move', { roomName, targetIndex: index }, chessMove);
    setNowTurn();
  };

  return <MoveArea onClick={moveTo} />;
};

export default CanMoveArea;

const MoveArea = styled.div`
  width: 70%;
  height: 70%;
  border-radius: 50px;
  background-color: #44bd32;
  position: absolute;
  z-index: 300;
  opacity: 0.5;

  &:hover {
    transform: scale(1.2);
    transition: transform 0.5s ease;
  }
`;
