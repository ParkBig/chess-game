import Login from './Login';
import { css } from '@emotion/react';
import FindRoomForm from './FindRoomForm';

export default function Match() {
  return (
    <div css={wrap}>
      <FindRoomForm />
      <Login />
    </div>
  );
}

const wrap = css`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: var(--color-green-300);
  border-radius: 15px;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.6);
`;
