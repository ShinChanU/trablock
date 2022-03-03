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

const DndMainArea = ({ userPlan, globalLocations }) => {
  const { travelDays, dayOrder, selectedLocations } = userPlan;

  //0228 너무 고민중...
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    // dnd
    // result : combine, destination, draggableId, mode, reason, source{index, droppableId}, type
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId ||
      destination.index === source.index
    )
      return;
    console.log(result);

    // select에서 움직임
    const startLocs = selectedLocations;
    let startLocsIds; // 장바구니에서의 loc_id : ["만장굴", "성산 일출봉"]
    let startDay; // day object
    let startDayLocationIds; // day loc_id : [{ "attractions": "한라산" }]

    // 0228 여기부터 다시 확인
    if (startLocs[source.droppableId])
      startLocsIds = selectedLocations[source.droppableId];
    else {
      startDay = travelDays[source.droppableId];
      startDayLocationIds = [...startDay.locationIds];
    }
    console.log(startLocs, startLocsIds, startDay, startDayLocationIds);

    // day에서 움직임
    // if (start === undefined) start = travelDays[source.droppableId];
    const end = travelDays[destination.droppableId];
    let endLocationIds;
    if (end) endLocationIds = [...end.locationIds];

    if (end !== undefined) {
      let draggableObj = {};
      draggableObj[source.droppableId] = draggableId;
      console.log(draggableObj);
      if (startLocsIds) startLocsIds.splice(source.index, 1);
      else startDayLocationIds.splice(source.index, 1);
      endLocationIds.splice(destination.index, 0, draggableObj);
    }

    // const newSelect = {
    //   ...startLocs,
    //   startLocsIds,
    // }

    // const endDay = {
    //   ...end,
    //   locationIds: end.locationIds,
    // };

    // setPlan({
    //   ...plan,
    //   travelDays: {
    //     [end.id]: endDay,
    //     []: ,
    //   },
    //   selectedLocations: {
    //     ...selectedLocations,

    //   }
    // });
  }; // 작성해야함 0221

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {/* 담은 블록 */}
          <Basket>
            {categoryKeys.map((category) => {
              // 카테고리별로 데이터 전달
              const locations = selectedLocations[category].map(
                (locationId) => globalLocations[category][locationId],
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
            {dayOrder.map((dayId) => {
              // 데이 개수, 순서에 따라 저장된 데이터 전달(json)
              const day = travelDays[dayId]; // object
              const locations = day.locationIds.map((locationId) => {
                let category = Object.keys(locationId).join();
                let key = locationId[category];
                return globalLocations[category][key];
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
