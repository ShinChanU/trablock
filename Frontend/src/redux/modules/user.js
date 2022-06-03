import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from 'lib/createRequestSaga';
import * as authAPI from 'lib/api/auth';

const TEMP_SET_USER = 'user/TEMP_SET_USER'; //새로고침 이후 임시 로그인 처리
// 회원 정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] =
  createRequestActionTypes('user/CHECK');
const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(
  TEMP_SET_USER,
  (userState) => userState,
);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CHECK, authAPI.onSilentRefresh);

function checkFailureSaga() {
  try {
    localStorage.removeItem('userState');
  } catch (e) {
    console.log('localStorage is not working');
  }
}

function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    localStorage.removeItem('userState');
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  userState: null, // user 로 적용이 안됨
  checkError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: userState }) => ({
      ...state,
      userState,
    }),
    [CHECK_SUCCESS]: (state, action) => {
      return {
        ...state,
        userState: 'tester', // 임시 닉네임, refresh토큰이 제거되면 failure로 가지 않을까
        checkError: null,
      };
    },
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      userState: null,
      checkError: error,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      userState: null,
    }),
  },
  initialState,
);
