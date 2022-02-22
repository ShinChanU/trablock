import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import palette from 'lib/styles/palette';
import ArrowIcon from './ArrowIcon';
import Location from './Location';
import { Droppable } from 'react-beautiful-dnd';

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

const CanvasBlock = ({ locations, type }) => {
  const [clickState, setClickState] = useState(false);
  const [locationArr, setLocationArr] = useState([]);

  const onClick = () => {
    setClickState(!clickState);
  };

  useEffect(() => {
    const test = Object.entries(locations).map((entries, index) => entries);
    setLocationArr(test);
    console.log(test);
  }, [locations]);

  return (
    <Div clickState={clickState}>
      <Title>
        {type}
        <ArrowIcon onClick={onClick} />
      </Title>
      <Droppable droppableId={type} type="location">
        {(provided) => (
          <Ul ref={provided.innerRef} {...provided.droppableProps}>
            {locationArr.map((location, index) => {
              return (
                <Location
                  location={location[1]}
                  index={index}
                  key={location[1].id}
                  type="category"
                />
              );
            })}
            {provided.placeholder}
          </Ul>
        )}
      </Droppable>
    </Div>
  );
};

export default CanvasBlock;
