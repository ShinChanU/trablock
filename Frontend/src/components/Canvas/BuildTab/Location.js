import React, { memo } from 'react';
import styled, { css } from 'styled-components';
import palette from 'lib/styles/palette';
import { Draggable } from 'react-beautiful-dnd';
import { MdClose } from 'react-icons/md';

const Container = styled.div`
  width: 90%;
  /* border: 1px solid lightgrey; */
  margin: auto;
  margin-bottom: 10px;
  border-radius: 2px;
  /* padding: 8px; */
  background: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
`;

const CloseBtn = styled(MdClose)`
  display: none;
  ${(props) =>
    props.day &&
    css`
      display: block;
      padding: 0px;
      color: ${palette.gray[6]};
      cursor: pointer;
      &:hover {
        transform: scale(1.3);
        transition: transform 0.2s linear;
      }
    `}
`;

const List = styled.li`
  display: flex;
  /* justify-content: center; */
  list-style: none;
  background-color: ${palette.gray[0]};
  box-shadow: 3px 3px 3px 3px ${palette.gray[5]};
  padding: 5px;
`;

const Img = styled.img`
  width: 5vw;
  height: 3.2vw;
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

const Location = memo(({ location, index, type, onClick, day }) => {
  const onClickX = () => {
    onClick(day, location, index);
  };

  return (
    <>
      <Draggable draggableId={location.id} index={index} type={type}>
        {(provided, snapshot) => (
          <Container
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            isDragging={snapshot.isDragging}
          >
            <List>
              <Img src={location.image} alt="img" />
              <ListDiv>
                <Name>
                  {location.id}
                  <CloseBtn day={day} onClick={onClickX} />
                </Name>
                {/* id는 일단 한글 name으로 설정해둚, 모든 location의 id가 다르게 생성되어야함 */}
                2021.01.26
              </ListDiv>
            </List>
          </Container>
        )}
      </Draggable>
    </>
  );
});

export default Location;
