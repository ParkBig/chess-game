import styled from "styled-components";
import useBoardList from "../../../store/useBoardList";
import { useNavigate, useParams } from "react-router-dom";
import useUserState from "../../../store/useUserState";
import useGameState from "../../../store/useGameState";
import { socket } from "../../../utils/socketIo";
import boardList from "../../../utils/boardList";

import craftChess from "../../../assets/background/craftChess.png";
import reGameBg from "../../../assets/background/reGameBg.png";
import ggBg from "../../../assets/background/ggBg.png";

const EndAlerts = () => {
  const navigate = useNavigate();
  const { roomName } = useParams();
  const { im, setImReady } = useUserState();
  const { gotcha, setGotCha, setBoard } = useBoardList();
  const { setIsStart, setNowTurn } = useGameState();

  const reGame = () => {
    socket.emit("leave-or-initialize-room", { roomName, state: "initialize" });
    setNowTurn("player-1");
    setIsStart("false");
    setImReady("false");
    setGotCha();
    if (im) {
      const boardSetting = boardList(im);
      setBoard(boardSetting);
    }
  };

  const goHome = () => {
    socket.emit(
      "leave-or-initialize-room",
      { roomName, state: "leave" },
      navigate
    );
    setIsStart("false");
    setGotCha();
  };

  return (
    <>
      <MatchResult>
        {gotcha.caughtChessColor === "black" ? (
          <>
            <UpperResult>
              <Result fontSize="large">검은색 킹이 잡혔습니다..!</Result>
              <br />
              <Result fontSize="xx-large">white-player 승리!</Result>
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
        ) : (
          <>
            <UpperResult>
              <Result fontSize="large">하얀색 킹이 잡혔습니다..!</Result>
              <br />
              <Result fontSize="xx-large">black-player 승리!</Result>
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
        )}
      </MatchResult>
    </>
  );
};

export default EndAlerts;

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
  font-size: ${(prop) => prop.fontSize};
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
  background-color: ${(prop) => prop.bgColor};
  background-image: url(${(prop) => prop.bgColor === "green" ? reGameBg : ggBg});
  background-size: cover;
  color: #d2dae2;
  font-size: var(--size-5);
  font-weight: 700;
  cursor: pointer;
`;
