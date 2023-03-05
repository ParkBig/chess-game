import { Board } from "../types/interface";
import stringColToNum from "./stringColToNum";

const rookAlgorithm = (pickedBlock: Board, pickedIndex: number, board: Board[]) => {
  const canMoveArea: number[] = [];
  const changeColToNumber = stringColToNum(pickedBlock.col);

  if (pickedBlock.chessColor === "white") {
    for (let i = 1; i < pickedBlock.row; i++) {
      if (!board[pickedIndex - (8 * i)].chessmenType || board[pickedIndex - (8 * i)].chessColor === "black") {
        if (board[pickedIndex - (8 * i) + 8].chessColor === "black") {
          break;
        };
        canMoveArea.push(pickedIndex - (8 * i));
      } else {
        break;
      };
    };
    for (let i = 1; i < 9 - pickedBlock.row; i++) {
      if (!board[pickedIndex + (8 * i)].chessmenType || board[pickedIndex + (8 * i)].chessColor === "black") {
        if (board[pickedIndex + (8 * i) - 8].chessColor === "black") {
          break;
        };
        canMoveArea.push(pickedIndex + (8 * i));
      } else {
        break;
      };
    };
    for (let i = 1; i < changeColToNumber[0]; i++) {
      if (!board[pickedIndex - i].chessmenType || board[pickedIndex - i].chessColor === "black") {
        if (board[pickedIndex - i + 1].chessColor === "black") {
          break;
        };
        canMoveArea.push(pickedIndex - i);
      } else {
        break;
      };
    };
    for (let i = 1; i < 9 - changeColToNumber[0]; i++) {
      if (!board[pickedIndex + i].chessmenType || board[pickedIndex + i].chessColor === "black") {
        if (board[pickedIndex + i - 1].chessColor === "black") {
          break;
        };
        canMoveArea.push(pickedIndex + i);
      } else {
        break;
      };
    };
  };

  if (pickedBlock.chessColor === "black") {
    for (let i = 1; i < 9 - pickedBlock.row; i++) {
      if (!board[pickedIndex + (8 * i)].chessmenType || board[pickedIndex + (8 * i)].chessColor === "white") {
        if (board[pickedIndex + (8 * i) - 8].chessColor === "white") {
          break;
        };
        canMoveArea.push(pickedIndex + (8 * i));
      } else {
        break;
      };
    };
    for (let i = 1; i < pickedBlock.row; i++) {
      if (!board[pickedIndex - (8 * i)].chessmenType || board[pickedIndex - (8 * i)].chessColor === "white") {
        if (board[pickedIndex - (8 * i) + 8].chessColor === "white") {
          break;
        };
        canMoveArea.push(pickedIndex - (8 * i));
      } else {
        break;
      };
    };
    for (let i = 1; i < 9 - changeColToNumber[0]; i++) {
      if (!board[pickedIndex + i].chessmenType || board[pickedIndex + i].chessColor === "white") {
        if (board[pickedIndex + i - 1].chessColor === "white") {
          break;
        };
        canMoveArea.push(pickedIndex + i);
      } else {
        break;
      };
    };
    for (let i = 1; i < changeColToNumber[0]; i++) {
      if (!board[pickedIndex - i].chessmenType || board[pickedIndex - i].chessColor === "white") {
        if (board[pickedIndex - i + 1].chessColor === "white") {
          break;
        };
        canMoveArea.push(pickedIndex - i);
      } else {
        break;
      };
    };
  };

  return canMoveArea;
};

export default rookAlgorithm;
