import { useEffect } from "react";
import { socket } from "./socketIo";
import styled from "styled-components";
import BoardBlock from "./BoardBlock";
import { useBoardList, useUserState } from "../store/configureStore";
import { AnimatePresence } from "framer-motion";

const Chess = () => {
  const board = useBoardList(state => state.board);
  const chessMove = useBoardList(state => state.chessMove);
  const setIsBlockPick = useBoardList(state => state.setIsBlockPick);
  const setNowTurn = useUserState(state => state.setNowTurn);
  
  useEffect(() => {
    socket.on("perform-chessMove", (targetIndex) => {
      chessMove(targetIndex);
      setNowTurn();
    });
    
    socket.on("picked-index", (pickedIndex) => {
      setIsBlockPick(pickedIndex);
    });
  }, []);
  return (
    <Wrap>
      <AnimatePresence>
        {board.map((boardBlock, index) =>
          <BoardBlock key={`${boardBlock.col}-${boardBlock.row}`} 
            boardBlock={boardBlock}
            index={index}
          />
        )}

      </AnimatePresence>
    </Wrap>
  )
}

export default Chess;

const Wrap = styled.div`
  width: 880px;
  height: 880px;
  border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`;
