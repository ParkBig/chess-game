import { useParams } from 'react-router-dom';
import { BoardsBlock } from 'types/interface';
import useUserState from 'store/useUserState';
import useGameState from 'store/useGameState';
import useBoardList from 'store/useBoardList';
import siftChessmenToMove from 'utils/siftChessmenToMove';
import { socket } from 'utils/socketIo';
import { css } from '@emotion/react';
import sortChess from 'utils/sortChess';

interface ChessmanImgProps {
  myChess: boolean | null;
}

export default function Chessman({ boardBlock, index }: BoardsBlock) {
  const { roomName } = useParams();
  const { myInfo } = useUserState();
  const { nowTurn, isStart, setGameAlert } = useGameState();
  const { board, setIsBlockPick, setCanMoveArea } = useBoardList();

  const chessImg = sortChess(boardBlock.chessColor, boardBlock.chessmenType);

  const blockPick = () => {
    if (!isStart) {
      setGameAlert('아직 전부 준비되지 않았습니다.');
      return;
    }
    if (myInfo.gameInfo.playerNum === nowTurn) {
      setCanMoveArea(siftChessmenToMove(index, board));
      socket.emit('block-pick', { roomName, pickedIndex: index }, setIsBlockPick);
    }
  };

  return <img css={chessmanImg({ myChess: boardBlock.isMyChessmen })} onClick={blockPick} src={chessImg} />;
}

const chessmanImg = (props: ChessmanImgProps) => css`
  width: 60%;
  height: 60%;
  position: absolute;
  z-index: 200;
  pointer-events: ${props.myChess ? null : 'none'};
  cursor: pointer;

  &:hover {
    transform: scale(1.3);
    transition: transform 0.3s ease;
  }
`;
