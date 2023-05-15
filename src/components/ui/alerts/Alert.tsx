import useBoardList from "../../../store/useBoardList";
import useGameState from "../../../store/useGameState";
import GameAlert from "./GameAlert";
import CatchAlert from "./CatchAlert";
import { useEffect } from "react";
import EndAlerts from "./EndAlerts";

const Alert = () => {
  const { gotcha, setGotCha } = useBoardList();
  const { gameAlert, setIsStart, setGameAlert } = useGameState();

  useEffect(() => {
    if (gotcha.chessmenType === "king") {
      setIsStart("false");
      return;
    }
    if (gotcha.got) {
      const activateModal = setTimeout(() => {
        setGotCha();
      }, 1500);
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
      {gotcha.got ? (
        gotcha.chessmenType === "king" ? (
          <EndAlerts />
        ) : (
          <CatchAlert />
        )
      ) : null}
      {gameAlert.onAlert ? <GameAlert /> : null}
    </>
  );
};

export default Alert;
