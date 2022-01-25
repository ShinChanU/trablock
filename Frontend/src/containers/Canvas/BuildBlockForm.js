import React, { useEffect } from 'react';
import { getPlan } from 'redux/modules/plan';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// import CanvasBlock from 'components/Canvas/BuildTab/CanvasBlock';
import SelectedLoc from 'components/Canvas/BuildTab/SelectedLoc';
import Days from 'components/Canvas/BuildTab/Days';
import 'components/Canvas/BuildTab/CanvasComponent.scss';
import palette from 'lib/styles/palette';

const MainArea = styled.div`
  /* border: 1px solid black; */
  height: 100%;
  display: flex;
  margin-top: 25px;
  background-color: ${palette.gray[3]}
`;

const Div = styled.div`
  height: 100%;
`;

const BuildBlockForm = () => {
  const dispatch = useDispatch();
  const { plan, loadingPlan } = useSelector(({ plan, loading }) => ({
    plan: plan.plan,
    loadingPlan: loading['plan/GET_PLAN']
  }))

  useEffect(() => {
    dispatch(getPlan(1)); // 1은 travelPlan의 id (임시로 1)
  }, [dispatch])

  return (
    <div className="BuildForm">
      <section className="Section">
        {loadingPlan && '로딩 중..'}
        {!loadingPlan && plan && (
          <Div>
            <h4>{plan.name}</h4>
            <MainArea>
              <SelectedLoc data={plan.selectedLocations} />
              <Days />
            </MainArea>
            {console.log(plan)}
          </Div>
        )}
      </section>
    </div>
  );
};

export default BuildBlockForm;

// 0110 현재 문제 : 라우팅할때는 데이터를 받아오지만 새로고침을 할때는 데이터를 받아오지못함
// 0111 해결 : loading redux가 완료된이후에 등장