import { useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useUserState from 'store/useUserState';

export default function LoginForm() {
  const { setMyLogInInfo } = useUserState();
  const { register, handleSubmit, getValues } = useForm();

  const loginSign = () => {
    setMyLogInInfo(getValues('nickname'), getValues('password'));
  };

  return (
    <form css={form} onSubmit={handleSubmit(loginSign)}>
      <div css={inputArea}>
        <Input {...register('nickname', { required: true, maxLength: 8 })} placeholder="ID(max 8)" />
        <Input
          {...register('password', {
            required: true,
            maxLength: 12,
            minLength: 3,
          })}
          type="password"
          placeholder="Password(3 ~ 12)"
        />
      </div>
      <button css={btnArea}>
        <span>Log In</span>
        <br />
        <span css={span}>(없으면 자동가입)</span>
      </button>
    </form>
  );
}

const form = css`
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 30px 15px 30px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border-bottom: 2px solid var(--color-grey-700);
  background-color: var(--color-white-100);
`;
const Input = styled.input`
  height: 30px;
  width: 90%;
  border-radius: 10px;
  text-align: center;
  font-size: var(--size-3);
`;
const inputArea = css`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: left;
  flex-direction: column;
  gap: 10px;
`;
const btnArea = css`
  width: 30%;
  padding: 10px 5px 10px 5px;
  border: 1px solid;
  border-radius: 10px;
  cursor: pointer;
`;
const span = styled.span`
  font-size: var(--size-2);
`;
