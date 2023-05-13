import { Board } from "../types/interface";
import bishopAlgorithm from "./bishopAlgorithm";
import kingAlgorithm from "./kingAlgorithm";
import knightAlgorithm from "./knightAlgorithm";
import pawnAlgorithm from "./pawnAlgorithm";
import queenAlgorithm from "./queenAlgorithm";
import rookAlgorithm from "./rookAlgorithm";

const siftChessmenToMove = (pickedIndex: number, board: Board[]) => {
  const canMoveArea: number[] = [];
  const pickedBlock = board[pickedIndex];

  // pawn movement
  if (pickedBlock.chessmenType === "pawn") {
    canMoveArea.push(...pawnAlgorithm(pickedBlock, pickedIndex, board));
  }

  // rook movement
  if (pickedBlock.chessmenType === "rook") {
    canMoveArea.push(...rookAlgorithm(pickedBlock, pickedIndex, board));
  }

  // knight movement
  if (pickedBlock.chessmenType === "knight") {
    canMoveArea.push(...knightAlgorithm(pickedBlock, pickedIndex, board));
  }

  // bishop movement
  if (pickedBlock.chessmenType === "bishop") {
    canMoveArea.push(...bishopAlgorithm(pickedBlock, pickedIndex, board));
  }

  // queen movement
  if (pickedBlock.chessmenType === "queen") {
    canMoveArea.push(...queenAlgorithm(pickedBlock, pickedIndex, board));
  }

  // king movement
  if (pickedBlock.chessmenType === "king") {
    canMoveArea.push(...kingAlgorithm(pickedBlock, pickedIndex, board));
  }

  return canMoveArea;
};

export default siftChessmenToMove;
