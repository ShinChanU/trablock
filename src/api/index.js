import Router from '@koa/router';
import posts from './posts/index.js';

const api = new Router(); // 새로운 router의 이름을 api

api.use('/posts', posts.routes());

// api.get('/test', ctx => {
//   ctx.body = 'test 성공';
// });

export default api; // 모듈 내보내기