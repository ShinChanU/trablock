const Router = require('@koa/router');
const posts = require('./posts');

const api = new Router(); // 새로운 router의 이름을 api

api.use('/posts', posts.routes());

// api.get('/test', ctx => {
//   ctx.body = 'test 성공';
// });

module.exports = api; // 모듈 내보내기