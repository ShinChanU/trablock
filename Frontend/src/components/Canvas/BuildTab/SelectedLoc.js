import React from 'react';
import styled from 'styled-components';
import './CanvasComponent.scss';
// import CanvasBlock from './CanvasBlock';
import CategoryBlock from './CategoryBlock';

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

// const textMap = {
//   attraction: '관광지',
//   restaurant: '음식점',
//   lodge: '숙소'
// };

const SelectedLoc = ({ data }) => {
  return (
    <Div>
      <CategoryBlock data={data} />
    </Div>
  );
};

export default SelectedLoc;