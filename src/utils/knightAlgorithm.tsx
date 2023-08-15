import { Board } from '../types/interface';

const knightAlgorithm = (pickedBlock: Board, pickedIndex: number, board: Board[]) => {
  const canMoveArea: number[] = [];

  if (pickedBlock.chessColor === 'white') {
    for (let i = 1; i < 3; i++) {
      if (
        !board[pickedIndex - 8 * i - 3 + i]?.chessmenType ||
        board[pickedIndex - 8 * i - 3 + i]?.chessColor === 'black'
      ) {
        if (pickedBlock?.row - i === board[pickedIndex - 8 * i - 3 + i]?.row) {
          canMoveArea.push(pickedIndex - 8 * i - 3 + i);
        }
      }
      if (
        !board[pickedIndex - 8 * i + 3 - i]?.chessmenType ||
        board[pickedIndex - 8 * i + 3 - i]?.chessColor === 'black'
      ) {
        if (pickedBlock?.row - i === board[pickedIndex - 8 * i + 3 - i]?.row) {
          canMoveArea.push(pickedIndex - 8 * i + 3 - i);
        }
      }
      if (
        !board[pickedIndex + 8 * i + 3 - i]?.chessmenType ||
        board[pickedIndex + 8 * i + 3 - i]?.chessColor === 'black'
      ) {
        if (pickedBlock?.row + i === board[pickedIndex + 8 * i + 3 - i]?.row) {
          canMoveArea.push(pickedIndex + 8 * i + 3 - i);
        }
      }
      if (
        !board[pickedIndex + 8 * i - 3 + i]?.chessmenType ||
        board[pickedIndex + 8 * i - 3 + i]?.chessColor === 'black'
      ) {
        if (pickedBlock?.row + i === board[pickedIndex + 8 * i - 3 + i]?.row) {
          canMoveArea.push(pickedIndex + 8 * i - 3 + i);
        }
      }
    }
  }

  if (pickedBlock.chessColor === 'black') {
    for (let i = 1; i < 3; i++) {
      if (
        !board[pickedIndex - 8 * i - 3 + i]?.chessmenType ||
        board[pickedIndex - 8 * i - 3 + i]?.chessColor === 'white'
      ) {
        if (pickedBlock?.row - i === board[pickedIndex - 8 * i - 3 + i]?.row) {
          canMoveArea.push(pickedIndex - 8 * i - 3 + i);
        }
      }
      if (
        !board[pickedIndex - 8 * i + 3 - i]?.chessmenType ||
        board[pickedIndex - 8 * i + 3 - i]?.chessColor === 'white'
      ) {
        if (pickedBlock?.row - i === board[pickedIndex - 8 * i + 3 - i]?.row) {
          canMoveArea.push(pickedIndex - 8 * i + 3 - i);
        }
      }
      if (
        !board[pickedIndex + 8 * i + 3 - i]?.chessmenType ||
        board[pickedIndex + 8 * i + 3 - i]?.chessColor === 'white'
      ) {
        if (pickedBlock?.row + i === board[pickedIndex + 8 * i + 3 - i]?.row) {
          canMoveArea.push(pickedIndex + 8 * i + 3 - i);
        }
      }
      if (
        !board[pickedIndex + 8 * i - 3 + i]?.chessmenType ||
        board[pickedIndex + 8 * i - 3 + i]?.chessColor === 'white'
      ) {
        if (pickedBlock?.row + i === board[pickedIndex + 8 * i - 3 + i]?.row) {
          canMoveArea.push(pickedIndex + 8 * i - 3 + i);
        }
      }
    }
  }

  return canMoveArea;
};

export default knightAlgorithm;
