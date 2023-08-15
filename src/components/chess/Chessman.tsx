import { useParams } from 'react-router-dom';
import { BoardsBlock } from 'types/interface';
import useUserState from 'store/useUserState';
import useGameState from 'store/useGameState';
import useBoardList from 'store/useBoardList';
import siftChessmenToMove from 'utils/siftChessmenToMove';
import { socket } from 'utils/socketIo';
import { css } from '@emotion/react';

import whiteBishop from 'assets/chessman/white-bishop.png';
import whiteKing from 'assets/chessman/white-king.png';
import whiteKnight from 'assets/chessman/white-knight.png';
import whitePawn from 'assets/chessman/white-pawn.png';
import whiteQueen from 'assets/chessman/white-queen.png';
import whiteRook from 'assets/chessman/white-rook.png';
import blackBishop from 'assets/chessman/black-bishop.png';
import blackKing from 'assets/chessman/black-king.png';
import blackKnight from 'assets/chessman/black-knight.png';
import blackPawn from 'assets/chessman/black-pawn.png';
import blackQueen from 'assets/chessman/black-queen.png';
import blackRook from 'assets/chessman/black-rook.png';

interface ChessmanImgProps {
  myChess: boolean | null;
}

export default function Chessman({ boardBlock, index }: BoardsBlock) {
  const { roomName } = useParams();
  const { myInfo } = useUserState();
  const { nowTurn, isStart, setGameAlert } = useGameState();
  const { board, setIsBlockPick, setCanMoveArea } = useBoardList();

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

  return (
    <img
      css={chessmanImg({ myChess: boardBlock.isMyChessmen })}
      onClick={blockPick}
      src={
        boardBlock.chessColor === 'white'
          ? boardBlock.chessmenType === 'bishop'
            ? whiteBishop
            : boardBlock.chessmenType === 'king'
            ? whiteKing
            : boardBlock.chessmenType === 'knight'
            ? whiteKnight
            : boardBlock.chessmenType === 'pawn'
            ? whitePawn
            : boardBlock.chessmenType === 'queen'
            ? whiteQueen
            : boardBlock.chessmenType === 'rook'
            ? whiteRook
            : null
          : boardBlock.chessColor === 'black'
          ? boardBlock.chessmenType === 'bishop'
            ? blackBishop
            : boardBlock.chessmenType === 'king'
            ? blackKing
            : boardBlock.chessmenType === 'knight'
            ? blackKnight
            : boardBlock.chessmenType === 'pawn'
            ? blackPawn
            : boardBlock.chessmenType === 'queen'
            ? blackQueen
            : boardBlock.chessmenType === 'rook'
            ? blackRook
            : null
          : null
      }
    />
  );
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
