import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DndMainArea from 'components/Canvas/BuildTab/DndMainArea';
import CreateLoc from 'lib/Icons/CreateLoc';
import palette from 'lib/styles/palette';

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  background-color: ${palette.gray[3]};
  height: 70vh;
  overflow: auto;
  border-radius: 7px;
`;

const Buttons = styled.div`
  width: 100px;
`;

export let travelPlan = {};

const BuildBlockForm = () => {
  const [userPlan, setUserPlan] = useState(null);
  const [globalLocations, setGlobalLocations] = useState(null);
  const [submitting, setSubmitting] = useState(true);

  const getData = useCallback(async () => {
    const userPlanResult = await axios.get(
      'http://localhost:8080/travelPlans/1',
    );
    setUserPlan(userPlanResult.data);
    const globalLocationsResult = await axios.get(
      'http://localhost:8080/locations',
    );
    setGlobalLocations(globalLocationsResult.data);
  }, []);

  useEffect(() => {
    if (submitting) {
      getData().then(() => setSubmitting(false));
    }
  }, [submitting, getData]);

  const setUserPlanData = (x) => {
    setUserPlan(x);
    travelPlan = userPlan;
    console.log(userPlan);
  };

  // travelPlan = userPlan;

  return (
    <>
      {(!userPlan || !globalLocations) && '로딩 중..'}
      {userPlan && globalLocations && (
        <Div>
          <DndMainArea
            setUserPlanData={setUserPlanData}
            userPlan={userPlan}
            globalLocations={globalLocations}
          />
          <Buttons>
            <CreateLoc size="30" />
          </Buttons>
        </Div>
      )}
    </>
  );
};

export default BuildBlockForm;

// 0303 plan redux 삭제, useState사용으로 변경
// container에서 데이터관리..
