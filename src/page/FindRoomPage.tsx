import styled from "styled-components";
import Match from "../components/Match";
import { Helmet } from "react-helmet-async";

import chessBGImg from "../assets/png/chessBGImg.png";

const FindRoomPage = () => {
  return (
    <Wrap>
      <Helmet>
        <title>Chess | find Room or Create</title>
      </Helmet>
      <Match />
    </Wrap>
  );
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
