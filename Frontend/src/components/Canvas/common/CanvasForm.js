import React from 'react';
import styled from 'styled-components';
import BuildBlockForm from 'containers/Canvas/BuildBlockForm';
import TravelSettingForm from 'containers/Canvas/TravelSettingForm';
// import PlanName from './PlanName';
import Block from 'containers/Canvas/Block';

const CanvasDiv = styled.div`
  /* position: absolute; */
  /* top: 50%; */
  /* left: 50%; */
  /* transform: translate(-50%, -50%); */
  /* height: 75vh; */
  /* width: 100%; */
  /* padding-left: 17.5%; */
  /* z-index: -1; */
  /* background-color: red; */
  /* padding-top: 20px; */
  /* padding-left: 30px; */
  /* padding-right: 20px; */
  /* width: 100%; */
`;

const CanvasForm = ({ type }) => {
  // const text = textMap[type];

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
