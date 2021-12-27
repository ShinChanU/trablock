import Joi from 'joi';
import User from '../../models/user.js';

/*
  POST /api/auth/signup
  {}
    username: 'tlscksdn963',
    password: 'cksdn1'
  }
*/

export const signup = async ctx => { // 회원가입
  // Request Body 검증하기
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(20),
    password: Joi.string(),
    name: Joi.string(),
    nickname: Joi.string(),
    birthday: Joi.string(),
    tel: Joi.string(),
    gender: Joi.string(),
    email: Joi.string()
  });
  const validation = schema.validate(ctx.request.body);
  if (validation.error) {
    ctx.status = 400;
    ctx.body = validation.error;
    return;
  };

  const { username, password, name, nickname, birthday, tel, gender, email } = ctx.request.body;

  try {
    // username이 이미 존재하는지 확인
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409 // Conflict
      return;
    }
    const user = new User({
      username,
      name,
      nickname,
      birthday,
      gender,
      email
    });
    await user.setPassword(password);
    await user.save(); // db 저장

    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
}

/*
  POST /api/auth/login
  {
    username: 'velopert',
    password: 'mypass123'
  }
*/
export const login = async ctx => {
  const { username, password } = ctx.request.body;

  // username, password가 없으면 에러 처리
  if (!username || !password) {
    ctx.status = 401; // Unauthorized
    return;
  }

  try {
    const user = await User.findByUsername(username);
    // 계정이 존재하지 않으면 에러 처리
    if (!user) {
      ctx.status = 401;
      return;
    }
    const valid = await user.checkPassword(password);
    // 잘못된 비밀번호
    if (!valid) {
      ctx.status = 401;
      return;
    }
    ctx.body = user.serialize();
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const check = async ctx => {
  // 로그인 상태 확인
  const { user } = ctx.state;
  if (!user) {
    // 로그인 중 아님
    ctx.status = 401; // Unauthorized
    return;
  }
  ctx.body = user;
};

export const logout = async ctx => {
  // 로그아웃
  ctx.cookies.set('access_token');
  ctx.status = 204; // No Content
};