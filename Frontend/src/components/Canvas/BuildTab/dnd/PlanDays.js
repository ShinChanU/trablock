import React from 'react';
import styled, { css } from 'styled-components';
import { useStore } from 'lib/store';
import oc from 'open-color';
import Location from '../Location';
import DayHeader from '../DayHeader';
import { Droppable } from 'react-beautiful-dnd';
import MoveDataDiv from '../MoveDataDiv';

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
  const { travelDays } = userPlan;

  return (
    <Days>
      {travelDays.map((day, index) => (
        // 각 day
        <Container key={index}>
          <DayHeader day={day} />
          {/* day 영역 */}
          <Droppable
            droppableId={String(day.days)}
            // type="location"
          >
            {(provided, snapshot) => (
              <LocationsList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {/* day에 location 존재하지 않을 때 */}
                {day.locations[0] === undefined && (
                  <InitForm>
                    <EmptyBlock>
                      블록 혹은 자체 생성한 블록을 넣어주세요.
                    </EmptyBlock>
                  </InitForm>
                )}
                {/* location map */}
                {day.locations.map((loc, idx) => {
                  return (
                    <div key={idx}>
                      <Location
                        key={idx}
                        location={loc}
                        id={loc.copy_id}
                        index={idx}
                        day={day}
                      />
                      {day.locations[idx + 1] !== undefined && (
                        <MoveDataDiv
                        // moveData={moveData}
                        // 백엔트와
                        // 소통
                        // 이후
                        // 결정
                        // index={index}
                        />
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

/* {day.map((location, index) => {
          return (
            <>
              <div>asd</div> */

/* <div key={location.id} ref={coordRef}>
              <Location
              key={location.id}
              location={location}
              index={index}
              onClick={onClick}
              day={day}
            />
              moveData 관리 수정 필요 // 0317
              {locations[index + 1] !== undefined && (
              <MoveDataDiv
                moveData={moveData}
                백엔트와
                소통
                이후
                결정
                index={index}
              />
            )}
          </div> */

/* </>
          );
        })} */

// </LocationsList>
// ))}
// );

// 0317
// 로케이션 블록 좌표 찾아서 moveDataDiv로 넘겨줘서, css에 position 잡을 때 사용 예정
// useEffect(() => {
// const ele = document.querySelectorAll('.test');
// // const value = ele.getBoundingClientRect();
// for (let i = 0; i < ele.length; i++) {
//   console.log(ele[i].getBoundingClientRect());
// }
// console.log(coordRef);
// .map((e) => e.getBoundingClientRect())
// if (!coordRef.current) return;
// const coord = coordRef.current.getBoundingClientRect();
// console.log(coordRef.current, coord.top);
// }, [locations]);
