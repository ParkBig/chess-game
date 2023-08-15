import { useEffect } from 'react';
import BoardBlock from './BoardBlock';
import useGameState from 'store/useGameState';
import { css } from '@emotion/react';
import useBoardList from 'store/useBoardList';
import { socket } from 'utils/socketIo';

interface WrapProps {
  length: number;
}

export default function Chess() {
  const setNowTurn = useGameState(state => state.setNowTurn);
  const { board, chessMove, setIsBlockPick } = useBoardList();

  useEffect(() => {
    socket.on('perform-chessMove', targetIndex => {
      chessMove(targetIndex);
      setNowTurn();
    });

    socket.on('picked-index', pickedIndex => {
      setIsBlockPick(pickedIndex);
    });

    return () => {
      socket.off('perform-chessMove');
      socket.off('picked-index');
    };
  }, [chessMove, setIsBlockPick, setNowTurn]);

  return (
    <div css={wrap({ length: window.innerHeight })}>
      {board.map((boardBlock, index) => (
        <BoardBlock key={`${boardBlock.col}-${boardBlock.row}`} boardBlock={boardBlock} index={index} />
      ))}
    </div>
  );
}

const wrap = (props: WrapProps) => css`
  width: ${`${props.length * (6 / 7)}px`};
  height: ${`${props.length * (6 / 7)}px`};
  border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`;
