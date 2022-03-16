import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DndMainArea from 'components/Canvas/BuildTab/DndMainArea';

const Section = styled.div`
  margin-top: 10px;
  /* background-color: white; */
  /* border: 2px solid black; */
  border-radius: 7px;
`;

const Div = styled.div``;

const BuildBlockForm = () => {
  const [userPlan, setUserPlan] = useState(null);
  const [globalLocations, setGlobalLocations] = useState(null);
  const [submitting, setSubmitting] = useState(true);

  const getData = useCallback(async () => {
    const userPlanResult = await axios.get(
      'http://localhost:4000/travelPlans/1',
    );
    setUserPlan(userPlanResult.data);
    const globalLocationsResult = await axios.get(
      'http://localhost:4000/locations',
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
    console.log('setUerPlan');
  };

  return (
    <Section>
      {(!userPlan || !globalLocations) && '로딩 중..'}
      {userPlan && globalLocations && (
        <Div>
          {/* <h4>{userPlan.name}</h4> */}
          <DndMainArea
            setUserPlanData={setUserPlanData}
            userPlan={userPlan}
            globalLocations={globalLocations}
          />
        </Div>
      )}
    </Section>
  );
};

export default BuildBlockForm;

// 0303 plan redux 삭제, useState사용으로 변경
// container에서 데이터관리..
