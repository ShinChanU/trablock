import Router from '@koa/router';
import * as authCtrl from './auth.ctrl.js';

const auth = new Router();

auth.post('/signup', authCtrl.signup);
auth.post('/login', authCtrl.login);
auth.post('/check', authCtrl.check);
auth.post('/logout', authCtrl.logout);

export default auth;