import styled from "styled-components";
import Match from "../components/Match";

import chessBGImg from "../assets/png/chessBGImg.png"

const FindRoomPage = () => {
  return (
    <Wrap>
      <Match />
    </Wrap>
  )
};

export default FindRoomPage;

const Wrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${chessBGImg});
  background-size: cover;
`;
