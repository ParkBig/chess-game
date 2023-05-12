import { create } from "zustand";
import { UseUserState } from "../types/interface";
import { immer } from "zustand/middleware/immer";

// 유저 상태 관련
const useUserState = create(
  immer<UseUserState>((set) => ({
    im: "",
    imReady: false,
    setIm: (player) => (
      set((state) => {
        state.im = player
      })
    ),
    setImReady: (force) => (
      set((state) => {
        if (force) {
          state.imReady = JSON.parse(force);
        } else {
          state.imReady = !state.imReady
        }
      })
    )
  }))
);

export default useUserState;
