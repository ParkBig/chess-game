import { BoardsBlock } from "../../types/interface";
import React from "react";
import styled from "styled-components";
import useBoardList from "../../store/useBoardList";
import useUserState from "../../store/useUserState";
import useGameState from "../../store/useGameState";
import Chessman from "./Chessman";
import CanMoveArea from "./CanMoveArea";

const BoardBlock = ({ boardBlock, index }: BoardsBlock) => {
  const im = useUserState((state) => state.im);
  const { nowTurn } = useGameState();
  const { isBlockPick, canMoveArea } = useBoardList();

  return (
    <Area isColor={boardBlock.color}>
      {isBlockPick.isPick && canMoveArea.includes(index) && im === nowTurn && (
        <CanMoveArea index={index} />
      )}
      {boardBlock.chessmenType && (
        <Chessman boardBlock={boardBlock} index={index} />
      )}
    </Area>
  );
};

export default React.memo(BoardBlock);

const Area = styled.div<{ isColor: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  background-color: ${(prop) => (prop.isColor ? "#353b48" : "white")};
  position: relative;
  z-index: 100;
`;
