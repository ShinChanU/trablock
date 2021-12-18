require('dotenv').config(); // dotenv는 환경변수를 가지고 있음. .env 파일에 있음
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
// const mongoose = require('mongoose');
const Client = require('mongodb').MongoClient; // mongoose 가 안됨.

const api = require('./api');

const { PORT, MONGO_URI } = process.env;

Client // { useNewUrlParser: true, useFindAndModify: false }
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(e => {
    console.log(e);
  })

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/api', api.routes());
router.get('/', (ctx, next) => {
  ctx.body = '홈';
});

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

// router.get('/about/:name?', (ctx, next) => {
//   const { name } = ctx.params; // name의 존재 유무에 따라 다른 결과
//   ctx.body = name ? `${name}의 소개` : '소개';
// });

// router.get('/posts', ctx => {
//   const { id } = ctx.query; // id의 존재 유무애 따라 다른 결과
//   ctx.body = id ? `포스트 #${id}` : '포스트 아이디가 없습니다.';
// })
// /about/:name? =>>> '?'는 뒤에 파라미터가 붙을수도 아닐수도
// :name같은 파라미터=> ctx.params, ?id=10같은 쿼리=>ctx.query
// 파라미터는 작업의 카테로리나 고유 ID, 특정데이터,
// 쿼리는 옵션에 관련되 정보


// router.get(a, b) =>>>> a는 라우트 경로, b는 미들웨어에 적용할 함수
// get, post, put, delete 사용 가능

// app 인스턴스에 router 적용
app
  .use(router.routes())
  .use(router.allowedMethods());

// app.use(async (ctx, next) => {
//   console.log(ctx.url);
//   console.log(1);
//   if (ctx.query.authorized !== '1') {
//     ctx.status = 401 // Unauthorized
//     return;
//   }
//   await next();
//   console.log('END');
// });
// // koa의 미들웨어 함수는 파라미터 두 개, (ctx, next)
// // ctx는 웹 요청과 응답에 관한 정보
// // next 현재 처리 중인 미들웨어의 다음 미들웨어 호출하는 함수


// app.use((ctx, next) => {
//   console.log(2);
//   next();
// });


// app.use(ctx => {
//   ctx.body = 'hello world';
// });

const port = PORT || 4000;
app.listen(port, () => {
  console.log(`Listen to port ${port}`);
});

/*
21/12/19
https://thebook.io/080203/ch21/03/02/01/

21/12/20
https://thebook.io/080203/ch22/04/
*/
