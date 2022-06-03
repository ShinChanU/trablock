import oc from 'open-color';
import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useStore } from 'lib/store/planStore';

const Container = styled.div`
  /* position: fixed; */
  width: 270px;
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

const DayHeader = ({ index }) => {
  const { userPlan } = useStore();
  const [dates, setDates] = useState('');

  const addDays = useCallback((date, days) => {
    // day 추가
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    const pD =
      result.getFullYear() +
      '/' +
      (result.getMonth() + 1).toString().padStart(2, '0') +
      '/' +
      result.getDate().toString().padStart(2, '0');
    setDates(pD);
  }, []);

  useEffect(() => {
    let dayCnt = index;
    addDays(userPlan.depart, dayCnt);
  }, [addDays, index, userPlan.depart]);

  return (
    <Container>
      <DayNum>
        {index + 1}일차 ({dates})
      </DayNum>
    </Container>
  );
};

export default DayHeader;
