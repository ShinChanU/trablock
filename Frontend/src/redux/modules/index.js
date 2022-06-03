import { all } from '@redux-saga/core/effects';
import { combineReducers } from 'redux';
import loading from './loading';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import plan, { planSaga } from './plan';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  plan
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), planSaga()]);
}

export default rootReducer;
