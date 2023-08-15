import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import useGameState from 'store/useGameState';
import useUserState from 'store/useUserState';
import { socket } from 'utils/socketIo';

export default function GetReady() {
  const { roomName } = useParams();
  const { isStart } = useGameState();
  const { myInfo, setMyReady } = useUserState();

  const sendGetReady = () => {
    socket.emit('send_getReady', { roomName, isReady: !myInfo.gameInfo.imReady }, setMyReady);
  };

  return (
    <div css={wrap}>
      {isStart ? (
        'Game in progress'
      ) : myInfo.gameInfo.imReady ? (
        <button css={getReadyBtn({ bgColor: '#44bd32' })} onClick={sendGetReady}>
          Im Ready!
        </button>
      ) : (
        <button css={getReadyBtn({ bgColor: '#95afc0' })} onClick={sendGetReady}>
          Get Ready
        </button>
      )}
    </div>
  );
}

const wrap = css`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--size-4);
  background: linear-gradient(
    100deg,
    rgb(100, 100, 0),
    rgb(0, 238, 155),
    rgb(238, 178, 0),
    rgb(0, 238, 155),
    rgb(238, 178, 0)
  );
`;
const getReadyBtn = (props: { bgColor: string }) => css`
  width: 80%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2mm ridge rgba(211, 220, 50, 0.6);
  border-radius: 10px;
  background-color: ${props.bgColor};
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.6);
  font-size: var(--size-4);
  cursor: pointer;
`;
