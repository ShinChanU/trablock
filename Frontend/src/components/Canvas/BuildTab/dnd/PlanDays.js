import React from 'react';
import styled, { css } from 'styled-components';
import { useStore } from 'lib/store';
import oc from 'open-color';
import DayHeader from 'components/Canvas/BuildTab/Detail/DayHeader';
import { Droppable } from 'react-beautiful-dnd';
import MoveDataDiv from '../Detail/MoveDataDiv';
import Location from 'components/Canvas/BuildTab/Detail/Location';

const Days = styled.div`
  display: flex;
  flex: 1; //남은 영역 모두 채움
  justify-content: space-around;
`;

const Container = styled.div`
  margin: 8px;
  border-radius: 15px;
  border: 1px solid lightgrey;
  width: 270px;
  background: white;
`;

const InitForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${oc.teal[6]};
  height: 40px;
  width: 100%;
  padding: 8px;
`;

const EmptyBlock = styled.div`
  background-color: white;
  font-size: 10px;
  padding: 7px;
`;

const LocationsList = styled('div')`
  flex-grow: 1;
  min-height: 100px;
  transition: background-color ease 0.2s;
  background-color: ${(props) => (props.isDraggingOver ? 'green' : 'white')};
  ${(props) =>
    props.isDraggingOver &&
    css`
      background-color: ${oc.indigo[2]};
    `}
`;

const PlanDays = () => {
  const { userPlan } = useStore();
  const { travelDay } = userPlan.dayForm;

  return (
    <Days>
      {travelDay.map((day, index) => (
        // 각 day
        <Container key={index}>
          <DayHeader index={index} />
          {/* day 영역 */}
          <Droppable droppableId={String(index)}>
            {(provided, snapshot) => (
              <LocationsList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {/* day에 location 존재하지 않을 때 */}
                {day[0] === undefined && (
                  <InitForm>
                    <EmptyBlock>
                      블록 혹은 자체 생성한 블록을 넣어주세요.
                    </EmptyBlock>
                  </InitForm>
                )}
                {/* location map */}
                {day.map((loc, idx) => {
                  console.log(loc, idx);
                  // idx: 해당 loc index
                  return (
                    <div key={idx}>
                      <Location
                        key={idx}
                        location={loc}
                        id={loc.copyLocationId}
                        index={idx}
                        day={index} // ?
                      />
                      {day[idx + 1] !== undefined && (
                        <MoveDataDiv day={index} index={idx} />
                      )}
                    </div>
                  );
                })}
                {provided.placeholder}
              </LocationsList>
            )}
          </Droppable>
        </Container>
      ))}
    </Days>
  );
};

export default PlanDays;
