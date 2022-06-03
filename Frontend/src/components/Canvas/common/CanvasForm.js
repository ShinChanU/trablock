import React from 'react';
import styled from 'styled-components';
import BuildBlockForm from 'containers/Canvas/BuildBlockForm';
import TravelSettingForm from 'containers/Canvas/TravelSettingForm';
import Block from 'containers/Canvas/Block';

const CanvasDiv = styled.div``;

const CanvasForm = ({ type }) => {
  return (
    <CanvasDiv>
      {/* <H1>{text}</H1> */}
      {/* <PlanName /> 어디에 넣을지.. */}
      {type === 'setting' && <TravelSettingForm />}
      {type === 'select' && <Block />}
      {type === 'build' && <BuildBlockForm />}
      {/* {type === 'share' && <TravelSettingForm />} */}
    </CanvasDiv>
  );
};

export default CanvasForm;
