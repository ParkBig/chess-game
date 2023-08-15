import React from 'react';
import useBoardList from 'store/useBoardList';
import useGameState from 'store/useGameState';
import useUserState from 'store/useUserState';
import CanMoveArea from './CanMoveArea';
import Chessman from './Chessman';
import { BoardsBlock } from 'types/interface';
import { css } from '@emotion/react';

interface WrapProps {
  isColor: boolean;
}

const BoardBlock = ({ boardBlock, index }: BoardsBlock) => {
  const { myInfo } = useUserState();
  const { nowTurn } = useGameState();
  const { isBlockPick, canMoveArea } = useBoardList();

  return (
    <div css={wrap({ isColor: boardBlock.color })}>
      {isBlockPick.isPick && canMoveArea.includes(index) && myInfo.gameInfo.playerNum === nowTurn && (
        <CanMoveArea index={index} />
      )}
      {boardBlock.chessmenType && <Chessman boardBlock={boardBlock} index={index} />}
    </div>
  );
};

export default React.memo(BoardBlock);

const wrap = (props: WrapProps) => css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  background-color: ${props.isColor ? '#353b48' : 'white'};
  position: relative;
  z-index: 100;
`;
