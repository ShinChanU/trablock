import React from 'react';
import styled from 'styled-components';
import BuildBlockForm from 'containers/Canvas/BuildBlockForm';
import 'components/Canvas/BuildTab/Styles/CanvasComponent.scss';

const CanvasDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 75vh;
  width: 100%;
  padding-left: 17.5%;
  /* z-index: -1; */
  /* background-color: red; */
`;

const H1 = styled.div`
  font-size: $font-lg;
`;

const textMap = {
  setting: '여행 설정',
  select: '블록 선택',
  build: '여행 캔버스',
  share: '여행 공유',
};

const CanvasForm = ({ type }) => {
  const text = textMap[type];

  return (
    <CanvasDiv>
      <H1>{text}</H1>
      {type === 'build' && <BuildBlockForm />}
    </CanvasDiv>
  );
};

export default CanvasForm;
