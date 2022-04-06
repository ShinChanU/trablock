import client from './client';

// 로그인
export const login = ({ userName, password }) =>
  client.post('/api/auth/login', { userName, password });

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
  client.post('/api/auth/signup', {
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
