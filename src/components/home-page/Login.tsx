import styled from 'styled-components';
import { useState } from 'react';
import useUserState from '../../store/useUserState';
import LoginForm from './LoginForm';
import LoginInfo from './LoginInfo';

const Login = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const { myInfo } = useUserState();

  const toggleLogin = () => {
    setOpenLogin(prev => !prev);
  };

  return (
    <UpperLogin>
      {myInfo.loginInfo.isLogin ? <LoginInfo /> : openLogin ? <LoginForm /> : null}
      <OpenLogin onClick={toggleLogin}>
        {!myInfo.loginInfo.isLogin ? (openLogin ? 'Close' : 'Want a Log in?!') : null}
      </OpenLogin>
    </UpperLogin>
  );
};

export default Login;

const UpperLogin = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;
const OpenLogin = styled.div`
  margin: 5px;
  cursor: pointer;
`;
