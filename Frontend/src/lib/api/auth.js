import axios from 'axios';
import client from './client';
import { removeCookie } from 'lib/cookies';

// refreshToken으로 accessToken 재발급!
export const onSilentRefresh = (token) =>
  client
    .get('/api/user/test', {
      headers: {
        accessToken: token,
      },
    })
    .then((res) => {
      console.log(res);
      return res;
      // 반환값에 닉네임이 오면 redux로 설정 가능
    })
    .then(onLoginSuccess)
    .catch((e) => {
      console.log(e);
    });

//음.. access를 연장 시켜야할까..? 필요시에만 refresh에 의해 요청이 들어가면 되지않을까
// 0517
const onLoginSuccess = (res) => {
  const { accesstoken } = res.headers;
  axios.defaults.headers.common['accessToken'] = accesstoken;
  setTimeout(() => onSilentRefresh(accesstoken), 30000);
};

// 로그인
export const login = ({ userName, password }) => {
  return client.post('/api/login', { userName, password }).then((res) => {
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

// 로그아웃
// export const logout = () => client.post('/api/logout');
export const logout = () => {
  removeCookie('refreshToken');
  // 백엔드 logout 요청후 refreshToken 제거 필요
  // 0517
};
