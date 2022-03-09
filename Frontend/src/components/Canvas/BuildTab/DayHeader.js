import oc from 'open-color';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  height: 50px;
  background-color: ${oc.indigo[6]};
  color: white;
  padding: 5px;
  font-size: 20px;
`;

const DayNum = styled.div``;

const StartLeave = styled.div`
  font-size: 10px;
  display: flex;
  justify-content: space-between;
  margin-right: 7px;
`;

const Icon = styled.div`
  margin-left: 7px;
`;

const DayHeader = ({ day }) => {
  return (
    <Container>
      <DayNum>{day.order}</DayNum>
      <StartLeave>
        <div>출발시각/체류시간을 설정해주세요</div>
        <Icon>Icon</Icon>
      </StartLeave>
    </Container>
  );
};

export default DayHeader;
