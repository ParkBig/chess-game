import styled from 'styled-components';
import Match from '../components/home-page/Match';
import { Helmet } from 'react-helmet-async';

import chessBGImg from '../assets/background/chessBGImg.png';

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
