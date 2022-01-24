import React from 'react';
import CanvasMenu from './CanvasMenu';
import styled from 'styled-components';
// import { Container } from 'react-bootstrap/Container';
// import { Row } from 'react-bootstrap/Row';
// import { Col } from 'react-bootstrap/Col';

// grid 적용 0107
const GridDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
`;

const CanvasTemplate = ({ children }) => {
  return (
    <GridDiv>
      <CanvasMenu />
      {children}
    </GridDiv>
  );
};

export default CanvasTemplate;