import client from './client';

// 로그인
export const login = ({ userId, password }) =>
  client.post('/login_proc', { userId, password });

// 회원가입
export const signup = ({ userId, password, passwordCheck, username, nickname, birthday, phoneNum, gender, email }) =>
  client.post('/api/signup', { userId, password, passwordCheck, username, nickname, birthday, phoneNum, gender, email });

// // 로그인 상태 확인
export const check = () => client.get('/api/auth/check');

// 로그아웃
export const logout = () => client.post('/api/logout');