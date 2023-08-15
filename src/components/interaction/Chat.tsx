import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { ChatList } from 'types/interface';
import { socket } from 'utils/socketIo';

import chatBGImg from 'assets/background/chatBGImg.png';

export default function Chat() {
  const { roomName } = useParams();
  const [chatList, setChatList] = useState<ChatList[]>([]);
  const { register, handleSubmit, getValues, setValue } = useForm();

  const sendMessage = () => {
    const { msg } = getValues();
    const newChat = { me: true, chat: msg, time: Date.now() };
    setChatList(prev => [...prev, newChat]);

    const sendChat = { ...newChat, me: false };
    socket.emit('send_msg', { roomName, sendChat });

    setValue('msg', '');
  };

  useEffect(() => {
    socket.on('get_msg', getMsg => {
      setChatList(prev => [...prev, getMsg]);
    });

    return () => {
      socket.off('get_msg');
    };
  }, []);
  return (
    <div css={wrap}>
      <div css={upperChatList}>
        {chatList.map(chat => (
          <div css={chatting({ me: chat.me })} key={chat.time}>
            {chat.chat}
          </div>
        ))}
      </div>
      <form css={form} onSubmit={handleSubmit(sendMessage)}>
        <input css={input} {...register('msg')} placeholder="send message" />
      </form>
    </div>
  );
}

const wrap = css`
  height: 73%;
  display: flex;
  flex-direction: column;
  background-color: var(--color-green-500);
`;
const upperChatList = css`
  width: 100%;
  height: 85%;
  padding-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  border-bottom: 2px solid #3c6382;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  gap: 10px;
  position: relative;

  ::before {
    content: '';
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
const chatting = (props: { me: boolean }) => css`
  max-width: 80%;
  border: 1px solid black;
  border-radius: 8px;
  padding: 10px;
  margin-left: ${props.me ? 'auto' : '10px'};
  margin-right: ${props.me ? '10px' : 'auto'};
  word-wrap: break-word;
  text-align: center;
  position: relative;
  background-color: #ecf0f1;
`;

const form = css`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 5px solid #3c6382;
  background-color: var(--color-green-500);
  gap: 3%;
`;

const input = css`
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
