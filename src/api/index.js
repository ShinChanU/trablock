import Router from '@koa/router';
import posts from './posts/index.js';
import auth from './auth/index.js'

const api = new Router(); // 새로운 router의 이름을 api

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());

export default api; // 모듈 내보내기