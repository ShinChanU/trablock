import axios from 'axios';
import client from './client';
import { setCookie, getCookie } from 'lib/cookies';

// 0416 현재
// ac-to, re-to 헤더로 옴
// ac-to: local변수 (20초), re-to: 쿠키저장(1분)
// login 시 api/user/test 시행,
// 새로고침시 쿠키 확인후 re-to 으로 ac-to 갱신 => 로그인 시도

export const onSilentRefresh = (accessToken) => {
  // re-to 쿠키로 전달
  const refreshT = getCookie('refreshToken');
  axios
    .get('/api/user/test', {
      headers: {
        accessToken: accessToken,
        refreshToken: refreshT,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        if (res.headers.accessToken) {
          // 응답헤더에 ac-to 있으면 토큰 교체
          onLoginSuccess(res);
        } else {
          // 응답헤더에 ac-to 없으면 완전 통과
          console.log('로그인 성공'); // user 설정
        }
      } else {
        console.log('재 로그인 필요'); // logout
      }
    })
    .catch((e) => console.log(e));
};

const onLoginSuccess = (res) => {
  console.log(res);
  const accessToken = res.headers.accesstoken;
  axios.defaults.headers.common['accessToken'] = `${accessToken}`;
  setTimeout(() => onSilentRefresh(accessToken), 10000);
};

// 로그인
export const login = ({ userName, password }) => {
  return client
    .post('/api/login', { userName, password }, { withCreadentials: true })
    .then((res) => {
      setCookie('refreshToken', res.headers.refreshtoken);
      onLoginSuccess(res);
      return res;
    });
};

// 회원가입
export const signup = ({
  userName,
  password,
  realName,
  nickName,
  birthday,
  phoneNum,
  gender,
  email,
}) =>
  client.post('/api/signup', {
    userName,
    password,
    realName,
    nickName,
    birthday,
    phoneNum,
    gender,
    email,
  });

// // 로그인 상태 확인
export const check = () => client.get('/api/auth/check');
// export const check = () => {
//   return {
//     data: true,
//   };
// };

// 로그아웃
export const logout = () => client.post('/api/logout');
// export const logout = (ctx) => {
//   ctx.status = 204;
// };
