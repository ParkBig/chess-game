import styled from "styled-components";
import useUserState from "../../store/useUserState";

const LoginInfo = () => {
  const { myInfo } = useUserState();

  return (
    <Wrap>
      <Id>
        {myInfo.loginInfo.nickname}
      </Id>
      <Rate>
        <Span isWin={true}>
          win: {myInfo.loginInfo.win}
        </Span>
        <Span isWin={false}>
          lose: {myInfo.loginInfo.lose}  
        </Span>
      </Rate>
    </Wrap>
  )
}

export default LoginInfo;

const Wrap = styled.div`
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
const Id = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--size-6);
`;
const Rate = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--size-4);
  gap: 10px;
`;
const Span = styled.span<{ isWin: boolean }>`
  color: ${prop => prop.isWin ? "blue" : "red"}
`;