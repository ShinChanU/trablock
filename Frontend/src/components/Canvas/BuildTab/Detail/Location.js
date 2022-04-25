import React from 'react';
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

const Location = ({ location, index, day, id }) => {
  const { dayLocDel, setViewTime } = useStore();

  const onClick = () => {
    dayLocDel(day.days, index); // 함수수정,
  };

  return (
    <>
      <Draggable draggableId={String(id)} index={index} key={id}>
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
                      {day && index !== 0 && location['arrive_time'] !== '' && (
                        <Span>(도착 시간: {location['arrive_time']})</Span>
                      )}
                    </div>
                    {day ? (
                      <LocTime>
                        {index === 0 ? (
                          <>
                            {location['start_time']
                              ? `${setViewTime(
                                  location['start_time'],
                                  'start',
                                )} 출발`
                              : `출발지의 출발시각을 입력해주세용`}
                          </>
                        ) : (
                          <>
                            {location['stay_time']
                              ? `${setViewTime(
                                  location['stay_time'],
                                  'stay',
                                )} 체류` // 0422 출발시간도 보여줄까?
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
