import React from 'react';
import styled from 'styled-components';
import palette from 'lib/styles/palette';
import SelectedLoc from 'components/Canvas/BuildTab/SelectedLoc';
import Days from 'components/Canvas/BuildTab/Days';
import { DragDropContext } from 'react-beautiful-dnd';

const Container = styled.div`
  height: 100%;
  display: flex;
  margin-top: 25px;
  background-color: ${palette.gray[3]};
`;

const DndMainArea = ({ plan }) => {
  const onDragEnd = (result) => {}; // 작성해야함 0221
  const { travelDays, dayOrder, selectedLocations } = plan;
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          <SelectedLoc locations={selectedLocations} />
          {dayOrder.map((dayId) => {
            // day 개수만큼 반환
            const day = travelDays[dayId]; // object
            const locations = day.locationIds.map((locationId) => {
              return selectedLocations.attractions[locationId]; // attraction에서만 검색되게 함 3개 카테고리 모두 검색으로 변경해야함
            });
            return <Days key={day.id} day={day} locations={locations} />;
          })}
        </Container>
      </DragDropContext>
    </>
  );
};

export default DndMainArea;

//https://codesandbox.io/s/react-beautiful-dnd-example-forked-9l3wz8?file=/src/index.js
//0217 doing, done.

// 0221
// 현재 진행 상황
// data.json 에 있는 개수 기반
// category 3개, 전체 droppable, 각 요소 location(draggable)
// day 2개, 전체 droppable, 각 요소 location(draggable)
// 드래그로 움직이기만 하는 상황, 드랍 기능 추가해야함
// 그리고, 드래그를 잡았을 때 위치가 살짝 아래로 잡히는데 이 또한 수정해야함.
