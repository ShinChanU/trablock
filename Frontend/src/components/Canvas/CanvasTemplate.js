import React from 'react';
import CanvasMenu from './CanvasMenu';
import styled from 'styled-components';
// import { Container } from 'react-bootstrap/Container';
// import { Row } from 'react-bootstrap/Row';
// import { Col } from 'react-bootstrap/Col';

// grid 적용 0107
// flex로 변경 0228
const Div = styled.div`
  display: flex;
  height: 100vh; // header 생기면 변환 필요
  /* grid-template-columns: 1fr 6fr; */
`;

const CanvasTemplate = ({ children }) => {
  return (
    <Div>
      <CanvasMenu />
      {children}
    </Div>
  );
};

export default CanvasTemplate;
