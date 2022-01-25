import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import palette from 'lib/styles/palette';
// import { IconButton } from '@material-ui/core';
// import { styled } from '@mui/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowIcon from './ArrowIcon';

const Div = styled.div`
  background-color: ${palette.gray[3]};
  padding: 10px;
  margin: 10px;
  height: 60px;
  transition: all 0.2s linear;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #2f3542;
  }
  ::-webkit-scrollbar-track {
    background-color: grey;
  }
  overflow: hidden;
  ${props =>
    props.clickState &&
    css`
      overflow: auto;
      height: 25vh;
    `
  }
`;

const Title = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Ul = styled.ul`
  padding: 0;
  /* margin: 10px;
  height: 60px; */
  /* border: 3px solid yellow; */
`;

const List = styled.li`
  border: 3px solid black;
  border-radius: 5px;
  list-style: none;
  /* margin: 5px; */
`;

const Img = styled.img`
  width: 200px;
`;

const CanvasBlock = ({ data, type }) => {
  const [clickState, setClickState] = useState(false);

  const onClick = () => {
    setClickState(!clickState);
    console.log(clickState)
  };

  return (
    <Div clickState={clickState}>
      <Title>
        {type}
        <ArrowIcon onClick={onClick} />
      </Title>
      <Ul>
        {data.map(data => (
          <List key={data.id}>
            여행지: {data.name}<br />
            이미지: <Img src={data.image} alt="img" />
          </List>
        ))}
      </Ul>
      {console.log(data)}
    </Div>
  );
};

export default CanvasBlock;

// 0124 블록  over 시에 스크롤 생기게 하기