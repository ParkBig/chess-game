import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { socket } from "./socketIo";

const Match = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, getValues } = useForm();

  const enterTheRoom = () => {
    const { roomName } = getValues();
    socket.emit("enterRoom", roomName, ()=>{navigate(`room/${roomName}`)})
  };

  return (
    <Wrap>
      <UpperMatch>
        <Description>
          방을 생성하거나 입장하세요.<br/>
          (문자,숫자 10글자까지.)
        </Description>
        <form onSubmit={handleSubmit(enterTheRoom)}>
          <Input {...register("roomName")} />
        </form>
      </UpperMatch>
    </Wrap>
  )
}

export default Match;

const Wrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const UpperMatch = styled.div`
  height: 280px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 1px solid black;
`;
const Description = styled.div`
  height: 100px;
  width: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const Input = styled.input`
  height: 70px;
  width: 300px;
  border-radius: 10px;
`;
