import { getPlan } from 'redux/modules/plan';
import React, { useEffect } from 'react';
import CanvasBlock from 'components/Canvas/CanvasBlock';
import { useDispatch, useSelector } from 'react-redux';

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
    <div>
      <section>
        <h1>api test</h1>
        {loadingPlan && '로딩 중..'}
        {!loadingPlan && plan && (
          <>
            {plan.name}
            <CanvasBlock data={plan.selectedLocations} />
            {console.log(plan)}
          </>
        )}
      </section>
    </div>
  );
};

export default BuildBlockForm;

// 0110 현재 문제 : 라우팅할때는 데이터를 받아오지만 새로고침을 할때는 데이터를 받아오지못함
// 0111 해결 : loading redux가 완료된이후에 등장