import { useEffect } from "react";
import { socket } from "../lib/socketIo";
import { useBoardList, useGameState } from "../store/configureStore";
import styled from "styled-components";
import BoardBlock from "./BoardBlock";

const Chess = () => {
  const setNowTurn = useGameState(state => state.setNowTurn);
  const { board, chessMove, setIsBlockPick } = useBoardList();

  useEffect(() => {
    socket.on("perform-chessMove", (targetIndex) => {
      chessMove(targetIndex);
      setNowTurn();
    });
    
    socket.on("picked-index", (pickedIndex) => {
      setIsBlockPick(pickedIndex);
    });

    return () => {
      socket.off("perform-chessMove");
      socket.off("picked-index");
    }
  }, []);
  return (
    <Wrap length={window.innerHeight}>
      {board.map((boardBlock, index) =>
        <BoardBlock 
          key={`${boardBlock.col}-${boardBlock.row}`} 
          boardBlock={boardBlock}
          index={index}
        />
      )}
    </Wrap>
  )
}

export default Chess;

const Wrap = styled.div<{length: number}>`
  width: ${prop => `${prop.length*(6/7)}px` };
  height: ${prop => `${prop.length*(6/7)}px` };
  border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`;
