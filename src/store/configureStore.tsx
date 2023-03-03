import { create } from "zustand";
import { immer } from 'zustand/middleware/immer'
import { Board, UseBoardList, UseTraceMoveArea, UseUserState } from "../types/interface";

export const useBoardList = create(
  immer<UseBoardList>((set) => ({
    board: [],
    isBlockPick: {isPick: false, pickedIndex: null},
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
    chessMove: (afterIndex) => (
      set((state) => {
        if (state.isBlockPick.isPick && state.isBlockPick.pickedIndex) {
          const afterBlock = state.board[afterIndex];
          const beforeBlock = state.board[state.isBlockPick.pickedIndex];

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

export const useUserState = create<UseUserState>(set => ({
  im: "",
  nowTurn: "player-1",
  setIm: (player) => set(state => ({
    im: player
  })),
  setNowTurn: () => set(state => ({
    nowTurn: state.nowTurn === "player-1" ? "player-2" : "player-1"
  })),
}));

export const useTraceMoveArea = create<UseTraceMoveArea>(set => ({
  canMoveArea: [],
  setCanMoveArea: (siftAndCanMove) => set(state => ({
    canMoveArea: siftAndCanMove
  }))
}))
