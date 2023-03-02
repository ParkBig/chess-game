import { Board, ChessColor, Chessmen, Player } from "../types/interface";

const boardList = (player: Player) => {

  const setMe = (i: number, player: Player): boolean | null => {
    if (player === "player-1") {
      if (i === 0 || i === 1) {
        return false;
      };
      if (i === 6 || i === 7) {
        return true;
      };
      return null;
    }
    else {
      if (i === 0 || i === 1) {
        return true;
      };
      if (i === 6 || i === 7) {
        return false;
      };
      return null;
    }
  };

  const setChessmen = (i: number, j: number): Chessmen => {
    if ((j === 0 || j === 7) && (i === 0 || i === 7)) {
      return "rook";
    };
    if ((j === 1 || j === 6) && (i === 0 || i === 7)) {
      return "knight";
    };
    if ((j === 2 || j === 5) && (i === 0 || i === 7)) {
      return "bishop";
    };
    if ((j === 3) && (i === 0 || i === 7)) {
      return "queen";
    };
    if ((j === 4) && (i === 0 || i === 7)) {
      return "king";
    };
    if (i === 1 || i ===6) {
      return "pawn";
    };
    return null;
  };
  
  const setChessColor = (i: number): ChessColor => {
    if (i === 0 || i === 1) {
      return "black";
    }
    if (i === 6 || i === 7 ) {
      return "white";
    }
    return null;
  };
  
  const board: Board[] = [];
  
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      board.push({
        row: i + 1,
        col: String.fromCharCode(97 + j),
        color: (i + j) % 2 == 0 ? false : true,
        isMyChessmen: setMe(i, player),
        chessmenType: setChessmen(i, j),
        chessColor: setChessColor(i),
      });
    }
  };

  return board;
}

export default boardList;
