import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 60.25%;
`;

const Iframe = styled.iframe`
  position: absolute;
  width: 100%;
  height: 100%;
`;

// let from = '만장굴';
// let to = '그랜드하얏트호텔제주';

const MapMove = ({ fromLocName, toLocName }) => {
  return (
    <Container>
      <Iframe
        title="kakaoMap"
        src={`https://map.kakao.com/?sName=${fromLocName}&eName=${toLocName}`}
      />
    </Container>
  );
};

export default MapMove;
