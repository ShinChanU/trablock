import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from 'lib/createRequestSaga';
import * as authAPI from 'lib/api/auth';

// 액션 생성
const CHANGE_FIELD = 'auth/CHANGE_FIELD'; // input 값
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'; // form 초기화

// 액션 함수 생성
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] =
  createRequestActionTypes('auth/SIGNUP');

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes('auth/LOGIN');

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // login, signup
    key, // userName, password, name ..
    value,
  }),
);

// createAction(타입, 현재 상태)
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form); // signup, login
// export const initializeForm = (form) => ({type: INITIALIZE_FORM, form})

export const signup = createAction(
  SIGNUP,
  ({
    userName,
    password,
    realName,
    nickName,
    birthday,
    phoneNum,
    gender,
    email,
  }) => ({
    userName,
    password,
    realName,
    nickName,
    birthday,
    phoneNum,
    gender,
    email,
  }),
);

export const login = createAction(LOGIN, ({ userName, password }) => ({
  userName,
  password,
}));
// export const login = ({ type: LOGIN });

// 사가 생성
// yield 비동기 통신
const signupSaga = createRequestSaga(SIGNUP, authAPI.signup);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
  yield takeLatest(SIGNUP, signupSaga);
  yield takeLatest(LOGIN, loginSaga);
}

// 초기값
const initialState = {
  // 불변성 유지하면서 객체 수정
  signup: {
    userName: '',
    password: '',
    passwordCheck: '',
    realName: '',
    nickName: '',
    birthday: '',
    phoneNum: '',
    gender: '',
    email: '',
  },
  login: {
    userName: '',
    password: '',
  },
  auth: null,
  authError: null,
};

// function auth(state = initialState, action) {
//   switch(action.type) {
//     case LOGIN:
//       return {
//         ...state
//         ..
//       }
//   }
// }

// const auth = (state = initState, action) => {
//   switch (action.type) {
//     case CHANGE_USER:
//       return { ...state, user: action.user };
//   }
// };

// import { handleActions } from 'redux-actions';
// const reducer = handleActions({
//   [CHANGE_USER]: (state, action) => ({ ...state, user: action.user }),
// });

const auth = handleActions(
  {
    [CHANGE_FIELD]: (
      state,
      { payload: { form, key, value } }, // action 대신 구조분해, action.payload.form, key.. 호출
    ) =>
      produce(state, (draft) => {
        draft[form][key] = value; // ex. state.signup.userName
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null, // 폼 전환 시 외원 인증 에러 초기화
    }),
    // 회원가입 성공
    [SIGNUP_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 회원가입 실패
    [SIGNUP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
);

export default auth;
