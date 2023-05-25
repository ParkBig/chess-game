import styled from "styled-components";
import useGameState from "../../store/useGameState";
import useBoardList from "../../store/useBoardList";
import siftChessmenToMove from "../../utils/siftChessmenToMove";
import { socket } from "../../utils/socketIo";
import useUserState from "../../store/useUserState";
import { useParams } from "react-router-dom";
import { BoardsBlock } from "../../types/interface";

import whiteBishop from "../../assets/chessman/white-bishop.png";
import whiteKing from "../../assets/chessman/white-king.png";
import whiteKnight from "../../assets/chessman/white-knight.png";
import whitePawn from "../../assets/chessman/white-pawn.png";
import whiteQueen from "../../assets/chessman/white-queen.png";
import whiteRook from "../../assets/chessman/white-rook.png";
import blackBishop from "../../assets/chessman/black-bishop.png";
import blackKing from "../../assets/chessman/black-king.png";
import blackKnight from "../../assets/chessman/black-knight.png";
import blackPawn from "../../assets/chessman/black-pawn.png";
import blackQueen from "../../assets/chessman/black-queen.png";
import blackRook from "../../assets/chessman/black-rook.png";

const Chessman = ({ boardBlock, index }: BoardsBlock) => {
  const { roomName } = useParams();
  const { im } = useUserState();
  const { nowTurn, isStart, setGameAlert } = useGameState();
  const { board, setIsBlockPick, setCanMoveArea } = useBoardList();

  const blockPick = () => {
    if (!isStart) {
      setGameAlert("아직 전부 준비되지 않았습니다.");
      return;
    }
    if (im === nowTurn) {
      setCanMoveArea(siftChessmenToMove(index, board));
      socket.emit(
        "block-pick",
        { roomName, pickedIndex: index },
        setIsBlockPick
      );
    }
  };

  return (
    <ChessmanImg
      onClick={blockPick}
      $myChess={boardBlock.isMyChessmen}
      src={
        boardBlock.chessColor === "white"
          ? boardBlock.chessmenType === "bishop"
            ? whiteBishop
            : boardBlock.chessmenType === "king"
            ? whiteKing
            : boardBlock.chessmenType === "knight"
            ? whiteKnight
            : boardBlock.chessmenType === "pawn"
            ? whitePawn
            : boardBlock.chessmenType === "queen"
            ? whiteQueen
            : boardBlock.chessmenType === "rook"
            ? whiteRook
            : null
          : boardBlock.chessColor === "black"
          ? boardBlock.chessmenType === "bishop"
            ? blackBishop
            : boardBlock.chessmenType === "king"
            ? blackKing
            : boardBlock.chessmenType === "knight"
            ? blackKnight
            : boardBlock.chessmenType === "pawn"
            ? blackPawn
            : boardBlock.chessmenType === "queen"
            ? blackQueen
            : boardBlock.chessmenType === "rook"
            ? blackRook
            : null
          : null
      }
    />
  );
};

export default Chessman;

const ChessmanImg = styled.img<{ $myChess: boolean | null }>`
  width: 60%;
  height: 60%;
  position: absolute;
  z-index: 200;
  pointer-events: ${(prop) => (prop.$myChess ? null : "none")};
  cursor: pointer;

  &:hover {
    transform: scale(1.3);
    transition: transform 0.3s ease;
  }
`;
