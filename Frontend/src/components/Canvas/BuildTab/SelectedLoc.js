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

// const category = [
//   {
//     id: 1,
//     engName: 'attractions',
//     korName: '관광지',
//   },
//   {
//     id: 2,
//     engName: 'restaurants',
//     korName: '음식점',
//   },
//   {
//     id: 3,
//     engName: 'accommodations',
//     korName: '숙박 시설',
//   },
// ];

// const type = ['관광지', '음식점', '숙박 시설'];

const SelectedLoc = ({ data }) => {
  return (
    <Div>
      <CanvasBlock data={data.attractions} type="관광지" />
      <CanvasBlock data={data.restaurants} type="음식점" />
      <CanvasBlock data={data.accommodations} type="숙박 시설" />
    </Div>
  );
};

export default SelectedLoc;

// 0216
// 컴포넌트 재사용에 대해 생각 해보자
// 뭔가 반복문으로 json data.${여기..} 다른 데이터를 보낼 수 있을 거같은데..
