import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { socket } from "../../utils/socketIo";
import styled from "styled-components";
import Login from "./Login";
import useUserState from "../../store/useUserState";

const Match = () => {
  const navigate = useNavigate();
  const { myInfo, setMyIsInGame } = useUserState();
  const { register, handleSubmit, getValues, setValue } = useForm();

  const enterTheRoom = () => {
    const { roomName } = getValues();
    socket.emit("enterRoom", { roomName, loginInfo: myInfo.loginInfo }, (canGo: boolean) => {
      if (canGo) {
        navigate(`room/${roomName}`);
        setMyIsInGame(true);
      } else {
        alert("정원을 초과 했습니다.");
        setValue("roomName", "");
      }
    });
  };

  return (
    <UpperMatch>
      <FindMatch>
        <Description>Create or Join the Room!</Description>
        <Form isMatch={true} onSubmit={handleSubmit(enterTheRoom)}>
          <Input
            isMatch={true}
            {...register("roomName", {
              required: true
            })}
            placeholder="Room Name"
          />
        </Form>
      </FindMatch>
      <Login />
    </UpperMatch>
  );
};

export default Match;

const UpperMatch = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: var(--color-grey-300);
  border-radius: 15px;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.6);
`;
const FindMatch = styled.div`
  width: 100%;
  background: linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0));
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  font-weight: 700;
  padding-top: 20px;
`;
const Description = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: var(--size-7);
`;
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
