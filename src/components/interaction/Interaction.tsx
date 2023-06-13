import useUserState from "../../store/useUserState";
import Chat from "./Chat";
import GetReady from "./GetReady";
import UserInfo from "./UserInfo";

const Interaction = () => {
  const { myInfo } = useUserState();

  return (
    <>
      <UserInfo me={true}/>
      <UserInfo me={false}/>
      <Chat />
      <GetReady />
    </>
  );
};

export default Interaction;
