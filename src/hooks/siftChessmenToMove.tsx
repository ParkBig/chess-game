import { Board } from "../types/interface";
import stringColToNum from "./stringColToNum";

const siftChessmenToMove = (pickedIndex: number, board: Board[]) => {
  const canMoveArea = [];
  const pickedBlock = board[pickedIndex];
  const changeColToNumber = stringColToNum(board[pickedIndex].col);

  // pawn movement
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

  // rook movement
  if (pickedBlock.chessmenType === "rook") {
    if (pickedBlock.chessColor === "white") {
      for (let i = 1; i < board[pickedIndex].row; i++) {
        if (!board[pickedIndex - 8*i].chessmenType || board[pickedIndex - 8*i].chessColor === "black") {
          if (board[pickedIndex - 8*i + 8].chessColor === "black") {
            break;
          }
          canMoveArea.push(pickedIndex - 8*i);
        } else {
          break;
        }
      }
      for (let i = 1; i < 9 - board[pickedIndex].row; i++) {
        if (!board[pickedIndex + 8*i].chessmenType || board[pickedIndex + 8*i].chessColor === "black") {
          if (board[pickedIndex + 8*i - 8].chessColor === "black") {
            break;
          }
          canMoveArea.push(pickedIndex + 8*i);
        } else {
          break;
        }
      }
      for (let i = 1; i < changeColToNumber[0]; i++) {
        if (!board[pickedIndex - i].chessmenType || board[pickedIndex - i].chessColor === "black") {
          if (board[pickedIndex - i + 1].chessColor === "black") {
            break;
          }
          canMoveArea.push(pickedIndex - i);
        } else {
          break;
        }
      }
      for (let i = 1; i < 9 - changeColToNumber[0]; i++) {
        if (!board[pickedIndex + i].chessmenType || board[pickedIndex + i].chessColor === "black") {
          if (board[pickedIndex + i - 1].chessColor === "black") {
            break;
          }
          canMoveArea.push(pickedIndex + i);
        } else {
          break;
        }
      }
    };
    if (pickedBlock.chessColor === "black") {
      for (let i = 1; i < 9 - board[pickedIndex].row; i++) {
        if (!board[pickedIndex + 8*i].chessmenType || board[pickedIndex + 8*i].chessColor === "white") {
          if (board[pickedIndex + 8*i - 8].chessColor === "white") {
            break;
          }
          canMoveArea.push(pickedIndex + 8*i);
        } else {
          break;
        }
      }
      for (let i = 1; i < board[pickedIndex].row; i++) {
        if (!board[pickedIndex - 8*i].chessmenType || board[pickedIndex - 8*i].chessColor === "white") {
          if (board[pickedIndex - 8*i + 8].chessColor === "white") {
            break;
          }
          canMoveArea.push(pickedIndex - 8*i);
        } else {
          break;
        }
      }
      for (let i = 1; i < 9 - changeColToNumber[0]; i++) {
        if (!board[pickedIndex + i].chessmenType || board[pickedIndex + i].chessColor === "white") {
          if (board[pickedIndex + i - 1].chessColor === "white") {
            break;
          }
          canMoveArea.push(pickedIndex + i);
        } else {
          break;
        }
      }
      for (let i = 1; i < changeColToNumber[0]; i++) {
        if (!board[pickedIndex - i].chessmenType || board[pickedIndex - i].chessColor === "white") {
          if (board[pickedIndex - i + 1].chessColor === "white") {
            break;
          }
          canMoveArea.push(pickedIndex - i);
        } else {
          break;
        }
      }
    }
  }

  // knight movement
  if (pickedBlock.chessmenType === "knight") {
    if (pickedBlock.chessColor === "white") {
      for (let i = 1; i < 3; i++) {
        if (!board[pickedIndex - (8 * i) - 3 + i]?.chessmenType || board[pickedIndex - (8 * i) - 3 + i]?.chessColor === "black") {
          if (board[pickedIndex]?.row - i === board[pickedIndex - (8 * i) - 3 + i]?.row) {
            canMoveArea.push(pickedIndex - (8 * i) - 3 + i);
          }
        }
        if (!board[pickedIndex - (8 * i) + 3 - i]?.chessmenType || board[pickedIndex - (8 * i) + 3 - i]?.chessColor === "black") {
          if (board[pickedIndex]?.row - i === board[pickedIndex - (8 * i) + 3 - i]?.row) {
            canMoveArea.push(pickedIndex - (8 * i) + 3 - i);
          }
        }
        if (!board[pickedIndex + (8 * i) + 3 - i]?.chessmenType || board[pickedIndex + (8 * i) + 3 - i]?.chessColor === "black") {
          if (board[pickedIndex]?.row + i === board[pickedIndex + (8 * i) + 3 - i]?.row) {
            canMoveArea.push(pickedIndex + (8 * i) + 3 - i);
          }
        }
        if (!board[pickedIndex + (8 * i) - 3 + i]?.chessmenType || board[pickedIndex + (8 * i) - 3 + i]?.chessColor === "black") {
          if (board[pickedIndex]?.row + i === board[pickedIndex + (8 * i) - 3 + i]?.row) {
            canMoveArea.push(pickedIndex + (8 * i) - 3 + i);
          }
        }
      }
    };
    if (pickedBlock.chessColor === "black") {
      for (let i = 1; i < 3; i++) {
        if (!board[pickedIndex - (8 * i) - 3 + i]?.chessmenType || board[pickedIndex - (8 * i) - 3 + i]?.chessColor === "white") {
          if (board[pickedIndex]?.row - i === board[pickedIndex - (8 * i) - 3 + i]?.row) {
            canMoveArea.push(pickedIndex - (8 * i) - 3 + i);
          }
        }
        if (!board[pickedIndex - (8 * i) + 3 - i]?.chessmenType || board[pickedIndex - (8 * i) + 3 - i]?.chessColor === "white") {
          if (board[pickedIndex]?.row - i === board[pickedIndex - (8 * i) + 3 - i]?.row) {
            canMoveArea.push(pickedIndex - (8 * i) + 3 - i);
          }
        }
        if (!board[pickedIndex + (8 * i) + 3 - i]?.chessmenType || board[pickedIndex + (8 * i) + 3 - i]?.chessColor === "white") {
          if (board[pickedIndex]?.row + i === board[pickedIndex + (8 * i) + 3 - i]?.row) {
            canMoveArea.push(pickedIndex + (8 * i) + 3 - i);
          }
        }
        if (!board[pickedIndex + (8 * i) - 3 + i]?.chessmenType || board[pickedIndex + (8 * i) - 3 + i]?.chessColor === "white") {
          if (board[pickedIndex]?.row + i === board[pickedIndex + (8 * i) - 3 + i]?.row) {
            canMoveArea.push(pickedIndex + (8 * i) - 3 + i);
          }
        }
      }
    }
  }
  
  // bishop movement
  if (pickedBlock.chessmenType === "bishop") {
    if (pickedBlock.chessColor === "white") {
      for (let i = 1; i < board[pickedIndex].row; i++) {
        if (!board[pickedIndex - (8 * i) - i]?.chessmenType || board[pickedIndex - (8 * i) - i]?.chessColor === "black") {
          if (board[pickedIndex]?.row - i === board[pickedIndex - (8 * i) - i]?.row) {
            canMoveArea.push(pickedIndex - (8 * i) - i);
          }
        }
        if (board[pickedIndex - (8 * i) - i]?.chessmenType) {
          break;
        };
      }
      for (let i = 1; i < board[pickedIndex].row; i++) {
        if (!board[pickedIndex - (8 * i) + i]?.chessmenType || board[pickedIndex - (8 * i) + i]?.chessColor === "black") {
          if (board[pickedIndex]?.row - i === board[pickedIndex - (8 * i) + i]?.row) {
            canMoveArea.push(pickedIndex - (8 * i) + i);
          }
        }
        if (board[pickedIndex - (8 * i) + i]?.chessmenType) {
          break;
        };
      }
      for (let i = 1; i < 9 - board[pickedIndex].row; i++) {
        if (!board[pickedIndex + (8 * i) - i]?.chessmenType || board[pickedIndex + (8 * i) - i]?.chessColor === "black") {
          if (board[pickedIndex]?.row + i === board[pickedIndex + (8 * i) - i]?.row) {
            canMoveArea.push(pickedIndex + (8 * i) - i);
          }
        }
        if (board[pickedIndex + (8 * i) - i]?.chessmenType) {
          break;
        };
      }
      for (let i = 1; i < 9 - board[pickedIndex].row; i++) {
        if (!board[pickedIndex + (8 * i) + i]?.chessmenType || board[pickedIndex + (8 * i) + i]?.chessColor === "black") {
          if (board[pickedIndex]?.row + i === board[pickedIndex + (8 * i) + i]?.row) {
            canMoveArea.push(pickedIndex + (8 * i) + i);
          }
        }
        if (board[pickedIndex + (8 * i) + i]?.chessmenType) {
          break;
        };
      }
    }
    if (pickedBlock.chessColor === "black") {
      for (let i = 1; i < board[pickedIndex].row; i++) {
        if (!board[pickedIndex - (8 * i) - i]?.chessmenType || board[pickedIndex - (8 * i) - i]?.chessColor === "white") {
          if (board[pickedIndex]?.row - i === board[pickedIndex - (8 * i) - i]?.row) {
            canMoveArea.push(pickedIndex - (8 * i) - i);
          }
        }
        if (board[pickedIndex - (8 * i) - i]?.chessmenType) {
          break;
        };
      }
      for (let i = 1; i < board[pickedIndex].row; i++) {
        if (!board[pickedIndex - (8 * i) + i]?.chessmenType || board[pickedIndex - (8 * i) + i]?.chessColor === "white") {
          if (board[pickedIndex]?.row - i === board[pickedIndex - (8 * i) + i]?.row) {
            canMoveArea.push(pickedIndex - (8 * i) + i);
          }
        }
        if (board[pickedIndex - (8 * i) + i]?.chessmenType) {
          break;
        };
      }
      for (let i = 1; i < 9 - board[pickedIndex].row; i++) {
        if (!board[pickedIndex + (8 * i) - i]?.chessmenType || board[pickedIndex + (8 * i) - i]?.chessColor === "white") {
          if (board[pickedIndex]?.row + i === board[pickedIndex + (8 * i) - i]?.row) {
            canMoveArea.push(pickedIndex + (8 * i) - i);
          }
        }
        if (board[pickedIndex + (8 * i) - i]?.chessmenType) {
          break;
        };
      }
      for (let i = 1; i < 9 - board[pickedIndex].row; i++) {
        if (!board[pickedIndex + (8 * i) + i]?.chessmenType || board[pickedIndex + (8 * i) + i]?.chessColor === "white") {
          if (board[pickedIndex]?.row + i === board[pickedIndex + (8 * i) + i]?.row) {
            canMoveArea.push(pickedIndex + (8 * i) + i);
          }
        }
        if (board[pickedIndex + (8 * i) + i]?.chessmenType) {
          break;
        };
      }
    }
  }

  return canMoveArea;
};

export default siftChessmenToMove;