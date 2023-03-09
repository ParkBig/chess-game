import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGameState, useUserState } from "../store/configureStore";
import { ChatList } from "../types/interface";
import { socket } from "../lib/socketIo";

import chatBGImg from "../assets/png/chatBGImg.png"

const Chat = () => {
  const { roomName } = useParams();
  const [chatList, setChatList] = useState<ChatList[]>([]);
  const { register, handleSubmit, getValues, setValue } = useForm();
  const { imReady, setImReady } = useUserState();
  const isStart = useGameState(state => state.isStart);

  const sendGetReady = ()  => {
    socket.emit("send_getReady", {roomName, isReady: !imReady}, setImReady);
  };

  const sendMessage = () => {
    const { msg } = getValues();
    const newChat = { me: true, chat: msg, time: Date.now() };
    setChatList(prev => [...prev, newChat]);

    const sendChat = {...newChat, me: false};
    socket.emit("send_msg", {roomName, sendChat});

    setValue("msg", "");
  };

  useEffect(() => {
    socket.on("get_msg", (getMsg) => {
      setChatList(prev => [...prev, getMsg]);
    });

    return () => {
      socket.off("get_msg");
    };
  }, []);
  return (
    <>
      <UpperChatList>
        {chatList.map((chat) => 
          <Chatting key={chat.time} me={chat.me}>
            {chat.chat}
          </Chatting>
        )}
      </UpperChatList>
      <UpperDoChat>
        <Form onSubmit={handleSubmit(sendMessage)}>
          <Input {...register("msg")} placeholder="send message" />
        </Form>
        <UpperGetReadyBtn>
          {isStart ?
            "Game in progress"
            :
            imReady ? 
              <GetReadyBtn bgColor={"#44bd32"} onClick={sendGetReady}>
                Im Ready!
              </GetReadyBtn>
              :
              <GetReadyBtn bgColor={"#95afc0"} onClick={sendGetReady}>
                Get Ready
              </GetReadyBtn>
          }
        </UpperGetReadyBtn>
      </UpperDoChat>
    </>
  )
}

export default Chat;

const UpperChatList = styled.div`
  width: 100%;
  height: 80%;
  padding-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  border-bottom: 2px solid #3c6382;
  gap: 10px;
  position: relative;

  ::before {
    content: "";
    background-image: url(${chatBGImg});
    background-size: cover;
    opacity: 0.6;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
`;
const Chatting = styled.div<{me: boolean}>`
  max-width:  80%;
  border: 1px solid black;
  border-radius: 8px;
  padding: 10px;
  margin-left: ${prop => prop.me ? "auto" : "10px" };
  margin-right: ${prop => prop.me ? "10px" : "auto" };
  word-wrap: break-word;
  text-align: center;
  position: relative;
  background-color: #ecf0f1;
`;

const UpperDoChat = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgb(106, 176, 76), rgb(87, 96, 111));
`;
const UpperGetReadyBtn = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4em;
`;
const GetReadyBtn = styled.button<{ bgColor: string }>`
  width: 80%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2mm ridge rgba(211, 220, 50, .6);
  border-radius: 10px;
  background-color: ${prop => prop.bgColor};
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.6);
  font-size: 1.4em;
  cursor: pointer;
`;
const Form = styled.form`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 5px solid #3c6382;
  border-radius: 20px;
  gap: 3%;
`;
const Input = styled.input`
  width: 90%;
  height: 60px;
  border-radius: 10px;
  text-align: center;
  font-size: 1.2em;
  border: 1px solid black;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);
  background-color: #dfe6e9;

  &:focus {
    text-align: left;
    text-indent: 10px;
  }
`;
