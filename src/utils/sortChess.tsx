import { ChessColor, Chessmen } from 'types/interface';

import whiteBishop from 'assets/chessman/white-bishop.png';
import whiteKing from 'assets/chessman/white-king.png';
import whiteKnight from 'assets/chessman/white-knight.png';
import whitePawn from 'assets/chessman/white-pawn.png';
import whiteQueen from 'assets/chessman/white-queen.png';
import whiteRook from 'assets/chessman/white-rook.png';
import blackBishop from 'assets/chessman/black-bishop.png';
import blackKing from 'assets/chessman/black-king.png';
import blackKnight from 'assets/chessman/black-knight.png';
import blackPawn from 'assets/chessman/black-pawn.png';
import blackQueen from 'assets/chessman/black-queen.png';
import blackRook from 'assets/chessman/black-rook.png';

const sortChess = (chessColor: ChessColor, chessmenType: Chessmen) => {
  if (chessColor === 'white') {
    if (chessmenType === 'bishop') {
      return whiteBishop;
    }
    if (chessmenType === 'king') {
      return whiteKing;
    }
    if (chessmenType === 'knight') {
      return whiteKnight;
    }
    if (chessmenType === 'pawn') {
      return whitePawn;
    }
    if (chessmenType === 'queen') {
      return whiteQueen;
    }
    if (chessmenType === 'rook') {
      return whiteRook;
    }
  }
  if (chessColor === 'black') {
    if (chessmenType === 'bishop') {
      return blackBishop;
    }
    if (chessmenType === 'king') {
      return blackKing;
    }
    if (chessmenType === 'knight') {
      return blackKnight;
    }
    if (chessmenType === 'pawn') {
      return blackPawn;
    }
    if (chessmenType === 'queen') {
      return blackQueen;
    }
    if (chessmenType === 'rook') {
      return blackRook;
    }
  }
  if (!chessColor) {
    return null;
  }
};

export default sortChess;
