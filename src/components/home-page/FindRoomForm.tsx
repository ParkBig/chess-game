import { css } from '@emotion/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useUserState from 'store/useUserState';
import { socket } from 'utils/socketIo';

export default function FindRoomForm() {
  const navigate = useNavigate();
  const { myInfo, setMyIsInGame } = useUserState();
  const { register, handleSubmit, getValues, setValue } = useForm();

  const enterTheRoom = () => {
    const { roomName } = getValues();
    socket.emit('enterRoom', { roomName, loginInfo: myInfo.loginInfo }, (canGo: boolean) => {
      if (canGo) {
        navigate(`room/${roomName}`);
        setMyIsInGame(true);
      } else {
        alert('정원을 초과 했습니다.');
        setValue('roomName', '');
      }
    });
  };

  return (
    <div css={findMatch}>
      <div css={description}>
        <span>Create or Join the Room!</span>
      </div>
      <form css={form} onSubmit={handleSubmit(enterTheRoom)}>
        <input
          css={input}
          {...register('roomName', {
            required: true,
          })}
          placeholder="Room Name"
        />
      </form>
    </div>
  );
}

const findMatch = css`
  width: 100%;
  background: linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0));
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  font-weight: 700;
  padding-top: 20px;
`;
const description = css`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: var(--size-7);
`;
const form = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0 30px 0;
  border-radius: 15px;
  border-bottom: 2px solid gray;
`;
const input = css`
  height: 60px;
  width: 80%;
  border-radius: 10px;
  text-align: center;
  font-size: var(--size-5);
`;
