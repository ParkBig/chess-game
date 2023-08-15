import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import useBoardList from 'store/useBoardList';
import useUserState from 'store/useUserState';
import useGameState from 'store/useGameState';
import { socket } from 'utils/socketIo';
import { Player } from 'types/interface';
import boardList from 'utils/boardList';
import { history } from 'utils/history';
import TurnNoticeAndAlert from 'components/ui/TurnNoticeAndAlert';
import Chess from 'components/chess/Chess';
import Interaction from 'components/interaction/Interaction';

import roomPageBg from 'assets/background/roomPageBg.png';

export default function RoomPage() {
  const navigate = useNavigate();
  const { roomName } = useParams();
  const { gotcha, setBoard, setGotCha } = useBoardList();
  const { myInfo, setMyOdds, setMyPlayerNum, setMyReady, setMyIsInGame, setAllLoginInfo } = useUserState();
  const { setIsStart, setNowTurn, setGameAlert } = useGameState();

  useEffect(() => {
    if (myInfo.loginInfo.isLogin) {
      if (gotcha.got && gotcha.chessmenType === 'king') {
        if (gotcha.caughtChessColor === 'black') {
          if (myInfo.gameInfo.playerNum === 'player-1') {
            setMyOdds(true);
          } else {
            setMyOdds(false);
          }
        }
        if (gotcha.caughtChessColor === 'white') {
          if (myInfo.gameInfo.playerNum === 'player-1') {
            setMyOdds(false);
          } else {
            setMyOdds(true);
          }
        }
      }
    }
  }, [
    gotcha.caughtChessColor,
    gotcha.chessmenType,
    gotcha.got,
    myInfo.gameInfo.playerNum,
    myInfo.loginInfo.isLogin,
    setMyOdds,
  ]);

  useEffect(() => {
    if (!myInfo.gameInfo.isInGame) {
      socket.emit('when-reload-page', { roomName }, navigate);
    } else {
      socket.emit('board-setting', roomName, (player: Player) => {
        setMyPlayerNum(player);
        const boardSetting = boardList(player);
        setBoard(boardSetting);
        setGameAlert(`당신은 ${player}, ${player === 'player-1' ? '하얀색말입니다.' : '검은색말입니다.'}`);
      });

      socket.on('getLoginInfo', loginInfos => {
        setAllLoginInfo(loginInfos);
      });

      socket.on('all-ready', start => {
        setIsStart();
        console.log(`Game ${start}`);
      });

      socket.on('opponent-entered', () => {
        setGameAlert('상대방이 입장했습니다!');
      });

      socket.on('rematch-start', msg => {
        console.log(msg);
      });
    }
    return () => {
      socket.off('board-setting');
      socket.off('all-ready');
      socket.off('opponent-entered');
      socket.off('rematch-start');
      socket.off('getLoginInfo');
    };
  }, [
    myInfo.gameInfo.isInGame,
    navigate,
    roomName,
    setAllLoginInfo,
    setBoard,
    setGameAlert,
    setIsStart,
    setMyPlayerNum,
  ]);

  useEffect(() => {
    socket.on('initialize-ready', () => {
      setGameAlert('상대방이 나갔습니다!');
      setNowTurn('player-1');
      setIsStart('false');
      setMyReady('false');
      setGotCha();
      if (myInfo.gameInfo.playerNum) {
        const boardSetting = boardList(myInfo.gameInfo.playerNum);
        setBoard(boardSetting);
      }
    });

    const whenBackPage = () => {
      setIsStart('false');
      setMyReady('false');
      setNowTurn('player-1');
      setMyIsInGame(false);
      setGotCha();
      socket.emit('leave-or-initialize-room', { roomName, state: 'leave' });
    };

    const unListenHistoryEvent = history.listen(({ action }) => {
      if (action === 'POP') {
        whenBackPage();
      }
    });

    return () => {
      socket.off('initialize-ready');
      unListenHistoryEvent();
    };
  }, [
    myInfo.gameInfo.playerNum,
    roomName,
    setBoard,
    setGameAlert,
    setGotCha,
    setIsStart,
    setMyIsInGame,
    setMyReady,
    setNowTurn,
  ]);
  return (
    <div css={wrap}>
      <Helmet>
        <title>chess | room {roomName}</title>
      </Helmet>
      <div css={chessArea}>
        <TurnNoticeAndAlert />
        <Chess />
      </div>
      <div css={chatArea}>
        <Interaction />
      </div>
    </div>
  );
}

const wrap = css`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const chessArea = css`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: url(${roomPageBg});
  background-size: cover;
`;
const chatArea = css`
  width: 20%;
  height: 100%;
  border-left: 5px solid #27ae60;
`;
