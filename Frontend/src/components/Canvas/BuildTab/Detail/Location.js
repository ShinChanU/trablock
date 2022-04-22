import React, { useState, memo, useEffect } from 'react';
import styled, { css } from 'styled-components';
import palette from 'lib/styles/palette';
import { Draggable } from 'react-beautiful-dnd';
import Time from 'lib/Icons/Time';
import Close from 'lib/Icons/Close';
import { useStore } from 'lib/store';
import oc from 'open-color';

const Container = styled.div`
  display: flex;
  line-height: 1.5;
  user-select: none;
  width: 220px;
  margin: auto;
  margin-bottom: 10px;
  box-shadow: 3px 3px 3px 3px ${palette.gray[5]};
  border-radius: 4px;
  background: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
`;

const Span = styled.span`
  font-weight: normal;
  font-size: 10px;
`;

const Div = styled.div`
  ${(props) =>
    props.index === 0 &&
    props.day &&
    css`
      > div {
        margin-bottom: 0px;
        box-shadow: 0px 0px 0px 0px ${palette.gray[5]};
      }
      background-color: ${oc.teal[6]};
      padding-bottom: 10px;
    `}
`;

const LocTime = styled.div`
  font-weight: normal;
  font-size: 12px;
`;

const Clone = styled(Container)`
  ~ div {
    transform: none !important;
  }
`;

const List = styled.li`
  display: flex;
  list-style: none;
  width: 100%;
  /* background-color: ${palette.gray[0]}; */
  /* border-radius: 4px; */
  padding: 5px;
`;

const ImgDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  height: 30px;
`;

const ListDiv = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
  font-weight: bold;
`;

const Name = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Btn = styled.div`
  display: none;
  ${(props) =>
    props.day &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      color: ${palette.gray[6]};
    `}
`;

const getRenderItem = (items, className) => (provided, snapshot, rubric) => {
  const item = items[rubric.source.index];
  return (
    <React.Fragment>
      <li
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        style={provided.draggableProps.style}
        className={snapshot.isDragging ? 'dragging' : ''}
      >
        {item.label}
      </li>
    </React.Fragment>
  );
};

const Location = ({ location, index, day, id }) => {
  const { dayLocDel, setViewTime } = useStore();

  const onClick = () => {
    dayLocDel(day.days, index); // 함수수정,
  };

  return (
    <>
      {/* location */}
      {/* {day && console.log(day.locations[index - 1])} */}
      <Draggable
        draggableId={String(id)}
        index={index}
        key={id}
        // type="location"
      >
        {(provided, snapshot) => (
          <Div index={index} day={day}>
            <Container
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              isDragging={snapshot.isDragging}
              style={provided.draggableProps.style}
              index={index}
              day={day}
            >
              <List>
                <ImgDiv>
                  <Img src={location.image} alt="img" />
                </ImgDiv>
                <ListDiv>
                  <div>
                    <div>
                      <>{location.name}</>
                      {day && index !== 0 && location.arriveTime !== '' && (
                        <Span>(도착 시간: {location.arriveTime})</Span>
                      )}
                    </div>
                    {day ? (
                      <LocTime>
                        {index === 0 ? (
                          <>
                            {location.startTime
                              ? `${setViewTime(
                                  location.startTime,
                                  'start',
                                )} 출발`
                              : `출발지의 출발시각을 입력해주세용`}
                          </>
                        ) : (
                          <>
                            {location.stayTime
                              ? `${setViewTime(location.stayTime, 'stay')} 체류` // 0422 출발시간도 보여줄까?
                              : '체류시간과 이동수단 및 시간을 입력해주세용'}
                          </>
                        )}
                      </LocTime>
                    ) : (
                      ''
                    )}
                  </div>
                  <Btn day={day}>
                    <Close size="18" onClick={onClick} tooltip={true} />
                    <Time
                      title={index === 0 ? '출발시각' : '체류시간'}
                      index={index}
                      day={day}
                    />
                  </Btn>
                </ListDiv>
              </List>
            </Container>
            {/* 0404 작성중 */}
            {snapshot.isDragging && !day && (
              <Clone>
                <List>
                  <ImgDiv>
                    <Img src={location.image} alt="img" />
                  </ImgDiv>
                  <ListDiv>{location.name}</ListDiv>
                </List>
              </Clone>
            )}
          </Div>
        )}
      </Draggable>
    </>
  );
};

export default Location;
