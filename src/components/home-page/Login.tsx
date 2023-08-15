import { useState } from 'react';
import { css } from '@emotion/react';
import useUserState from 'store/useUserState';
import LoginInfo from './LoginInfo';
import LoginForm from './LoginForm';

export default function Login() {
  const [openLogin, setOpenLogin] = useState(false);
  const { myInfo } = useUserState();

  const toggleLogin = () => {
    setOpenLogin(prev => !prev);
  };

  return (
    <div css={wrap}>
      {myInfo.loginInfo.isLogin ? <LoginInfo /> : openLogin ? <LoginForm /> : null}
      <div css={toggleOpenLogin} onClick={toggleLogin}>
        {!myInfo.loginInfo.isLogin ? (openLogin ? 'Close' : 'Want a Log in?!') : null}
      </div>
    </div>
  );
}

const wrap = css`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;
const toggleOpenLogin = css`
  margin: 5px;
  cursor: pointer;
`;
