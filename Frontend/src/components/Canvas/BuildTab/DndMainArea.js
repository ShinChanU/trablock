import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import palette from 'lib/styles/palette';
import Day from 'components/Canvas/BuildTab/Day';
import CategoryBlock from './CategoryBlock';

const Container = styled.div`
  overflow: auto;
  height: 70vh;
  display: flex;
  /* margin-top: 25px; */
  background-color: ${palette.gray[3]};
`;

const Basket = styled.div`
  overflow: auto;
  width: 280px;
  /* height: 60vh; */
  /* margin-left: 30px; */
  background-color: rgb(109, 144, 176);

  ::-webkit-scrollbar {
    /* width: 10px; */
  }
  ::-webkit-scrollbar-thumb {
    background-color: #2f3542;
  }
  ::-webkit-scrollbar-track {
    background-color: grey;
  }
`;

const Days = styled.div`
  /* width: 70%; */
  display: flex;
  flex: 1; //남은 영역 모두 채움
  justify-content: space-around;
`;

const categoryObj = {
  attractions: '관광지',
  restaurants: '음식점',
  accommodations: '숙박시설',
};

const categoryKeys = Object.keys(categoryObj);

const DndMainArea = ({ userPlan, globalLocations, setUserPlanData }) => {
  const { travelDays, dayOrder, selectedLocations } = userPlan;

  // 0304 drop 까지 구현완료
  // day에서 재정렬할때 구현필요함
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    // dnd
    if (!destination) return;
    const startDropId = source.droppableId;
    const endDropId = destination.droppableId;
    if (startDropId === endDropId) return;
    if (
      // 출발이 selectedLocation 도착 day
      categoryKeys.indexOf(startDropId) !== -1 &&
      categoryKeys.indexOf(endDropId) === -1
    ) {
      console.log(result);
      const dragIdObj = {};
      dragIdObj[startDropId] = draggableId;
      console.log(dragIdObj);
      const newSelLocOrder = { ...selectedLocations };
      const newDayOrder = { ...travelDays };
      newSelLocOrder[startDropId].splice(source.index, 1);
      console.log(newSelLocOrder);
      newDayOrder[endDropId].locationIds.splice(
        destination.index,
        0,
        dragIdObj,
      );
      setUserPlanData({
        ...userPlan,
        selectedLocations: newSelLocOrder,
        travelDays: newDayOrder,
      });
    }
    if (
      // 출발이 day 도착 day
      categoryKeys.indexOf(startDropId) === -1 &&
      categoryKeys.indexOf(endDropId) === -1
    ) {
      const dragIdObj = {};
      const newDayOrder = { ...travelDays };
      const temp = newDayOrder[startDropId].locationIds.splice(source.index, 1);
      dragIdObj[Object.keys(temp[0])[0]] = draggableId;
      console.log(dragIdObj);
      newDayOrder[endDropId].locationIds.splice(
        destination.index,
        0,
        dragIdObj,
      );
      setUserPlanData({
        ...userPlan,
        travelDays: newDayOrder,
      });
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {/* 담은 블록 */}
          <Basket>
            {categoryKeys.map((category) => {
              // 카테고리별로 데이터 전달
              const locations = selectedLocations[category].map(
                (locationId) => {
                  let locObj = {};
                  locObj = globalLocations[category][locationId];
                  locObj['category'] = category;
                  return locObj;
                },
              );
              return (
                <CategoryBlock
                  key={category}
                  locations={locations}
                  type={category}
                />
              );
            })}
          </Basket>
          {/* 데이 */}
          <Days>
            {dayOrder &&
              dayOrder.map((dayId) => {
                // 데이 개수, 순서에 따라 저장된 데이터 전달(json)
                const day = travelDays[dayId]; // object
                const locations = day.locationIds.map((locationId) => {
                  let locObj = {};
                  let category = Object.keys(locationId).join();
                  let key = locationId[category];
                  locObj = globalLocations[category][key];
                  locObj['category'] = category;
                  return locObj;
                });
                return <Day key={day.id} day={day} locations={locations} />;
              })}
          </Days>
        </Container>
      </DragDropContext>
    </>
  );
};

export default DndMainArea;

//https://codesandbox.io/s/react-beautiful-dnd-example-forked-9l3wz8?file=/src/index.js

// 0216
// 컴포넌트 재사용에 대해 생각 해보자
// 뭔가 반복문으로 json data.${여기..} 다른 데이터를 보낼 수 있을 거같은데..

// 0221
// 현재 진행 상황
// data.json 에 있는 개수 기반
// category 3개, 전체 droppable, 각 요소 location(draggable)
// day 2개, 전체 droppable, 각 요소 location(draggable)
// 드래그로 움직이기만 하는 상황, 드랍 기능 추가해야함
// 그리고, 드래그를 잡았을 때 위치가 살짝 아래로 잡히는데 이 또한 수정해야함.

// 0223
// BockBasket Component 삭제
// data.json 에 dayOrder와 travelDays는 초기 설정에서 설정시 생성
// scss 삭제해야함
// 그리고, 드래그를 잡았을 때 위치가 살짝 아래로 잡히는데 이 또한 수정해야함.(0228 수정, css position 문제)

// 0228
// Basket 에서 CanvasBlock 중 하나의 카테고리가 열리면 하나는 닫히도록 설정해서 높이 조절
// onDragEnd 에서 순서 조정
// 결국 redux로 plan을 받아와서 useState로 상태 저장을 하는데, 장바구니의 세개의 순서, day의 2개의 각각 id순서들을 splice를 사용해서 올바르게 정렬후 setState 로 상태를 저장해야함

// 0303
// redux 안 쓰고, 위 component 에서 props 받아오는걸로..
