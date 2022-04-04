import React, { useEffect } from 'react'; // useEffect
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import SelLocBasket from './dnd/SelLocBasket';
import PlanDays from './dnd/PlanDays';
import { useStore } from 'lib/store';

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

// 스크롤 css
// const Basket = styled.div`
//   width: 280px;
//   background-color: rgb(109, 144, 176);
//   overflow: auto;

//   ::-webkit-scrollbar {
//     width: 10px;
//   }
//   ::-webkit-scrollbar-thumb {
//     background-color: #2f3542;
//   }
//   ::-webkit-scrollbar-track {
//     background-color: grey;
//   }
// `;

const DndMainArea = () => {
  const { category, pushLocToDay, dayLocChange, userPlan } = useStore();

  const onDragEnd = (result) => {
    // dnd 구현, 0330,
    const { destination, source } = result;
    if (!destination) return;

    console.log(destination);
    // switch(source.droppableId) {

    // }

    const startDropId = source.droppableId;
    const endDropId = destination.droppableId;
    // 출발 selectedLocation, 도착 day
    // if (
    //   category[startDropId] !== undefined &&
    //   category[endDropId] === undefined
    // )
    //   pushLocToDay(
    //     destination.droppableId,
    //     destination.index,
    //     source.droppableId,
    //     source.index,
    //   );
    // // 출발 day, 도착 day
    // else if (
    //   category[startDropId] === undefined &&
    //   category[endDropId] === undefined
    // ) {
    //   dayLocChange(
    //     destination.droppableId,
    //     destination.index,
    //     source.droppableId,
    //     source.index,
    //   );
    // }
  };

  useEffect(() => {
    console.log(userPlan);
  }, []);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {/* 담은 블록 */}
          <SelLocBasket />
          {/* 데이 */}
          <PlanDays />
        </Container>
      </DragDropContext>
    </>
  );
};

export default DndMainArea;

// 참고 레퍼런스
// https://codesandbox.io/s/react-beautiful-dnd-example-forked-9l3wz8?file=/src/index.js

// 0307
// https://react-icons.github.io/react-icons/
// https://technicolour.tistory.com/56

// 0404
// https://codesandbox.io/s/khno7?file=/src/App.js
