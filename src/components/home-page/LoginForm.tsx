import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import useUserState from '../../store/useUserState';

const LoginForm = () => {
  const { setMyLogInInfo } = useUserState();
  const { register, handleSubmit, getValues } = useForm();

  const loginSign = () => {
    setMyLogInInfo(getValues('nickname'), getValues('password'));
  };

  return (
    <Form onSubmit={handleSubmit(loginSign)}>
      <InputArea>
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
      </InputArea>
      <BtnArea>
        Log In <br />
        <Span>(없으면 자동가입)</Span>
      </BtnArea>
    </Form>
  );
};

export default LoginForm;

const Form = styled.form`
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
const InputArea = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: left;
  flex-direction: column;
  gap: 10px;
`;
const BtnArea = styled.button`
  width: 30%;
  padding: 10px 5px 10px 5px;
  border: 1px solid;
  border-radius: 10px;
  cursor: pointer;
`;
const Span = styled.span`
  font-size: var(--size-2);
`;
