import { useForm } from "react-hook-form";
import styled from "styled-components";
import useUserState from "../../store/useUserState";

const LoginForm = () => {
  const { setMyLogInInfo } = useUserState();
  const { register, handleSubmit, getValues } = useForm();

  const loginSign = () => {
    setMyLogInInfo(getValues("nickname"), getValues("password"));
  };

  return (
    <Form isMatch={false} onSubmit={handleSubmit(loginSign)}>
      <InputArea>
        <Input
          {...register("nickname", { required: true, maxLength: 8 })}
          isMatch={false}
          placeholder="ID"
        />
        <Input
          {...register("password", {
            required: true,
            maxLength: 12,
            minLength: 3,
          })}
          type="password"
          isMatch={false}
          placeholder="Password"
        />
      </InputArea>
      <BtnArea>
        Log In <br />
        or
        <br />
        sign Up
      </BtnArea>
    </Form>
  );
};

export default LoginForm;

const Form = styled.form<{ isMatch: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(prop) => (prop.isMatch ? "10px 0 30px 0" : "15px")};
  border-radius: ${(prop) => (prop.isMatch ? "15px" : "none")};
  border-bottom: ${(prop) => (prop.isMatch ? "2px solid gray" : "none")};
`;
const Input = styled.input<{ isMatch: boolean }>`
  height: ${(prop) => (prop.isMatch ? "60px" : "30px")};
  width: 80%;
  border-radius: 10px;
  text-align: center;
  font-size: ${(prop) => (prop.isMatch ? "var(--size-5)" : "var(--size-4)")};
`;
const InputArea = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
