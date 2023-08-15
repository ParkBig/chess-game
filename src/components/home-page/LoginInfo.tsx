import styled from '@emotion/styled';
import { css } from '@emotion/react';
import useUserState from 'store/useUserState';

export default function LoginInfo() {
  const { myInfo } = useUserState();

  return (
    <div css={wrap}>
      <div css={id}>{myInfo.loginInfo.nickname}</div>
      <div css={rate}>
        <Span isWin={true}>win: {myInfo.loginInfo.win}</Span>
        <Span isWin={false}>lose: {myInfo.loginInfo.lose}</Span>
      </div>
    </div>
  );
}

const wrap = css`
  width: 97%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  border: 2px solid var(--color-grey-700);
  border-radius: 15px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);
  background-color: var(--color-white-100);
`;
const id = css`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--size-6);
`;
const rate = css`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--size-4);
  gap: 10px;
`;
const Span = styled.span<{ isWin: boolean }>`
  color: ${prop => (prop.isWin ? 'blue' : 'red')};
`;
