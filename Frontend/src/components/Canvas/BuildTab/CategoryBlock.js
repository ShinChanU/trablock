import React from 'react';
import styled from 'styled-components';
import CanvasBlock from './CanvasBlock';

const Div = styled.div`
`;

const CategoryBlock = ({ data }) => {
  return (
    <Div>
      <CanvasBlock data={data} type="관광지" />
      <CanvasBlock data={data} type="음식점" />
      <CanvasBlock data={data} type="숙박" />
    </Div>
  );
}

export default CategoryBlock;