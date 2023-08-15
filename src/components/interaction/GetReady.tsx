import styled from 'styled-components';
import useGameState from '../../store/useGameState';
import useUserState from '../../store/useUserState';
import { useParams } from 'react-router-dom';
import { socket } from '../../utils/socketIo';

const GetReady = () => {
  const { roomName } = useParams();
  const { isStart } = useGameState();
  const { myInfo, setMyReady } = useUserState();

  const sendGetReady = () => {
    socket.emit('send_getReady', { roomName, isReady: !myInfo.gameInfo.imReady }, setMyReady);
  };

  return (
    <UpperGetReadyBtn>
      {isStart ? (
        'Game in progress'
      ) : myInfo.gameInfo.imReady ? (
        <GetReadyBtn bgColor={'#44bd32'} onClick={sendGetReady}>
          Im Ready!
        </GetReadyBtn>
      ) : (
        <GetReadyBtn bgColor={'#95afc0'} onClick={sendGetReady}>
          Get Ready
        </GetReadyBtn>
      )}
    </UpperGetReadyBtn>
  );
};

export default GetReady;

const UpperGetReadyBtn = styled.div`
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
const GetReadyBtn = styled.button<{ bgColor: string }>`
  width: 80%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2mm ridge rgba(211, 220, 50, 0.6);
  border-radius: 10px;
  background-color: ${prop => prop.bgColor};
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.6);
  font-size: var(--size-4);
  cursor: pointer;
`;
