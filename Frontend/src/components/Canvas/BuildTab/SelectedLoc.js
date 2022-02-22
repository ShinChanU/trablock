import React from 'react';
import styled from 'styled-components';
import './CanvasComponent.scss';
import CanvasBlock from './CategoryBlock';

const Div = styled.div`
  overflow: auto;
  height: 60vh;
  /* margin-left: 30px; */
  background-color: rgb(109, 144, 176);

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #2f3542;
  }
  ::-webkit-scrollbar-track {
    background-color: grey;
  }
`;

const SelectedLoc = ({ locations }) => {
  const { attractions, restaurants, accommodations } = locations;

  return (
    <Div>
      <CanvasBlock locations={attractions} type="attractions" />
      <CanvasBlock locations={restaurants} type="restaurants" />
      <CanvasBlock locations={accommodations} type="accommodations" />
    </Div>
  );
};

export default SelectedLoc;

// 0216
// 컴포넌트 재사용에 대해 생각 해보자
// 뭔가 반복문으로 json data.${여기..} 다른 데이터를 보낼 수 있을 거같은데..
