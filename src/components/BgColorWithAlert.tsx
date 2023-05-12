import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../lib/socketIo";
import { Player } from "../types/interface";
import styled from "styled-components";
import boardList from "../lib/boardList";
import useBoardList from "../store/useBoardList";
import useUserState from "../store/useUserState";
import useGameState from "../store/useGameState";

import hourGlass from "../assets/gif/hourGlass.gif";
import craftChess from "../assets/png/craftChess.png";
import alertImg from "../assets/png/alertImg.png";
import reGameBg from "../assets/png/reGameBg.png";
import ggBg from "../assets/png/ggBg.png";

const BgColorWithAlert = () => {
  const { roomName } = useParams();
  const navigate = useNavigate();
  const {nowTurn, gameAlert, isStart, setGameAlert, setIsStart, setNowTurn} = useGameState();
  const { gotcha, setGotCha, setBoard } = useBoardList();
  const { im, setImReady } = useUserState();

  const goHome = () => {
    socket.emit("leave-or-initialize-room", { roomName, state: "leave" }, navigate);
    setIsStart("false");
    setGotCha();
  };

  const reGame = () => {
    socket.emit("leave-or-initialize-room", { roomName, state: "initialize" });
    setNowTurn("player-1");
    setIsStart("false");
    setImReady("false");
    setGotCha();
    if (im) {
      const boardSetting = boardList(im);
      setBoard(boardSetting);
    };
  };

  useEffect(() => {
    if (gotcha.chessmenType === "king") {
      setIsStart("false");
      return;
    };
    if (gotcha.got) {
      const activateModal = setTimeout(() => {
        setGotCha();
      } , 1500);
      return () => clearTimeout(activateModal);
    }
    if (gameAlert.onAlert) {
      const activateModal = setTimeout(() => {
        setGameAlert("");
      }, 2000);
      return () => clearTimeout(activateModal);
    }
  }, [gotcha, gameAlert]);
  return (
    <>
      <Wrap turn={nowTurn} isStart={isStart.toString()}>
        <UpperMyTurn turn={nowTurn}>
          <MyTurn>
            My Turn!
          </MyTurn>
          <img src={hourGlass} />
        </UpperMyTurn>
      </Wrap>
      {gotcha.got ?
        gotcha.chessmenType === "king" ?
          <MatchResult>
            {
              gotcha.caughtChessColor === "black" ?
              <>
                <UpperResult>
                  <Result fontSize="large">
                    검은색 킹이 잡혔습니다..!
                  </Result>
                  <br/>
                  <Result fontSize="xx-large">
                    white-player 승리!
                  </Result>
                </UpperResult>
                <Rematch>
                  <RematchBtn bgColor="green" onClick={reGame}>
                    다시하기
                  </RematchBtn>
                  <RematchBtn bgColor="red" onClick={goHome}>
                    GG
                  </RematchBtn>
                </Rematch>
              </>
              :
              <>
                <UpperResult>
                <Result fontSize="large">
                    하얀색 킹이 잡혔습니다..!
                  </Result>
                  <br/>
                  <Result fontSize="xx-large">
                    black-player 승리!
                  </Result>
                </UpperResult>
                <Rematch>
                  <RematchBtn bgColor="green" onClick={reGame}>
                    다시하기
                  </RematchBtn>
                  <RematchBtn bgColor="red" onClick={goHome}>
                    GG
                  </RematchBtn>
                </Rematch>
              </>
            }
          </MatchResult>
          :
          <Modal>
            {`${gotcha.caughtChessColor}의 ${gotcha.chessmenType}이 잡혔습니다!`}
          </Modal>
        :
        null
      }
      {gameAlert.onAlert ?
        <Modal>
          {gameAlert.alertDetail}
        </Modal>
        :
        null
      }
    </>
  )
}

export default BgColorWithAlert;

const Wrap = styled.div<{ turn: Player, isStart: string }>`
  height: 100%;
  width: 100%;
  display: ${prop => prop.isStart === "true" ? null : "none"};
  position: absolute;
  z-index: 50;
  background: ${prop => prop.turn === "player-1" ? "linear-gradient(rgba(255, 255, 255, 0.1), rgba(235, 248, 225, 0.1), rgba(235, 248, 225, 0.1), rgba(39, 174, 96, 1))" : "linear-gradient( rgba(39, 174, 96, 1), rgba(235, 248, 225, 0.1), rgba(235, 248, 225, 0.1), rgba(255, 255, 255, 0.1))" };
`;
const UpperMyTurn = styled.div<{ turn: Player }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  gap: 10px;
  top: ${prop => prop.turn === "player-1" ? "55%" : "45%"};
  right: 100px;
`;
const MyTurn = styled.div`
  font-size: 1.2em;
  font-weight: 600;
`;
const Modal = styled.div`
  border: 5px solid gold;
  border-radius: 10px;
  padding: 40px 80px 40px 80px;
  background-image: url(${alertImg});
  background-size: cover;
  color: gold;
  font-size: 1.3em;
  font-weight: 600;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.6);
  position: absolute;
  z-index: 400;
`;
const MatchResult = styled.div`
  width: 550px;
  height: 310px;
  border: 5px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: url(${craftChess});
  background-size: cover;
  position: absolute;
  z-index: 500;
`;
const UpperResult = styled.div`
  width: 400px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Result = styled.span<{ fontSize: string }>`
  text-align: center;
  font-size: ${prop => prop.fontSize};
`;
const Rematch = styled.div`
  width: 400px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
  gap: 80px;
`;
const RematchBtn = styled.button<{ bgColor: string }>`
  width: 130px;
  height: 50px;
  border-radius: 10px;
  background-color: ${prop => prop.bgColor};
  background-image: url(${prop => prop.bgColor === "green" ? reGameBg : ggBg });
  background-size: cover;
  color: #d2dae2;
  font-size: 1.2em;
  font-weight: 700;
  cursor: pointer;
`;
