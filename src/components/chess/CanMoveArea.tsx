import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import useGameState from 'store/useGameState';
import useBoardList from 'store/useBoardList';
import { socket } from 'utils/socketIo';

interface Props {
  index: number;
}

export default function CanMoveArea(props: Props) {
  const { roomName } = useParams();
  const { setNowTurn } = useGameState();
  const { chessMove } = useBoardList();

  const moveTo = () => {
    socket.emit('request-move', { roomName, targetIndex: props.index }, chessMove);
    setNowTurn();
  };

  return <div css={moveArea} onClick={moveTo} />;
}

const moveArea = css`
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
