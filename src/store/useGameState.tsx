import { create } from "zustand";
import { UseGameState } from "../types/interface";
import { immer } from "zustand/middleware/immer";

const useGameState = create(
  immer<UseGameState>((set) => ({
    isStart: false,
    nowTurn: "player-1",
    gameAlert: { onAlert: false, alertDetail: "" },
    setIsStart: (force) => (
      set((state) => {
        if (force) {
          state.isStart = JSON.parse(force);
        } else {
          state.isStart = !state.isStart
        }
      })
    ),
    setNowTurn: (force) => (
      set((state) => {
        if (force) {
          state.nowTurn = force;
        } else {
          state.nowTurn = (state.nowTurn === "player-1" ? "player-2" : "player-1")
        }
      })
    ),
    setGameAlert: (detail) => (
      set((state) => {
        state.gameAlert.onAlert = !state.gameAlert.onAlert;
        state.gameAlert.alertDetail = detail;
      })
    )
  }))
);

export default useGameState;
