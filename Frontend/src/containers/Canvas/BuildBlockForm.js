import React, { useEffect } from 'react';
import { getPlan } from 'redux/modules/plan';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import DndMainArea from 'components/Canvas/BuildTab/DndMainArea';

const Section = styled.div`
  background-color: white;
  border: 1px solid black;
`;

const Div = styled.div`
  height: 100%;
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
          <DndMainArea plan={plan} />
        </Div>
      )}
    </Section>
  );
};

export default BuildBlockForm;
