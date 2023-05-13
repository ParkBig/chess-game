import { Board } from "../types/interface";

const kingAlgorithm = (
  pickedBlock: Board,
  pickedIndex: number,
  board: Board[]
) => {
  const canMoveArea: number[] = [];

  if (pickedBlock.chessColor === "white") {
    if (
      !board[pickedIndex - 9]?.chessmenType ||
      board[pickedIndex - 9].chessColor === "black"
    ) {
      canMoveArea.push(pickedIndex - 9);
    }
    if (
      !board[pickedIndex - 8]?.chessmenType ||
      board[pickedIndex - 8].chessColor === "black"
    ) {
      canMoveArea.push(pickedIndex - 8);
    }
    if (
      !board[pickedIndex - 7]?.chessmenType ||
      board[pickedIndex - 7].chessColor === "black"
    ) {
      canMoveArea.push(pickedIndex - 7);
    }
    if (
      !board[pickedIndex - 1]?.chessmenType ||
      board[pickedIndex - 1].chessColor === "black"
    ) {
      canMoveArea.push(pickedIndex - 1);
    }
    if (
      !board[pickedIndex + 1]?.chessmenType ||
      board[pickedIndex + 1].chessColor === "black"
    ) {
      canMoveArea.push(pickedIndex + 1);
    }
    if (
      !board[pickedIndex + 7]?.chessmenType ||
      board[pickedIndex + 7].chessColor === "black"
    ) {
      canMoveArea.push(pickedIndex + 7);
    }
    if (
      !board[pickedIndex + 8]?.chessmenType ||
      board[pickedIndex + 8].chessColor === "black"
    ) {
      canMoveArea.push(pickedIndex + 8);
    }
    if (
      !board[pickedIndex + 9]?.chessmenType ||
      board[pickedIndex + 9].chessColor === "black"
    ) {
      canMoveArea.push(pickedIndex + 9);
    }
  }

  if (pickedBlock.chessColor === "black") {
    if (
      !board[pickedIndex - 9]?.chessmenType ||
      board[pickedIndex - 9].chessColor === "white"
    ) {
      canMoveArea.push(pickedIndex - 9);
    }
    if (
      !board[pickedIndex - 8]?.chessmenType ||
      board[pickedIndex - 8].chessColor === "white"
    ) {
      canMoveArea.push(pickedIndex - 8);
    }
    if (
      !board[pickedIndex - 7]?.chessmenType ||
      board[pickedIndex - 7].chessColor === "white"
    ) {
      canMoveArea.push(pickedIndex - 7);
    }
    if (
      !board[pickedIndex - 1]?.chessmenType ||
      board[pickedIndex - 1].chessColor === "white"
    ) {
      canMoveArea.push(pickedIndex - 1);
    }
    if (
      !board[pickedIndex + 1]?.chessmenType ||
      board[pickedIndex + 1].chessColor === "white"
    ) {
      canMoveArea.push(pickedIndex + 1);
    }
    if (
      !board[pickedIndex + 7]?.chessmenType ||
      board[pickedIndex + 7].chessColor === "white"
    ) {
      canMoveArea.push(pickedIndex + 7);
    }
    if (
      !board[pickedIndex + 8]?.chessmenType ||
      board[pickedIndex + 8].chessColor === "white"
    ) {
      canMoveArea.push(pickedIndex + 8);
    }
    if (
      !board[pickedIndex + 9]?.chessmenType ||
      board[pickedIndex + 9].chessColor === "white"
    ) {
      canMoveArea.push(pickedIndex + 9);
    }
  }

  return canMoveArea;
};

export default kingAlgorithm;
