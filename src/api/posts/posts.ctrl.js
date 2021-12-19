import Post from '../../models/post.js';
import mongoose from 'mongoose'; // 유효성 검사를 위해
import Joi from 'joi'; // request.body를 검사하기 위한 라이브러리

const { ObjectId } = mongoose.Types;

export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // bad req
    return;
  }
  return next(); // 유효성 검사 통과시 다음 미들웨어 실행
};

/*
POST /api/posts
{
  title: '제목',
  body: '내용',
  tags: ['태그1', '태그2']
}
*/
export const write = async ctx => {
  // 다음 필드를 가지고 있는지 검증
  const schema = Joi.object({
    title: Joi.string().required(), // required는 필수항목
    body: Joi.string().required(),
    tags: Joi.array()
      .items(Joi.string())
      .required()  // 문자로 이루어진 배열인지
  });

  // 검증 실패시 에러
  const validation = schema.validate(ctx.request.body);
  if (validation.error) {
    ctx.status = 400 // bad req
    ctx.body = validation.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags
  });
  try {
    await post.save(); // db에 저장, promise 반환
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/posts
*/
export const list = async ctx => {
  // query는 문자열, 숫자로 변환, 값이 없다면 1
  const page = parseInt(ctx.query.page || '1', 10); // 10진법

  // page없을 때 err
  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const posts = await Post.find()
      .sort({ _id: -1 }) //sort({_id: -1})로 설정시 역순으로 posts 출력
      .limit(10) // 최근 작성 10개
      .skip((page - 1) * 10) // skip으로 2페이지부터 정상적으로 10개씩 불러올 수 있음
      .exec(); // 내 exec() 실제 db에 요청가능
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/posts/:id
*/
export const read = async ctx => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// DELETE /api/posts/:id
export const remove = async ctx => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  PATCH /api/posts/:id
  {
    title: '수정',
    body: '수정 내용',
    tags: ['수정', '태그']
  }
*/
export const update = async ctx => {
  const { id } = ctx.params;
  const schema = Joi.object({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string())
  });

  const validation = schema.validate(ctx.request.body);
  if (validation.error) {
    ctx.status = 400 // bad req
    ctx.body = validation.error;
    return;
  }

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // 업데이트된 데이터를 반환, false는 업데이트되기 전
    }).exec(); // findByIdAndUpdate(id, 업데이트 내용, 업데이트 옵션)
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
ctx.body: promise 객체를 저장
ctx.body.request: api 요청시 작성하는 json(title, body, tags)
ctx.params: url 파라미터(id)
*/

// let postId = 1; // id 초기값

// // posts 배열 초기 데이터
// const posts = [
//   {
//     id: 1,
//     title: '제목',
//     body: '내용',
//   },
// ];

// /* 포스트 작성
// POST /api/posts
// {title, body}
// */
// export const write = ctx => {
//   // REST API의 Request Body는 ctx.request.body에서 조회가능
//   const { title, body } = ctx.request.body;
//   postId += 1;
//   const post = {
//     id: postId,
//     title,
//     body
//   };
//   posts.push(post);
//   ctx.body = post;
// };

// /* 포스트 목록 조회
// GET /api/posts
// */
// export const list = ctx => {
//   ctx.body = posts;
// };

// /* 특정 포스트 조회
// GET /api/posts/:id
// */
// export const read = ctx => {
//   const { id } = ctx.params;
//   // 주어진 id 값으로 포스트를 찾습니다.
//   // 파라미터로 받아 온 값은 문자열 형식이므로 파라미터를 숫자로 변환하거나
//   // 비교할 p.id 값을 문자열로 변경해야 합니다.
//   const post = posts.find(p => p.id.toString() === id);
//   // 포스트가 없으면 오류를 반환합니다.
//   if (!post) {
//     ctx.status = 404;
//     ctx.body = {
//       message: '포스트가 존재하지 않습니다.',
//     };
//     return;
//   }
//   ctx.body = post;
// };

// /* 특정 포스트 제거
// DELETE /api/posts/:id
// */
// export const remove = ctx => {
//   const { id } = ctx.params;
//   // 해당 id를 가진 post가 몇 번째인지 확인합니다.
//   const index = posts.findIndex(p => p.id.toString() === id);
//   // 포스트가 없으면 오류를 반환합니다.
//   if (index === -1) {
//     ctx.status = 404;
//     ctx.body = {
//       message: '포스트가 존재하지 않습니다.',
//     };
//     return;
//   }
//   // index번째 아이템을 제거합니다.
//   posts.splice(index, 1);
//   ctx.status = 204; // No Content
// };


// /* 포스트 수정(교체)
// PUT /api/posts/:id
// { title, body }
// */
// export const replace = ctx => {
//   // PUT 메서드는 전체 포스트 정보를 입력하여 데이터를 통째로 교체할 때 사용합니다.
//   const { id } = ctx.params;
//   // 해당 id를 가진 post가 몇 번째인지 확인합니다.
//   const index = posts.findIndex(p => p.id.toString() === id);
//   // 포스트가 없으면 오류를 반환합니다.
//   if (index === -1) {
//     ctx.status = 404;
//     ctx.body = {
//       message: '포스트가 존재하지 않습니다.',
//     };
//     return;
//   }
//   // 전체 객체를 덮어 씌웁니다.
//   // 따라서 id를 제외한 기존 정보를 날리고, 객체를 새로 만듭니다.
//   posts[index] = {
//     id,
//     ...ctx.request.body,
//   };
//   ctx.body = posts[index];
// };



// /* 포스트 수정(특정 필드 변경)
// PATCH /api/posts/:id
// { title, body }
// */
// export const update = ctx => {
//   // PATCH 메서드는 주어진 필드만 교체합니다.
//   const { id } = ctx.params;
//   // 해당 id를 가진 post가 몇 번째인지 확인합니다.
//   const index = posts.findIndex(p => p.id.toString() === id);
//   // 포스트가 없으면 오류를 반환합니다.
//   if (index === -1) {
//     ctx.status = 404;
//     ctx.body = {
//       message: '포스트가 존재하지 않습니다.',
//     };
//     return;
//   }
//   // 기존 값에 정보를 덮어 씌웁니다.
//   posts[index] = {
//     ...posts[index],
//     ...ctx.request.body,
//   };
//   ctx.body = posts[index];
// };