import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import palette from 'lib/styles/palette';
import ArrowIcon from './ArrowIcon';
import Item from './Item';

const Div = styled.div`
  background-color: ${palette.gray[3]};
  padding: 10px;
  margin: 10px;
  height: 6vh;
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
  ${(props) =>
    props.clickState &&
    css`
      overflow: auto;
      height: 42.5vh;
    `}
`;

const Title = styled.div`
  height: calc(6vh - 20px);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Ul = styled.ul`
  padding: 0;
`;

const CanvasBlock = ({ data, type }) => {
  const [clickState, setClickState] = useState(false);

  const onClick = () => {
    setClickState(!clickState);
  };

  return (
    <Div clickState={clickState}>
      <Title>
        {type}
        <ArrowIcon onClick={onClick} />
      </Title>
      <Ul>
        {/* {console.log(data)} */}
        {data.map((data) => (
          <Item data={data} key={data.id} />
        ))}
      </Ul>
    </Div>
  );
};

export default CanvasBlock;
