import React from 'react';
import CanvasMenu from './CanvasMenu';
import styled from 'styled-components';
import CanvasButtons from './CanvasButtons';
import oc from 'open-color';

const Container = styled.div`
  /* display: flex; */
  /* height: 100vh; // header 생기면 변환 필요 */
  height: 100vh;
`;

const Div = styled.div`
  flex: 1;
  /* background-color: ${oc.teal[1]}; */
  /* background: linear-gradient(to right, white, gray); */
  /* margin: 0px 40px; */
  /* margin-top: 20px; */
`;
/* ${shadow(1)} */

const CanvasTemplate = ({ children }) => {
  return (
    <Container>
      <CanvasMenu />
      <Div>
        {children}
        <CanvasButtons />
      </Div>
    </Container>
  );
};

export default CanvasTemplate;
