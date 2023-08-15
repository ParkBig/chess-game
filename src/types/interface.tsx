export interface Board {
  row: number;
  col: Column | string;
  color: boolean;
  chessmenType: Chessmen;
  isMyChessmen: boolean | null;
  chessColor: ChessColor;
}

export interface ChatList {
  me: boolean;
  chat: string;
  time: number;
}

export interface BoardsBlock {
  boardBlock: Board;
  index: number;
}

export interface UseBoardList {
  board: Board[];
  isBlockPick: IsBlockPick;
  canMoveArea: number[];
  gotcha: Gotcha;
  setBoard: (boardSetting: Board[]) => void;
  setIsBlockPick: (pickedIndex: number) => void;
  setCanMoveArea: (siftAndCanMove: number[]) => void;
  chessMove: (afterIndex: number) => void;
  setGotCha: () => void;
}

export interface UseUserState {
  myInfo: MyInfo;
  allLoginInfo: Players;
  setMyPlayerNum: (player: Player) => void;
  setMyReady: (force?: Force) => void;
  setMyIsInGame: (boolean: boolean) => void;
  setMyLogInInfo: (nickname: string, password: string) => void;
  setMyOdds: (isWin: boolean) => void;
  setAllLoginInfo: (opponentInfo: Players) => void;
}

export interface UseGameState {
  isStart: boolean;
  nowTurn: Player;
  gameAlert: GameAlert;
  setIsStart: (force?: Force) => void;
  setNowTurn: (force?: Player) => void;
  setGameAlert: (detail: string) => void;
}

export type Player = 'player-1' | 'player-2';

export type ChessColor = 'black' | 'white' | null;

export type Chessmen = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn' | null;

export type Column = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';

type Force = 'true' | 'false';

type IsBlockPick = {
  isPick: boolean;
  pickedIndex: number | null;
};

type Gotcha = {
  got: boolean;
  caughtChessColor: 'black' | 'white' | null;
  chessmenType: Chessmen;
};

type GameAlert = {
  onAlert: boolean;
  alertDetail: string;
};

type LoginState = {
  anyErr: boolean;
  isLogin: boolean;
  nickname: string;
  win: number;
  lose: number;
};

type MyInfo = {
  loginInfo: LoginInfo;
  gameInfo: GameInfo;
};

type LoginInfo = {
  anyErr: boolean;
  isLogin: boolean;
  nickname: string;
  win: number;
  lose: number;
};

type GameInfo = {
  playerNum: Player | '';
  imReady: boolean;
  isInGame: boolean;
};

type Players = {
  'player-1': LoginState | null;
  'player-2': LoginState | null;
};
