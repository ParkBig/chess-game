import { css } from '@emotion/react';
import { Helmet } from 'react-helmet-async';
import Match from 'components/home-page/Match';

import chessBGImg from 'assets/background/chessBGImg.png';

export default function FindRoomPage() {
  return (
    <div css={wrap}>
      <Helmet>
        <title>Chess | find Room or Create</title>
      </Helmet>
      <Match />
    </div>
  );
}

const wrap = css`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${chessBGImg});
  background-size: cover;
`;
