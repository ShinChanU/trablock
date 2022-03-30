import oc from 'open-color';
import React from 'react';
import styled from 'styled-components';
import Time from 'lib/Icons/Time';

const Container = styled.div`
  /* position: fixed; */
  display: flex;
  justify-content: space-between;
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
  return (
    <Container>
      <DayNum>{day.id}일차</DayNum>
      <StartLeave>
        <div>출발시각/체류시간을 설정해주세요</div>
        <Time title="출발/체류시간" />
      </StartLeave>
    </Container>
  );
};

export default DayHeader;
