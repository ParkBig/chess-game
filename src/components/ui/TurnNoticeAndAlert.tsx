import { css } from '@emotion/react';
import Alert from './alerts/Alert';
import { Player } from 'types/interface';
import useGameState from 'store/useGameState';

import hourGlass from 'assets/gif/hourGlass.gif';

interface WrapProps {
  turn: Player;
  isStart: string;
}

export default function TurnNoticeAndAlert() {
  const { nowTurn, isStart } = useGameState();

  return (
    <>
      <div css={wrap({ turn: nowTurn, isStart: isStart.toString() })}>
        <div css={upperMyTurn({ turn: nowTurn })}>
          <div css={myTurn}>Turn!</div>
          <img src={hourGlass} />
        </div>
      </div>
      <Alert />
    </>
  );
}

const wrap = (props: WrapProps) => css`
  height: 100%;
  width: 100%;
  display: ${props.isStart === 'true' ? null : 'none'};
  position: absolute;
  z-index: 50;
  background: ${props.turn === 'player-1'
    ? 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(235, 248, 225, 0.1), rgba(235, 248, 225, 0.1), rgba(39, 174, 96, 1))'
    : 'linear-gradient( rgba(39, 174, 96, 1), rgba(235, 248, 225, 0.1), rgba(235, 248, 225, 0.1), rgba(255, 255, 255, 0.1))'};
`;
const upperMyTurn = (props: { turn: Player }) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  gap: 10px;
  top: ${props.turn === 'player-1' ? '55%' : '45%'};
  right: 100px;
`;
const myTurn = css`
  font-size: var(--size-5);
  font-weight: 600;
`;
