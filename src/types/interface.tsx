export interface Board {
  row: number;
  col: string;
  color: boolean;
  chessmenType: Chessmen;
  isMyChessmen: boolean | null;
  chessColor: ChessColor;
};

export interface ChatList {
  me: boolean;
  chat: string;
  time: number
};

export interface BoardsBlock {
  boardBlock: Board;
  index: number;
}

export interface UseBoardList {
  board: Board[];
  isBlockPick: IsBlockPick;
  setBoard: (boardSetting: Board[]) => void;
  setIsBlockPick: (pickedIndex: number) => void;
  chessMove: (afterIndex: number) => void;
}

export interface UseUserState {
  im: Player | "";
  nowTurn: Player;
  setIm: (player: Player) => void;
  setNowTurn: () => void;
}

export type Player = "player-1" | "player-2";

export type ChessColor = "black" | "white" | null;;

export type Chessmen = "king" | "queen" | "rook" | "bishop" | "knight" | "pawn" | null;

type IsBlockPick = {
  isPick: boolean;
  pickedIndex: number | null;
}
