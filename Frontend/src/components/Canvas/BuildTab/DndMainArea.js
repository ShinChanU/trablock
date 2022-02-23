import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import palette from 'lib/styles/palette';
import axios from 'axios';
import Day from 'components/Canvas/BuildTab/Day';
import CanvasBlock from './CategoryBlock';

const Container = styled.div`
  overflow: auto;
  height: 100%;
  display: flex;
  margin-top: 25px;
  background-color: ${palette.gray[3]};
`;

const Basket = styled.div`
  overflow: auto;
  height: 60vh;
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

const categoryObj = {
  attractions: '관광지',
  restaurants: '음식점',
  accommodations: '숙박시설',
};

const categoryKeys = Object.keys(categoryObj);

const DndMainArea = ({ plan }) => {
  const { travelDays, dayOrder, selectedLocations } = plan;
  const [gLocations, setGLocations] = useState(null);

  useEffect(() => {
    let completed = false;
    const getGLocations = async () => {
      const result = await axios.get('http://localhost:4000/locations');
      if (!completed) setGLocations(result.data);
    };
    getGLocations();
    return () => {
      completed = true;
    };
  }, []);

  const onDragEnd = (result) => {
    console.log(result);
    // dnd
    // result : combine, destination, draggableId, mode, reason, source{index, droppableId}, type
    // const { destination, source, draggableId, type } = result;
    // if (!destination) return;
    // if (
    //   destination.droppableId === source.droppableId &&
    //   destination.index === source.index
    // )
    //   return;
    // if (source.droppableId)
    // const start =
    // console.log(category.indexOf(source.droppableId));
  }; // 작성해야함 0221

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {/* 담은 블록 */}
          <Basket>
            {gLocations &&
              categoryKeys.map((category) => {
                // 카테고리별로 데이터 전달
                const locations = selectedLocations[category].map(
                  (locationId) => gLocations[category][locationId],
                );
                return (
                  <CanvasBlock
                    key={category}
                    locations={locations}
                    type={categoryObj[category]}
                  />
                );
              })}
          </Basket>
          {/* 데이 */}
          {gLocations &&
            dayOrder.map((dayId) => {
              // 데이 개수, 순서에 따라 저장된 데이터 전달(json)
              const day = travelDays[dayId]; // object
              const locations = day.locationIds.map((locationId) => {
                let category = Object.keys(locationId).join();
                let key = locationId[category];
                return gLocations[category][key];
              });
              return <Day key={day.id} day={day} locations={locations} />;
            })}
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
