import { motion } from "framer-motion";
import { BoardsBlock } from "../types/interface";
import { socket } from "../lib/socketIo";
import { useParams } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import siftChessmenToMove from "../lib/siftChessmenToMove";
import useBoardList from "../store/useBoardList";
import useUserState from "../store/useUserState";
import useGameState from "../store/useGameState";

import whiteBishop from "../assets/png/white-bishop.png";
import whiteKing from "../assets/png/white-king.png";
import whiteKnight from "../assets/png/white-knight.png";
import whitePawn from "../assets/png/white-pawn.png";
import whiteQueen from "../assets/png/white-queen.png";
import whiteRook from "../assets/png/white-rook.png";
import blackBishop from "../assets/png/black-bishop.png";
import blackKing from "../assets/png/black-king.png";
import blackKnight from "../assets/png/black-knight.png";
import blackPawn from "../assets/png/black-pawn.png";
import blackQueen from "../assets/png/black-queen.png";
import blackRook from "../assets/png/black-rook.png";

const BoardBlock = ({boardBlock, index}: BoardsBlock) => {
  const { roomName } = useParams();
  const im = useUserState(state => state.im);
  const { nowTurn, isStart, setNowTurn, setGameAlert } = useGameState();
  const { board, isBlockPick, canMoveArea, setIsBlockPick, chessMove, setCanMoveArea } = useBoardList();
  
  const blockPick = () => {
    if (!isStart) {
      setGameAlert("아직 전부 준비되지 않았습니다.");
      return;
    }
    if (im === nowTurn) {
      setCanMoveArea(siftChessmenToMove(index, board));
      socket.emit("block-pick", { roomName, pickedIndex: index }, setIsBlockPick);
    }
  };

  const moveTo = () => {
    socket.emit("request-move", { roomName, targetIndex: index }, chessMove);
    setNowTurn();
  };
  return (
    <Area isColor={boardBlock.color}>
      {isBlockPick.isPick && canMoveArea.includes(index) && im === nowTurn ?
        <CanMoveArea onClick={moveTo}></CanMoveArea>
        :
        null
      }
      {boardBlock.chessmenType ?
        <ChessmenImg
          variants={variants}
          whileHover="hover"
          onClick={blockPick}
          $myChess={boardBlock.isMyChessmen}
          src={
            boardBlock.chessColor === "white" ? (
            boardBlock.chessmenType === "bishop" ? whiteBishop :
            boardBlock.chessmenType === "king" ? whiteKing :
            boardBlock.chessmenType === "knight" ? whiteKnight :
            boardBlock.chessmenType === "pawn" ? whitePawn :
            boardBlock.chessmenType === "queen" ? whiteQueen :
            boardBlock.chessmenType === "rook" ? whiteRook :
            null
            ) :
            boardBlock.chessColor === "black" ? (
            boardBlock.chessmenType === "bishop" ? blackBishop :
            boardBlock.chessmenType === "king" ? blackKing :
            boardBlock.chessmenType === "knight" ? blackKnight :
            boardBlock.chessmenType === "pawn" ? blackPawn :
            boardBlock.chessmenType === "queen" ? blackQueen :
            boardBlock.chessmenType === "rook" ? blackRook :
            null
            ) :
            null
          }
        />
        :
        null
      }
    </Area>
  )
}

export default React.memo(BoardBlock);

const Area = styled.div<{isColor: boolean}>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  background-color: ${prop => prop.isColor ? "#353b48" : "white" };
  position: relative;
  z-index: 100;
`;
const ChessmenImg = styled(motion.img)<{$myChess: boolean | null}>`
  width: 60%;
  height: 60%;
  position: absolute;
  z-index: 200;
  pointer-events: ${prop => prop.$myChess ? null : "none"};
  cursor: pointer;
`;
const CanMoveArea = styled.div`
  width: 80%;
  height: 80%;
  border-radius: 50px;
  background-color: #44bd32;
  position: absolute;
  z-index: 300;
  opacity: 0.5;
`;

const variants = {
  hover: {
    scale: 1.3
  },
};
