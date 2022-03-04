import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Location from './Location';

const Container = styled('div')`
  margin: 8px;
  border-radius: 15px;
  border: 1px solid lightgrey;
  /* display: flex; */
  flex-direction: day;
  width: 230px;
  background: white;
`;

const Title = styled('h3')`
  text-align: center;
`;

const LocationsList = styled('div')`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
  transition: background-color ease 0.2s;
  background-color: ${(props) =>
    props.isDraggingOver ? 'palevioletred' : 'white'};
`;

const Day = ({ day, locations }) => {
  return (
    <Container>
      <Title>{day.title}</Title>
      <Droppable droppableId={day.id} type="location">
        {(provided, snapshot) => (
          <LocationsList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {locations.map((location, index) => {
              return (
                <Location key={location.id} location={location} index={index} />
              );
            })}
            {provided.placeholder}
          </LocationsList>
        )}
      </Droppable>
    </Container>
  );
};

export default Day;
