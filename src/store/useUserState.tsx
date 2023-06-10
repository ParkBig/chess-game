import { create } from "zustand";
import { UseUserState } from "../types/interface";
import { immer } from "zustand/middleware/immer";

// 유저 상태 관련
const useUserState = create(
  immer<UseUserState>((set) => ({
    myInfo: {
      gameInfo: {
        playerNum: "",
        imReady: false,
        isInGame: false,
      },
      loginInfo: {
        anyErr: false,
        isLogin: false,
        nickname: "",
        win: 0,
        lose: 0,
      }
    },
    allLoginInfo: {
      "player-1": {
        anyErr: false,
        isLogin: false,
        nickname: "",
        win: 0,
        lose: 0,
      },
      "player-2": {
        anyErr: false,
        isLogin: false,
        nickname: "",
        win: 0,
        lose: 0,
      }
    },
    setMyPlayerNum: (player) => {
      set((state) => {
        state.myInfo.gameInfo.playerNum = player;
      })
    },
    setMyReady: (force) =>{
      set((state) => {
        if (force) {
          state.myInfo.gameInfo.imReady = JSON.parse(force);
        } else {
          state.myInfo.gameInfo.imReady = !state.myInfo.gameInfo.imReady;
        }})
    },
    setMyIsInGame: (boolean) => {
      set((state) => {
        state.myInfo.gameInfo.isInGame = boolean;
      })
    },
    setMyLogInInfo: async (nickname, password) => {
      try {
        const data = {
          nickname,
          password,
        };
        const response = await fetch(
          `${process.env.REACT_APP_DEV_SERVER_URL}/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const loginData = await response.json();
        set((state) => {
          state.myInfo.loginInfo = {
            anyErr: false,
            isLogin: true,
            nickname: loginData.data.nickname.split(",")[0],
            win: loginData.data.win,
            lose: loginData.data.lose,
          };
        });
      } catch (err) {
        set((state) => {
          state.myInfo.loginInfo.anyErr = true;
        });
      }
    },
    setAllLoginInfo: (opponentInfo) => {
      set((state) => {
        state.allLoginInfo = opponentInfo
      })
    }
  }))
);

export default useUserState;
