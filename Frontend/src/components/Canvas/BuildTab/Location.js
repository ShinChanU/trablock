import React, { memo } from 'react';
import styled, { css } from 'styled-components';
import palette from 'lib/styles/palette';
import { Draggable } from 'react-beautiful-dnd';
import Time from 'lib/Icons/Time';
import Close from 'lib/Icons/Close';
import { useStore } from 'lib/store';

const Container = styled.div`
  width: 220px;
  margin: auto;
  margin-bottom: 10px;
  /* padding: 8px; */
  box-shadow: 3px 3px 3px 3px ${palette.gray[5]};
  border-radius: 4px;
  background: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
`;

const List = styled.li`
  display: flex;
  list-style: none;
  background-color: ${palette.gray[0]};
  border-radius: 4px;
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
  margin-left: 10px;
  font-weight: bold;
  flex: 1;
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

const Location = memo(({ location, index, day }) => {
  const { dayLocChange } = useStore();

  const onClick = () => {
    dayLocChange(day, location, index);
  };

  return (
    <>
      {/* location */}
      <Draggable draggableId={location.id} index={index} type="location">
        {(provided, snapshot) => (
          <Container
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            isDragging={snapshot.isDragging}
          >
            <List>
              <ImgDiv>
                <Img src={location.image} alt="img" />
              </ImgDiv>
              <ListDiv>
                <Name>{location.name}</Name>
                {/* id는 일단 한글 name으로 설정해둚, 모든 location의 id가 다르게 생성되어야함 */}
                도착시간
              </ListDiv>
              {/* day에 보여지는 location 만 버튼 생성 */}
              <Btn day={day}>
                <Close size="18" onClick={onClick} tooltip={true} />
                <Time title="체류시간" />
              </Btn>
            </List>
          </Container>
        )}
      </Draggable>
    </>
  );
});

export default Location;
