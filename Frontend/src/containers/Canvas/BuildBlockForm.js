import React, { useEffect } from 'react';
import { getPlan } from 'redux/modules/plan';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import DndMainArea from 'components/Canvas/BuildTab/DndMainArea';

const Section = styled.div`
  margin-top: 30px;
  background-color: white;
  border: 2px solid black;
  border-radius: 7px;
  /* height: 80%; */
`;

const Div = styled.div`
  /* height: 100%; */
`;

const BuildBlockForm = () => {
  const dispatch = useDispatch();
  const { plan, loadingPlan } = useSelector(({ plan, loading }) => ({
    plan: plan.plan,
    loadingPlan: loading['plan/GET_PLAN'],
  }));

  useEffect(() => {
    dispatch(getPlan(1)); // 1은 travelPlan의 id (임시로 1)
  }, [dispatch]);

  return (
    <Section>
      {loadingPlan && '로딩 중..'}
      {!loadingPlan && plan && (
        <Div>
          <h4>{plan.name}</h4>
          <DndMainArea data={plan} />
        </Div>
      )}
    </Section>
  );
};

export default BuildBlockForm;
