import { Board } from "../types/interface";

const bishopAlgorithm = (
  pickedBlock: Board,
  pickedIndex: number,
  board: Board[]
) => {
  const canMoveArea: number[] = [];

  if (pickedBlock.chessColor === "white") {
    for (let i = 1; i < pickedBlock.row; i++) {
      if (
        !board[pickedIndex - 8 * i - i]?.chessmenType ||
        board[pickedIndex - 8 * i - i]?.chessColor === "black"
      ) {
        if (pickedBlock?.row - i === board[pickedIndex - 8 * i - i]?.row) {
          canMoveArea.push(pickedIndex - 8 * i - i);
        }
      }
      if (board[pickedIndex - 8 * i - i]?.chessmenType) {
        break;
      }
    }
    for (let i = 1; i < pickedBlock.row; i++) {
      if (
        !board[pickedIndex - 8 * i + i]?.chessmenType ||
        board[pickedIndex - 8 * i + i]?.chessColor === "black"
      ) {
        if (pickedBlock?.row - i === board[pickedIndex - 8 * i + i]?.row) {
          canMoveArea.push(pickedIndex - 8 * i + i);
        }
      }
      if (board[pickedIndex - 8 * i + i]?.chessmenType) {
        break;
      }
    }
    for (let i = 1; i < 9 - pickedBlock.row; i++) {
      if (
        !board[pickedIndex + 8 * i - i]?.chessmenType ||
        board[pickedIndex + 8 * i - i]?.chessColor === "black"
      ) {
        if (pickedBlock?.row + i === board[pickedIndex + 8 * i - i]?.row) {
          canMoveArea.push(pickedIndex + 8 * i - i);
        }
      }
      if (board[pickedIndex + 8 * i - i]?.chessmenType) {
        break;
      }
    }
    for (let i = 1; i < 9 - pickedBlock.row; i++) {
      if (
        !board[pickedIndex + 8 * i + i]?.chessmenType ||
        board[pickedIndex + 8 * i + i]?.chessColor === "black"
      ) {
        if (pickedBlock?.row + i === board[pickedIndex + 8 * i + i]?.row) {
          canMoveArea.push(pickedIndex + 8 * i + i);
        }
      }
      if (board[pickedIndex + 8 * i + i]?.chessmenType) {
        break;
      }
    }
  }

  if (pickedBlock.chessColor === "black") {
    for (let i = 1; i < pickedBlock.row; i++) {
      if (
        !board[pickedIndex - 8 * i - i]?.chessmenType ||
        board[pickedIndex - 8 * i - i]?.chessColor === "white"
      ) {
        if (pickedBlock?.row - i === board[pickedIndex - 8 * i - i]?.row) {
          canMoveArea.push(pickedIndex - 8 * i - i);
        }
      }
      if (board[pickedIndex - 8 * i - i]?.chessmenType) {
        break;
      }
    }
    for (let i = 1; i < pickedBlock.row; i++) {
      if (
        !board[pickedIndex - 8 * i + i]?.chessmenType ||
        board[pickedIndex - 8 * i + i]?.chessColor === "white"
      ) {
        if (pickedBlock?.row - i === board[pickedIndex - 8 * i + i]?.row) {
          canMoveArea.push(pickedIndex - 8 * i + i);
        }
      }
      if (board[pickedIndex - 8 * i + i]?.chessmenType) {
        break;
      }
    }
    for (let i = 1; i < 9 - pickedBlock.row; i++) {
      if (
        !board[pickedIndex + 8 * i - i]?.chessmenType ||
        board[pickedIndex + 8 * i - i]?.chessColor === "white"
      ) {
        if (pickedBlock?.row + i === board[pickedIndex + 8 * i - i]?.row) {
          canMoveArea.push(pickedIndex + 8 * i - i);
        }
      }
      if (board[pickedIndex + 8 * i - i]?.chessmenType) {
        break;
      }
    }
    for (let i = 1; i < 9 - pickedBlock.row; i++) {
      if (
        !board[pickedIndex + 8 * i + i]?.chessmenType ||
        board[pickedIndex + 8 * i + i]?.chessColor === "white"
      ) {
        if (pickedBlock?.row + i === board[pickedIndex + 8 * i + i]?.row) {
          canMoveArea.push(pickedIndex + 8 * i + i);
        }
      }
      if (board[pickedIndex + 8 * i + i]?.chessmenType) {
        break;
      }
    }
  }

  return canMoveArea;
};

export default bishopAlgorithm;
