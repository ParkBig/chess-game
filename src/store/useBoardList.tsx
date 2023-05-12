import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Board, UseBoardList } from "../types/interface";

// 체스 상태 관련
const useBoardList = create(
  immer<UseBoardList>((set) => ({
    board: [],
    isBlockPick: {isPick: false, pickedIndex: null},
    canMoveArea: [],
    gotcha: { got: false, caughtChessColor: null, chessmenType: null },
    setBoard: (boardSetting: Board[]) => (
      set((state) => {
        state.board = boardSetting;
      })
    ),
    setIsBlockPick: (pickedIndex) => (
      set((state) => {
        if (state.isBlockPick.pickedIndex === pickedIndex) {
          state.isBlockPick.isPick = !state.isBlockPick.isPick;
          state.isBlockPick.pickedIndex = null;
        } else {
          state.isBlockPick.isPick = true;
          state.isBlockPick.pickedIndex = pickedIndex;
        }
      })
    ),
    setCanMoveArea: (siftAndCanMove) => (
      set((state) => {
        state.canMoveArea = siftAndCanMove;
      })
    ),
    setGotCha: () => (
      set((state) => {
        state.gotcha = { got: false, caughtChessColor: null, chessmenType: null }
      })
    ),
    chessMove: (afterIndex) => (
      set((state) => {
        if (state.isBlockPick.isPick && state.isBlockPick.pickedIndex) {
          const afterBlock = state.board[afterIndex];
          const beforeBlock = state.board[state.isBlockPick.pickedIndex];

          if (afterBlock.chessmenType) {
            state.gotcha.got = true;
            state.gotcha.caughtChessColor = afterBlock.chessColor;
            state.gotcha.chessmenType = afterBlock.chessmenType;
          }

          afterBlock.isMyChessmen = beforeBlock.isMyChessmen;
          afterBlock.chessColor = beforeBlock.chessColor;
          afterBlock.chessmenType = beforeBlock.chessmenType;

          beforeBlock.isMyChessmen = null;
          beforeBlock.chessColor = null;
          beforeBlock.chessmenType = null;

          state.board[afterIndex] = afterBlock;
          state.board[state.isBlockPick.pickedIndex] = beforeBlock;
          state.isBlockPick.isPick = false;
        }
      })
    )
  }))
);

export default useBoardList;
