import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from 'lib/createRequestSaga';
import * as planAPI from 'lib/api/plan';

const [GET_PLAN, GET_PLAN_SUCCESS, GET_PLAN_FAILURE] =
  createRequestActionTypes('plan/GET_PLAN');

export const getPlan = createAction(GET_PLAN);

export const getPlansSaga = createRequestSaga(GET_PLAN, planAPI.getPlan);
export function* planSaga() {
  yield takeLatest(GET_PLAN, getPlansSaga);
}

// 초기값
const initialState = {
  plan: null,
  planError: null,
};

const plan = handleActions(
  {
    // plan 가져오기 성공
    [GET_PLAN_SUCCESS]: (state, { payload: plan }) => ({
      ...state,
      plan,
      planError: null,
    }),
    //  plan 가져오기 실패
    [GET_PLAN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      planError: error,
    }),
  },
  initialState,
);

export default plan;

// 사용X
