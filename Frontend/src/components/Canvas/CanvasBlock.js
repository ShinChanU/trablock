import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  width: 200px;
`;

const CanvasBlock = ({ data }) => {

  return (
    <>
      <ul>
        {data.map(data => (
          <li key={data.id}>
            여행지: {data.name}<br />
            이미지: <Img src={data.image} alt="img" />
          </li>
        ))}
      </ul>
      {console.log(data)}
    </>
  );
};

export default CanvasBlock;