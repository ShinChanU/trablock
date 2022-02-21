import React from 'react';
import styled from 'styled-components';
import palette from 'lib/styles/palette';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled('div')`
  border: 1px solid lightgrey;
  margin-bottom: 8px;
  border-radius: 2px;
  padding: 8px;
  background: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
`;

const List = styled.li`
  display: flex;
  list-style: none;
  margin-bottom: 11px;
  background-color: ${palette.gray[0]};
  box-shadow: 3px 3px 3px 3px ${palette.gray[5]};
  padding: 5px;
`;

const Img = styled.img`
  width: 5vw;
  height: 3.2vw;
`;

const ListDiv = styled.div`
  margin-left: 5px;
  font-weight: bold;
`;

const Location = ({ location, index, type }) => {
  return (
    <>
      {console.log(location, index, type)}
      <Draggable draggableId={location.id} index={index} type="location">
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
                {location.id}
                {/* id는 일단 한글 name으로 설정해둚, 모든 location의 id가 다르게 생성되어야함 */}
                <br />
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
