import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useUserState } from "../store/configureStore";
import { ChatList } from "../types/interface";
import { socket } from "./socketIo";

const Chat = () => {
  const { roomName } = useParams();
  const [chatList, setChatList] = useState<ChatList[]>([]);
  const { register, handleSubmit, getValues, setValue } = useForm();
  const imReady = useUserState(state => state.imReady);
  const setImReady = useUserState(state => state.setImReady);

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
        <UpperGetReadyBtn>
          <GetReadyBtn onClick={sendGetReady}>
            Get Ready
          </GetReadyBtn>
        </UpperGetReadyBtn>
        <Form onSubmit={handleSubmit(sendMessage)}>
          <Input {...register("msg")} />
          <Btn>
            전송
          </Btn>
        </Form>
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
  border-bottom: 1px solid black;
  gap: 10px;
`;
const Chatting = styled.div<{me: boolean}>`
  max-width:  80%;
  border: 1px solid black;
  border-radius: 8px;
  text-indent: 5px;
  margin-left: ${prop => prop.me ? "auto" : "10px" };
  margin-right: ${prop => prop.me ? "10px" : "auto" };
  word-wrap: break-word;
  text-align: center;
`;

const UpperDoChat = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const UpperGetReadyBtn = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
`;
const GetReadyBtn = styled.button`
  width: 80%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
`;
const Form = styled.form`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3%;
`;
const Input = styled.input`
  width: 75%;
  height: 60px;
`;
const Btn = styled.button`
  width: 15%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
