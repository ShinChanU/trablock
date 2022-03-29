import React, { useCallback, useEffect, useState } from 'react'; // useEffect
import { DragDropContext } from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';
import Day from 'components/Canvas/BuildTab/Day';
import CategoryBlock from 'components/Canvas/BuildTab/CategoryBlock';
import { useStore } from 'lib/store';
import oc from 'open-color';
import Location from './Location';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Div = styled.div`
  width: 350px;
  display: flex;
  /* border: 2px solid black; */
  font-size: 20px;
  font-weight: 550;
  height: 100%;
  /* justify-content: center; */
`;

const Item = styled.div`
  width: 100px;
  display: flex;
  border: 2px solid black;
  /* font-size: 20px;
  font-weight: 550; */
  align-items: center;
  :hover {
    cursor: pointer;
    background: ${oc.teal[6]};
    color: white;
    transition: background 0.2s linear;
  }

  :active {
    transform: translateY(1px);
  }
`;

const CategoryBlock2 = styled.div`
  /* display: none; */
  border: 2px solid black;
  flex: 1;
  ${(props) =>
    props.visible &&
    css`
      display: block;
    `}/* height: 100%; */
`;

const Basket = styled.div`
  width: 280px;
  background-color: rgb(109, 144, 176);
  overflow: auto;

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #2f3542;
  }
  ::-webkit-scrollbar-track {
    background-color: grey;
  }
`;

const Days = styled.div`
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

const DndMainArea = ({ selLoc, userPlan }) => {
  const { travelDays, periods } = userPlan;
  const { sysLoc, dayLocChange } = useStore();
  // const [visible, setVisible] = useState(false);

  const onClick = useCallback((day, location, index) => {
    console.log(day.id, location, index);
    // day->locationIds에서 해당 index 제거
    // selLoc -> category => 해당 index, 추가
    dayLocChange(day.id, location, index);
    // const category = location.category.slice();
    // const newSelLocOrder = { ...selectedLocations };
    // const newDayOrder = { ...travelDays };
    // newDayOrder[day.id].locationIds.splice(index, 1);
    // newSelLocOrder[category].push(location.id);
    // setUserPlanData({
    //   ...userPlan,
    //   selectedLocations: newSelLocOrder,
    //   travelDays: newDayOrder,
    // });
    // return;
  }, []); // waring 해결 못함

  const onDragEnd = (result) => {
    // dnd 구현
    const { destination, source, draggableId } = result;
    if (!destination) return;
    const startDropId = source.droppableId;
    const endDropId = destination.droppableId;
    // if (
    //   // 출발 selectedLocation, 도착 day
    //   categoryKeys.indexOf(startDropId) !== -1 &&
    //   categoryKeys.indexOf(endDropId) === -1
    // ) {
    //   const dragIdObj = {};
    //   dragIdObj[startDropId] = draggableId;
    //   const newSelLocOrder = { ...selectedLocations };
    //   const newDayOrder = { ...travelDays };
    //   newSelLocOrder[startDropId].splice(source.index, 1);
    //   newDayOrder[endDropId].locationIds.splice(
    //     destination.index,
    //     0,
    //     dragIdObj,
    //   );
    //   setUserPlanData({
    //     ...userPlan,
    //     selectedLocations: newSelLocOrder,
    //     travelDays: newDayOrder,
    //   });
    //   return;
    // } else if (
    //   // 출발 day, 도착 day(같은 day에서도 사용)
    //   categoryKeys.indexOf(startDropId) === -1 &&
    //   categoryKeys.indexOf(endDropId) === -1
    // ) {
    //   const dragIdObj = {};
    //   const newDayOrder = { ...travelDays };
    //   const temp = newDayOrder[startDropId].locationIds.splice(source.index, 1);
    //   dragIdObj[Object.keys(temp[0])[0]] = draggableId;
    //   newDayOrder[endDropId].locationIds.splice(
    //     destination.index,
    //     0,
    //     dragIdObj,
    //   );
    //   setUserPlanData({
    //     ...userPlan,
    //     travelDays: newDayOrder,
    //   });
    //   return;
    // }
  };

  // 0322 카테고리 클릭시 visible state변경
  const onClickItem = (e) => {
    // console.log(selLoc[e]);
    // console.log(e);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {/* 담은 블록 */}
          <Category>
            {Object.keys(selLoc).map((cate) => {
              return (
                <Div>
                  <Item onClick={() => onClickItem(cate)}>{cate}</Item>
                  {console.log(selLoc[cate])}
                  {/* {systemLocations && ( */}
                  <CategoryBlock2>
                    <header>{cate}</header>
                    <main>
                      <Droppable droppableId={cate} type="location">
                        {(provided) => (
                          <ul
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            {selLoc[cate].map((location, index) => {
                              return (
                                <Location
                                  location={location}
                                  index={index}
                                  key={location.id}
                                  // type={type}
                                  onClick={onClick}
                                />
                              );
                            })}
                            {provided.placeholder}
                          </ul>
                        )}
                      </Droppable>
                    </main>
                  </CategoryBlock2>
                </Div>
              );
            })}
          </Category>
          {/* 데이 */}
          <Days>
            {travelDays &&
              travelDays.map((day) => {
                // 데이 개수, 순서에 따라 저장된 데이터 전달(json)
                const locations = day.locationIds.map((e, i) => {
                  const type = day.locationType[i];
                  return sysLoc[type][e]; // location 객체(세부정보가 담겨있는)
                });
                return (
                  <Day
                    key={day.id}
                    day={day}
                    locations={locations}
                    onClick={onClick}
                    // moveData={day.moveData}
                  />
                );
                // }
              })}
          </Days>
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
