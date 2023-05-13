import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { socket } from "../lib/socketIo";
import styled from "styled-components";

const Match = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, getValues, setValue } = useForm();

  const enterTheRoom = () => {
    const { roomName } = getValues();
    socket.emit("enterRoom", roomName, (canGo: boolean) => {
      if (canGo) {
        navigate(`room/${roomName}`);
      } else {
        alert("정원을 초과 했습니다.");
        setValue("roomName", "");
      }
    });
  };
  return (
    <UpperMatch>
      <Description>Create or Join the Room!</Description>
      <form onSubmit={handleSubmit(enterTheRoom)}>
        <Input {...register("roomName")} placeholder="Room Name" />
      </form>
    </UpperMatch>
  );
};

export default Match;

const UpperMatch = styled.div`
  height: 200px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0));
  border-radius: 10px;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.6);
  font-weight: 700;
`;
const Description = styled.div`
  height: 70px;
  width: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.7em;
`;
const Input = styled.input`
  height: 60px;
  width: 320px;
  border-radius: 10px;
  text-align: center;
  font-size: 1.2em;
`;
