import React from 'react';
import styled, { css } from 'styled-components';
import palette from 'lib/styles/palette';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  /* border: 1px solid lightgrey; */
  margin-bottom: 8px;
  border-radius: 2px;
  /* padding: 8px; */
  background: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
`;

const Btn = styled.button`
  display: none;
  ${(props) =>
    props.day &&
    css`
      display: block;
      height: 18px;
      width: 18px;
      padding: 0px;
      visibility: hidden;
    `}
`;

const List = styled.li`
  display: flex;
  list-style: none;
  /* margin-bottom: 11px; */
  background-color: ${palette.gray[0]};
  box-shadow: 3px 3px 3px 3px ${palette.gray[5]};
  padding: 5px;
  /* justify-content: space-b e; */
  &:hover ${Btn} {
    visibility: visible;
    /* width: 200px; */
    transition: 1s;
  }
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

const Location = ({ location, index, type, onClick, day }) => {
  const onClickX = () => {
    onClick(day, location, index);
  };

  return (
    <>
      {/* {console.log(key, location, index, type)} */}
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
                  <Btn day={day} onClick={onClickX}>
                    x
                  </Btn>
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
};

export default Location;
