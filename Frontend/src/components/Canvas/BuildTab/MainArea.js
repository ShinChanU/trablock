import React, { useState, useEffect } from 'react'; // useEffect
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import SelLocBasket from './Dnd/SelLocBasket';
import PlanDays from './Dnd/PlanDays';
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from 'react-icons/md';

const Div = styled.div`
  /* width: 150px; */
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FaceIcon = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 30px;
`;

const FontDiv = styled.div`
  font-size: 17px;
  font-weight: bold;
  color: #e64980;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const ToggleArea = styled.div`
  display: flex;
  align-items: center;
`;

const Toggle = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0);
  opacity: 0.5;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  :hover {
    cursor: pointer;
    opacity: 1;
    transform: scale(1.15);
    transition: 0.3s;
  }
`;

const MainArea = ({
  category,
  pushLocToDay,
  dayLocChange,
  selCateLoc,
  dayLocDel,
  setViewTime,
  userTravelDay,
  setTimeData,
  splitTime,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectArea, setSelectArea] = useState(-1);

  useEffect(() => {
    let keys = Object.keys(selCateLoc);
    let n = keys.length;
    for (let i = 0; i < n; i++) {
      if (selCateLoc[keys[i]].length > 0) setSelectArea(1);
    }
    console.log(selectArea);
    if (selectArea === -1) setSelectArea(100);
  }, [selCateLoc, selectArea]);

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const startDropId = source.droppableId;
    const endDropId = destination.droppableId;
    // 출발 selectedLocation, 도착 day
    if (
      category[startDropId] !== undefined &&
      category[endDropId] === undefined
    )
      pushLocToDay(
        destination.droppableId,
        destination.index,
        source.droppableId,
        source.index,
      );
    // 출발 day, 도착 day
    else if (
      category[startDropId] === undefined &&
      category[endDropId] === undefined
    ) {
      dayLocChange(
        destination.droppableId,
        destination.index,
        source.droppableId,
        source.index,
      );
    }
  };

  const onClickToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {selectArea === 100 && (
            <Div>
              <h2>여행 갈 곳이 읎다..</h2>
              <FaceIcon
                src={process.env.PUBLIC_URL + '/images/face1.png'}
                alt=""
              />
              <FontDiv>😥선택한 블록(여행지)가 하나도 없어요.😥</FontDiv>
              <FontDiv>😛이전으로 돌아가 여행지를 담아오세요!!😛</FontDiv>
            </Div>
          )}
          {/* 담은 블록 */}
          {selectArea === 1 && (
            <SelLocBasket
              isOpen={isOpen}
              category={category}
              selCateLoc={selCateLoc}
            />
          )}
          {selectArea === 1 && (
            <ToggleArea>
              <Toggle onClick={onClickToggle}>
                {!isOpen && (
                  <MdOutlineArrowForwardIos
                    style={{
                      color: 'white',
                    }}
                  />
                )}
                {isOpen && (
                  <MdOutlineArrowBackIos
                    style={{
                      color: 'white',
                    }}
                  />
                )}
              </Toggle>
            </ToggleArea>
          )}
          {/* 데이 */}
          {selectArea === 1 && (
            <PlanDays
              dayLocDel={dayLocDel}
              setViewTime={setViewTime}
              userTravelDay={userTravelDay}
              setTimeData={setTimeData}
              splitTime={splitTime}
            />
          )}
        </Container>
      </DragDropContext>
    </>
  );
};

export default MainArea;

// 참고 레퍼런스
// https://codesandbox.io/s/react-beautiful-dnd-example-forked-9l3wz8?file=/src/index.js

// 0307
// https://react-icons.github.io/react-icons/
// https://technicolour.tistory.com/56

// 0404
// https://codesandbox.io/s/khno7?file=/src/App.js
