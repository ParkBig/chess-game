import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BoardsBlock } from "../types/interface";
import { useBoardList, useUserState } from "../store/configureStore";

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
import { socket } from "./socketIo";
import { useParams } from "react-router-dom";

const BoardBlock = ({boardBlock, index}: BoardsBlock) => {
  const { roomName } = useParams();
  const isBlockPick = useBoardList(state => state.isBlockPick);
  const im = useUserState(state => state.im);
  const nowTurn = useUserState(state => state.nowTurn);
  const setIsBlockPick = useBoardList(state => state.setIsBlockPick);
  const chessMove = useBoardList(state => state.chessMove);
  const setNowTurn = useUserState(state => state.setNowTurn);

  const blockPick = () => {
    if (im === nowTurn) {
      socket.emit("block-pick", { roomName, pickedIndex: index }, setIsBlockPick);
    }
  };
  const moveTo = () => {
    socket.emit("request-move", { roomName, targetIndex: index }, chessMove);
    setNowTurn();
  };
  return (
    <Area isColor={boardBlock.color}>
      {boardBlock.chessmenType ?
        <ChessmenImg
          variants={variants}
          whileHover="hover"
          whileTap="click"
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
        <>
          {isBlockPick.isPick ?
            <CanMoveArea onClick={moveTo}>

            </CanMoveArea>
            :
            null
          }
        </>
        
      }
    </Area>
  )
}

export default React.memo(BoardBlock);

const Area = styled.div<{isColor: boolean}>`
  width: 110px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  background-color: ${prop => prop.isColor ? "#353b48" : "white" };
  position: relative;
  z-index: 100;
`;
const ChessmenImg = styled(motion.img)<{$myChess: boolean | null}>`
  width: 64px;
  height: 64px;
  position: relative;
  z-index: 200;
  pointer-events: ${prop => prop.$myChess ? null : "none"};
  cursor: pointer;
`;
const CanMoveArea = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: tomato;
`;


const variants = {
  hover: {
    // y: -10,
    scale: 1.2
  },
  click: (isChessClick: boolean) => ({
    y: isChessClick ? -10 : 0,
    scale: isChessClick ? 1.2 : 1
  })
}

// 프레이머 모션 레이아웃아이디 버그 발견한거 같음.
