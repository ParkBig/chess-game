import { Board } from "../types/interface";

const siftChessmenToMove = (pickedIndex: number, board: Board[]) => {
  const canMoveArea = [];
  const pickedBlock = board[pickedIndex];

  if (pickedBlock.chessmenType === "pawn") {
    if (pickedBlock.chessColor === "white") {
      if (!board[pickedIndex -8].chessmenType) {
        canMoveArea.push(pickedIndex - 8);
        if (!board[pickedIndex -16].chessmenType && pickedBlock.row === 7) {
          canMoveArea.push(pickedIndex - 16);
        }
      }
      if (board[pickedIndex - 9].chessColor === "black" || board[pickedIndex - 7].chessColor === "black") {
        if (pickedIndex === 8 || pickedIndex === 16 || pickedIndex === 24 || pickedIndex === 32 || pickedIndex === 40 || pickedIndex === 48) {
          if (board[pickedIndex - 7].chessColor === "black") {
            canMoveArea.push(pickedIndex -7);
          }
        }
        if (pickedIndex === 15 || pickedIndex === 23 || pickedIndex === 31 || pickedIndex === 39 || pickedIndex === 47 || pickedIndex === 55) {
          if (board[pickedIndex - 9].chessColor === "black") {
            canMoveArea.push(pickedIndex - 9);
          }
        } else {
          if (board[pickedIndex - 9].chessColor === "black") {
            canMoveArea.push(pickedIndex - 9);
          }
          if (board[pickedIndex - 7].chessColor === "black") {
            canMoveArea.push(pickedIndex - 7);
          }
        }
      }
    };
    if (pickedBlock.chessColor === "black") {
      if (!board[pickedIndex +8].chessmenType) {
        canMoveArea.push(pickedIndex + 8);
        if (!board[pickedIndex + 16].chessmenType && pickedBlock.row === 2) {
          canMoveArea.push(pickedIndex + 16);
        }
      }
      if (board[pickedIndex + 9].chessColor === "white" || board[pickedIndex + 7].chessColor === "white") {
        if (pickedIndex === 8 || pickedIndex === 16 || pickedIndex === 24 || pickedIndex === 32 || pickedIndex === 40 || pickedIndex === 48) {
          if (board[pickedIndex + 9].chessColor === "white") {
            canMoveArea.push(pickedIndex -9);
          }
        }
        if (pickedIndex === 15 || pickedIndex === 23 || pickedIndex === 31 || pickedIndex === 39 || pickedIndex === 47 || pickedIndex === 55) {
          if (board[pickedIndex + 7].chessColor === "white") {
            canMoveArea.push(pickedIndex + 7);
          }
        } else {
          if (board[pickedIndex + 9].chessColor === "white") {
            canMoveArea.push(pickedIndex + 9);
          }
          if (board[pickedIndex + 7].chessColor === "white") {
            canMoveArea.push(pickedIndex + 7);
          }
        }
      }
    }
  };


  return canMoveArea;
};

export default siftChessmenToMove;