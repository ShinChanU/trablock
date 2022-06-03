import React, { useEffect, useState } from 'react';
import { useStore } from 'lib/store/planStore';
import ReactTooltip from 'react-tooltip';
import { addDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const TitleSpan = styled.span`
  font-size: 1.2em;
`;
const TooltipButton = styled.button`
  margin-left: 10px;
  border: 1px solid gray;
  border-radius: 100%;
  cursor: pointer;
  font-size: 1.2em;
  :hover {
    background: lightgray;
  }
`;
const DateSettingDiv = styled.div`
  margin-top: 10px;
  margin-left: 30px;
  height: 100px;
  width: 95%;
`;
const Datediv = styled.div`
  font-weight: bold;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  width: 70%;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const DateSetting = () => {
  const { userPlan, setDepart, setPeriods } = useStore();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  //const [minDate, setMinDate] = useState(new Date());

  useEffect(() => {
    if (!isNaN(Date.parse(userPlan.depart))) {
      //depart가 있으면
      setStartDate(new Date(userPlan.depart));
      //setMinDate(new Date(userPlan.depart));
      if (userPlan.periods === 1) {
        setEndDate(new Date(userPlan.depart));
      } else {
        setEndDate(addDays(new Date(userPlan.depart), userPlan.periods - 1));
        setPeriods(userPlan.periods);
      }
    }
  }, [userPlan.depart, userPlan.periods, setPeriods]);

  const onChangeStartDate = (date) => {
    setStartDate(date);
    setDepart(date);
    let diff = 0;
    let pPeriods = 1;
    if (endDate.getTime() > date.getTime()) {
      diff = endDate.getTime() - date.getTime();
      pPeriods = Math.ceil(diff / 1000 / 60 / 60 / 24) + 1;
    }
    /*if (endDate.getTime() < date.getTime()) {
      setEndDate(date);
    }
    console.log(endDate);
    const diff = endDate.getTime() - date.getTime();
    const pPeriods = Math.ceil(diff / 1000 / 60 / 60 / 24) + 1;*/
    setPeriods(pPeriods);
  };

  const onChangeEndDate = (date) => {
    setEndDate(date);
    const diff = date.getTime() - startDate.getTime();
    const pPeriods = Math.ceil(diff / 1000 / 60 / 60 / 24) + 1;
    setPeriods(pPeriods);
  };

  return (
    <DateSettingDiv>
      <TitleSpan>1. 여행 일자 설정 </TitleSpan>
      <TooltipButton data-tip data-for="datesetting">
        ?
      </TooltipButton>
      <ReactTooltip id="datesetting" place="right" type="info" effect="solid">
        <div>
          출발 블록을 생성하기 위해 입력해주세요.
          <br />
          기간은 최대 30일 입니다.
        </div>
      </ReactTooltip>
      <Datediv>
        <span>출발일 </span>
        <span>
          <DatePicker
            dateFormat="yyyy/MM/dd"
            showPopperArrow={false}
            selected={startDate}
            onChange={(date) => onChangeStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            //minDate={minDate}
          />
        </span>
        <span>도착일 </span>
        <span>
          <DatePicker
            dateFormat="yyyy/MM/dd"
            showPopperArrow={false}
            selected={endDate}
            onChange={(date) => onChangeEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={addDays(startDate, 30)}
          />
        </span>
        <div>
          {userPlan.periods - 1}박 {userPlan.periods}일
        </div>
      </Datediv>
    </DateSettingDiv>
  );
};
