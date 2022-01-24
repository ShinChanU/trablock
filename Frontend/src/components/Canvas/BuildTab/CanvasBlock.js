import React from 'react';
import styled from 'styled-components';

const List = styled.li`
  border: 3px solid midnightblue;
`;

const Img = styled.img`
  width: 200px;
`;

const CanvasBlock = ({ data }) => {

  return (
    <>
      <ul>
        {data.map(data => (
          <List key={data.id}>
            여행지: {data.name}<br />
            이미지: <Img src={data.image} alt="img" />
          </List>
        ))}
      </ul>
      {console.log(data)}
    </>
  );
};

export default CanvasBlock;

// 0124 블록  over 시에 스크롤 생기게 하기