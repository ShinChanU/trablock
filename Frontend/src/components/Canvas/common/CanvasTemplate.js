import React from 'react';
import CanvasMenu from './CanvasMenu';
import styled from 'styled-components';
import CanvasButtons from './CanvasButtons';

// grid 적용 0107
// flex로 변경 0228
const Div = styled.div`
  display: flex;
  /* height: 100vh; // header 생기면 변환 필요 */
  /* grid-template-columns: 1fr 6fr; */
`;

const CanvasTemplate = ({ children }) => {
  return (
    <Div>
      <CanvasMenu />
      <div>
        {/* <ButtonContainer>{children}</ButtonContainer> */}
        {children}
        <CanvasButtons />
      </div>
    </Div>
  );
};

export default CanvasTemplate;
