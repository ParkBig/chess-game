import { useEffect } from "react";
import { useNavigate, useParams, } from "react-router-dom";
import { socket } from "../lib/socketIo";
import { Player } from "../types/interface";
import { history } from "../lib/history";
import useBoardList from "../store/useBoardList";
import styled from "styled-components";
import Chat from "../components/Chat";
import Chess from "../components/Chess";
import boardList from "../lib/boardList";
import BgColorWithAlert from "../components/BgColorWithAlert";
import useUserState from "../store/useUserState";
import useGameState from "../store/useGameState";

import roomPageBg from "../assets/png/roomPageBg.png";
import { Helmet } from "react-helmet-async";

const RoomPage = () => {
  const { roomName } = useParams();
  const navigate = useNavigate();
  const { setBoard, setGotCha } = useBoardList();
  const { im, imReady, setIm, setImReady } = useUserState();
  const { isStart, nowTurn, setIsStart, setNowTurn, setGameAlert} = useGameState();

  const whenBackPage = () => {
    setIsStart("false");
    setImReady("false");
    setNowTurn("player-1");
    setGotCha();
    socket.emit("leave-or-initialize-room", { roomName, state: "leave" });
  };

  useEffect(() => {
    socket.emit("board-setting", roomName, (player: Player) => {
      setIm(player);
      const boardSetting = boardList(player);
      setBoard(boardSetting);
      setGameAlert(`당신은 ${player}, ${player === "player-1" ? "하얀색말입니다." : "검은색말입니다."}`)
    });

    socket.on("all-ready", (start) => {
      setIsStart();
      console.log(`Game ${start}`);
    });

    socket.on("opponent-entered", () => {
      setGameAlert("상대방이 입장했습니다!")
    });

    socket.on("rematch-start", (msg) => {
      console.log(msg)
    })

    return () => {
      socket.off("board-setting");
      socket.off("all-ready");
      socket.off("opponent-entered");
      socket.off("rematch-start");
    };
  }, []);

  useEffect(() => {
    socket.on("initialize-ready", () => {
      setGameAlert("상대방이 나갔습니다!");
      setNowTurn("player-1");
      setIsStart("false");
      setImReady("false");
      setGotCha();
      if (im) {
        const boardSetting = boardList(im);
        setBoard(boardSetting);
      };
    });

    const _unListenHistoryEvent = history.listen(({ action }) => {
      if (action === "POP") {
        whenBackPage();
      };
    });

    return () => {
      socket.off("initialize-ready");
      _unListenHistoryEvent();
    }
  }, [imReady, isStart]);
  return (
    <Wrap>
      <Helmet>
        <title>
          chess | room {roomName}
        </title>
      </Helmet>
      <ChessArea turn={nowTurn}>
        <BgColorWithAlert />
        <Chess />
      </ChessArea>
      <ChatArea>
        <Chat />
      </ChatArea>
    </Wrap>
  )
}

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
