import Chat from './Chat';
import GetReady from './GetReady';
import UserInfo from './UserInfo';

export default function Interaction() {
  return (
    <>
      <UserInfo me={true} />
      <UserInfo me={false} />
      <Chat />
      <GetReady />
    </>
  );
}
