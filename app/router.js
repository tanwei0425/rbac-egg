/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-01 13:58:10
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-22 16:58:09
 * @FilePath: /egg/admin/app/router.js
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  router.post('/admin/v1/auth/signIn', controller.auth.signIn);
  router.get('/admin/v1/auth/signOut', controller.auth.signOut);
  router.get('/admin/v1/auth/user', controller.auth.user);
  router.get('/admin/v1/auth/menu', controller.auth.menu);


  router.get('/admin/v1/captcha', controller.common.captcha);
  router.put('/admin/v1/thmemUpdate', controller.common.thmemUpdate);
  router.put('/admin/v1/updatePassword', controller.common.updatePassword);
  router.get('/admin/v1/allMenuElementApi', controller.common.allMenuElementApi);

  router.get('/admin/v1/allUser', controller.user.all);
  router.get('/admin/v1/reloadPwdUser/:id', controller.user.reloadPwd);
  router.get('/admin/v1/exportUser', controller.user.exportUser);
  router.resources('/admin/v1/user', controller.user);

  router.get('/admin/v1/role/associateUser/:id', controller.role.getAssociateUser);
  router.put('/admin/v1/role/associateUser/:id', controller.role.putAssociateUser);
  router.get('/admin/v1/role/auth/:id', controller.role.getRoleAuthDetail);
  router.put('/admin/v1/role/auth/:id', controller.role.setRoleAuth);
  router.get('/admin/v1/allRole', controller.role.all);
  router.resources('/admin/v1/role', controller.role);

  router.resources('/admin/v1/menu', controller.menu);

  router.resources('/admin/v1/element', controller.element);

  router.resources('/admin/v1/api', controller.api);

  router.get('/admin/v1/allDictionary', controller.dictionary.all);
  router.resources('/admin/v1/dictionary', controller.dictionary);

  // 随记类型
  router.resources('/admin/v1/notes/classification', controller.notes.classification);
  router.get('/admin/v1/allNotesClassification', controller.notes.classification.all);

  // 随记文章
  router.resources('/admin/v1/notes/article', controller.notes.article);

  // 随记文章访问记录
  router.get('/admin/v1/notes/articleRecord', controller.notes.articleRecord.index);

  // 门户开始（不验证权限）
  router.resources('/web/v1/baby', controller.baby);
  router.get('/web/v1/allNotesClassification', controller.notes.classification.all);
  router.get('/web/v1/notes/article', controller.notes.article.noAuthArticleList);
  router.get('/web/v1/notes/article/:id', controller.notes.article.noAuthArticleShow);
  // 门户结束

  // socket.io 路由(测试)
  io.of('/').route('demo', io.controller.demo.index);
  io.of('/').route('demo1', io.controller.demo1.index);
  // socket.io说明：
  // io.of('/') 对应前端 ws://127.0.0.1:7002/
  // io.of('/xxx') 对应前端 ws://127.0.0.1:7002/xxx ,对应着config中 namespace 'xxx':{connectionMiddleware:[],packetMiddleware:[]}
  // io.of('/').route('x',io.controller.xx) 对应前端 socket.emit('x', {}); 第二个参数xx对应着后端处理的控制器和方法
  // await socket.emit('xxx', {}); 后端发送对应前端 socket.on('xxx', msg => {});
};
