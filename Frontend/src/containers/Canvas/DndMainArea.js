import React from 'react';
import styled from 'styled-components';
import palette from 'lib/styles/palette';
import SelectedLoc from 'components/Canvas/BuildTab/SelectedLoc';
import Days from 'components/Canvas/BuildTab/Days';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
  height: 100%;
  display: flex;
  margin-top: 25px;
  background-color: ${palette.gray[3]};
`;

const DndMainArea = ({ data }) => {
  const onDragEnd = (result) => {};
  const { travelDays, dayOrder, selectedLocations } = data;
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {console.log(travelDays, dayOrder, selectedLocations)}
        <Droppable droppableId="all-area" type="plan">
          {(provided) => (
            <Container ref={provided.innerRef} {...provided.droppableProps}>
              {dayOrder.map((dayId, index) => {
                const day = travelDays[dayId];
                const locations // 0217 doing
              })}
              <SelectedLoc data={data} />
              <Days />
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default DndMainArea;

//https://codesandbox.io/s/react-beautiful-dnd-example-forked-9l3wz8?file=/src/index.js
//0217 doing.
