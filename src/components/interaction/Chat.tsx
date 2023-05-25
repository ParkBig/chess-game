import styled from "styled-components";
import { useEffect, useState } from "react";
import { ChatList } from "../../types/interface";
import { socket } from "../../utils/socketIo";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import chatBGImg from "../../assets/background/chatBGImg.png";

const Chat = () => {
  const { roomName } = useParams();
  const [chatList, setChatList] = useState<ChatList[]>([]);
  const { register, handleSubmit, getValues, setValue } = useForm();

  const sendMessage = () => {
    const { msg } = getValues();
    const newChat = { me: true, chat: msg, time: Date.now() };
    setChatList((prev) => [...prev, newChat]);

    const sendChat = { ...newChat, me: false };
    socket.emit("send_msg", { roomName, sendChat });

    setValue("msg", "");
  };

  useEffect(() => {
    socket.on("get_msg", (getMsg) => {
      setChatList((prev) => [...prev, getMsg]);
    });

    return () => {
      socket.off("get_msg");
    };
  }, []);
  return (
    <>
      <UpperChatList>
        {chatList.map((chat) => (
          <Chatting key={chat.time} me={chat.me}>
            {chat.chat}
          </Chatting>
        ))}
      </UpperChatList>
      <Form onSubmit={handleSubmit(sendMessage)}>
        <Input {...register("msg")} placeholder="send message" />
      </Form>
    </>
  );
};

export default Chat;

const UpperChatList = styled.div`
  width: 100%;
  height: 70%;
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
const Chatting = styled.div<{ me: boolean }>`
  max-width: 80%;
  border: 1px solid black;
  border-radius: 8px;
  padding: 10px;
  margin-left: ${(prop) => (prop.me ? "auto" : "10px")};
  margin-right: ${(prop) => (prop.me ? "10px" : "auto")};
  word-wrap: break-word;
  text-align: center;
  position: relative;
  background-color: #ecf0f1;
`;

const Form = styled.form`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 5px solid #3c6382;
  background-color: var(--color-green-500);
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
