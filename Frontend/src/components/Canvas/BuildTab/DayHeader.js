import oc from 'open-color';
import React from 'react';
import styled from 'styled-components';
import Time from 'lib/Icons/Time';
import { useStore } from 'lib/store';

const Container = styled.div`
  /* position: fixed; */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 50px;
  background-color: ${oc.teal[6]};
  color: white;
  padding: 5px;
  font-size: 20px;
  border-radius: 7px 7px 0px 0px;
`;

const DayNum = styled.div``;

const StartLeave = styled.div`
  font-size: 10px;
  display: flex;
  justify-content: space-between;
  margin-right: 7px;
`;

const DayHeader = ({ day }) => {
  const { userPlan } = useStore();
  // const startT = userPlan.travelDays[day.id - 1].startTime[0];

  return (
    <Container>
      <DayNum>{day.days}일차</DayNum>
      {/* <StartLeave>
        {startT ? (
          <>출발시각 {startT}</>
        ) : (
        <div>출발지에서의 출발시각을 설정해주세요</div>
        )}
        <Time title="출발/체류시간" day={day} index={-1} /> 
      </StartLeave> */}
    </Container>
  );
};

export default DayHeader;
