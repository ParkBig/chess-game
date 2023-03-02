import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Chat from "../components/Chat";
import Chess from "../components/Chess";
import { socket } from "../components/socketIo";
import boardList from "../hooks/boardList";
import { useBoardList, useUserState } from "../store/configureStore";
import { Player } from "../types/interface";

const RoomPage = () => {
  const { roomName } = useParams();
  const setBoard = useBoardList(state => state.setBoard);
  const setIm = useUserState(state => state.setIm);

  useEffect(() => {
    socket.emit("boardSetting", roomName, (player: Player) => {
      setIm(player);
      const boardSetting = boardList(player);
      setBoard(boardSetting);
    });
  }, []);
  return (
    <Wrap>
      <ChessArea>
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
const ChessArea = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ChatArea = styled.div`
  width: 20%;
  height: 100%;
  border-left: 1px solid black;
`;
