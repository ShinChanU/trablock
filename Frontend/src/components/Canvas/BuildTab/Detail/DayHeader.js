import oc from 'open-color';
import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
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

const DayHeader = ({ index }) => {
  const { userPlan, setDepart } = useStore();
  const { planForm } = userPlan;
  const [dates, setDates] = useState('');

  const addDays = useCallback(
    (date, days) => {
      // day 추가
      let result = new Date(date);
      result.setDate(result.getDate() + days);
      setDates(setDepart(result));
    },
    [setDepart],
  );

  useEffect(() => {
    let dayCnt = index;
    addDays(planForm.depart, dayCnt);
  }, [addDays, index, planForm.depart]);

  return (
    <Container>
      <DayNum>
        {index + 1}일차 ({dates})
      </DayNum>
    </Container>
  );
};

export default DayHeader;
