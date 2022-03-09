import React, { useMemo, memo } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Location from './Location';
import DayHeader from './DayHeader';
import oc from 'open-color';

const Container = styled('div')`
  margin: 8px;
  border-radius: 15px;
  border: 1px solid lightgrey;
  /* display: flex; */
  flex-direction: day;
  width: 270px;
  background: white;
`;

const Title = styled('h3')`
  text-align: center;
`;

const LocationsList = styled('div')`
  /* padding: 8px; */
  flex-grow: 1;
  min-height: 100px;
  transition: background-color ease 0.2s;
  background-color: ${(props) =>
    props.isDraggingOver ? 'palevioletred' : 'white'};
`;

const InitForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${oc.indigo[6]};
  background-color: ${oc.indigo[2]};
  height: 40px;
  width: 100%;
  padding: 8px;
`;

const EmptyBlock = styled.div`
  background-color: white;
  font-size: 10px;
  padding: 7px;
`;

const Day = memo(({ day, locations, onClick }) => {
  const map = useMemo(() => {
    // locations;
    // console.log(locations);
    locations.map((e, i) => {
      return (
        <Location
          key={e.id}
          location={e}
          index={i}
          onClick={onClick}
          day={day}
        />
      );
    });
  }, [locations, day, onClick]);

  return (
    <Container>
      <DayHeader day={day} />
      <Droppable droppableId={day.id} type="location">
        {(provided, snapshot) => (
          <LocationsList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {locations[0] === undefined && (
              <InitForm>
                <EmptyBlock>
                  블록 혹은 자체 생성한 블록을 넣어주세요.
                </EmptyBlock>
              </InitForm>
            )}
            {console.log(day, locations)}
            {locations.map((location, index) => {
              return (
                <Location
                  key={location.id}
                  location={location}
                  index={index}
                  onClick={onClick}
                  day={day}
                />
              );
            })}
            {/* {map} */}
            {provided.placeholder}
          </LocationsList>
        )}
      </Droppable>
    </Container>
  );
});

export default Day;
