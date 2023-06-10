import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../utils/socketIo";
import { Player } from "../types/interface";
import { history } from "../utils/history";
import useBoardList from "../store/useBoardList";
import styled from "styled-components";
import boardList from "../utils/boardList";
import useUserState from "../store/useUserState";
import useGameState from "../store/useGameState";
import { Helmet } from "react-helmet-async";
import TurnNoticeAndAlert from "../components/ui/TurnNoticeAndAlert";
import Chess from "../components/chess/Chess";
import Interaction from "../components/interaction/Interaction";

import roomPageBg from "../assets/background/roomPageBg.png";

const RoomPage = () => {
  const navigate = useNavigate();
  const { roomName } = useParams();
  const { gotcha, setBoard, setGotCha } = useBoardList();
  const {
    myInfo,
    setMyPlayerNum,
    setMyReady,
    setMyIsInGame,
    setAllLoginInfo,
  } = useUserState();
  const { isStart, nowTurn, setIsStart, setNowTurn, setGameAlert } =
    useGameState();

  const whenBackPage = () => {
    setIsStart("false");
    setMyReady("false");
    setNowTurn("player-1");
    setMyIsInGame(false);
    setGotCha();
    socket.emit("leave-or-initialize-room", { roomName, state: "leave" });
  };

  useEffect(() => {
    if (!myInfo.gameInfo.isInGame) {
      socket.emit("when-reload-page", { roomName }, navigate);
    } else {
      if (myInfo.loginInfo.isLogin) {
        if (gotcha.got && gotcha.chessmenType === "king") {
          if (gotcha.caughtChessColor === "black") {
            if (myInfo.gameInfo.playerNum === "player-1") {
              // 내가 이김
            } else {
              // 내가 짐
            }
          }
          if (gotcha.caughtChessColor === "white") {
            if (myInfo.gameInfo.playerNum === "player-1") {
              // 내가 짐
            } else {
              // 내가 이김
            }
          }
        }
      }

      socket.emit("board-setting", roomName, (player: Player) => {
        setMyPlayerNum(player);
        const boardSetting = boardList(player);
        setBoard(boardSetting);
        setGameAlert(
          `당신은 ${player}, ${
            player === "player-1" ? "하얀색말입니다." : "검은색말입니다."
          }`
        );
      });

      socket.on("getLoginInfo", (loginInfos) => {
        setAllLoginInfo(loginInfos);
      });

      socket.on("all-ready", (start) => {
        setIsStart();
        console.log(`Game ${start}`);
      });

      socket.on("opponent-entered", () => {
        setGameAlert("상대방이 입장했습니다!");
      });

      socket.on("rematch-start", (msg) => {
        console.log(msg);
      });
    }
    return () => {
      socket.off("board-setting");
      socket.off("all-ready");
      socket.off("opponent-entered");
      socket.off("rematch-start");
      socket.off("getLoginInfo");
    };
  }, []);

  useEffect(() => {
    socket.on("initialize-ready", () => {
      setGameAlert("상대방이 나갔습니다!");
      setNowTurn("player-1");
      setIsStart("false");
      setMyReady("false");
      setGotCha();
      if (myInfo.gameInfo.playerNum) {
        const boardSetting = boardList(myInfo.gameInfo.playerNum);
        setBoard(boardSetting);
      }
    });

    const unListenHistoryEvent = history.listen(({ action }) => {
      if (action === "POP") {
        whenBackPage();
      }
    });

    return () => {
      socket.off("initialize-ready");
      unListenHistoryEvent();
    };
  }, [myInfo.gameInfo.imReady, isStart]);
  return (
    <Wrap>
      <Helmet>
        <title>chess | room {roomName}</title>
      </Helmet>
      <ChessArea turn={nowTurn}>
        <TurnNoticeAndAlert />
        <Chess />
      </ChessArea>
      <ChatArea>
        <Interaction />
      </ChatArea>
    </Wrap>
  );
};

export default RoomPage;

const Wrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ChessArea = styled.div<{ turn: Player }>`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: url(${roomPageBg});
  background-size: cover;
`;
const ChatArea = styled.div`
  width: 20%;
  height: 100%;
  border-left: 5px solid #27ae60;
`;
