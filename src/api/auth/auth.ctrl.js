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
      .max(20)
      .required(),
    password: Joi.string().required(),
  });
  const validation = schema.validate(ctx.request.body);
  if (validation.error) {
    ctx.status = 400;
    ctx.body = validation.error;
    return;
  };

  const { username, password } = ctx.request.body;
  try {
    // username이 이미 존재하는지 확인
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409 // Conflict
      return;
    }
    const user = new User({
      username,
    });
    await user.setPassword(password);
    await user.save(); // db 저장

    ctx.body = user.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
}

export const login = async ctx => {
  // 로그인
};

export const check = async ctx => {
  // 로그인 상태 확인
};

export const logout = async ctx => {
  // 로그아웃
};