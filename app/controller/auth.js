/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-01 15:44:23
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-21 18:16:40
 * @FilePath: /egg/admin/app/controller/login.js
 */
'use strict';
const Controller = require('egg').Controller;
class AuthController extends Controller {
  // 登录
  async signIn() {
    const { ctx } = this;
    const { app, service, helper, request } = ctx;
    // 组装参数
    const { uuid, code, ...rest } = request.body;
    const twCaptcha = await helper.getRedis('captcha:status');
    if (!twCaptcha[uuid]) {
      helper.render(905);
      return;
    }
    const { code: redisUuid } = twCaptcha[uuid];
    delete twCaptcha[uuid];
    await helper.setRedis('captcha:status', twCaptcha);
    if (code !== redisUuid) {
      helper.render(905);
      return;
    }
    const userInfo = await service.user.show({ username: rest.username, is_delete: 0 });
    if (!userInfo) {
      helper.render(910);
      return;
    }
    if (userInfo.status === '0') {
      helper.render(914);
      return;
    }
    console.log(rest.password, 'rest.password');
    const pwdCrypto = helper.addSaltPassword(rest.password);
    console.log(pwdCrypto, 'pwdCrypto');
    console.log(userInfo.password, 'userInfo.password');
    if (userInfo.password !== pwdCrypto) {
      helper.render(906);
      return;
    }

    // 设置token
    const token = await helper.loginToken({ id: userInfo.id, username: userInfo.username }, app.config.redisConfig.expireTime);
    ctx.set('authorization', token);

    // 自定义日志(登录日志) 异步不阻塞
    service.common.index.customLogger({
      name: 'loginLogger',
      dataKey: 't-login',
      data: {
        username: userInfo.username,
        status: token ? '成功' : '失败',
      },
    });
    helper.render(200);
  }

  // 退出登录
  async signOut() {
    const { ctx } = this;
    const res = await ctx.service.common.index.loginOut();
    ctx.helper.render(res ? 200 : 0);
  }

  // 获取用户信息
  async user() {
    const { ctx } = this;
    const userInfo = await ctx.service.user.show({ id: ctx.locals.auth.id });
    if (!userInfo) {
      ctx.helper.render(912);
      return;
    }
    const res = {
      id: userInfo.id,
      username: userInfo.username,
      name: userInfo.name,
      phone: userInfo.phone,
      org_id: userInfo.org_id,
      is_admin: userInfo.is_super,
    };
    // 查询机构
    if (userInfo.org_id) {
      const orgRes = await ctx.service.org.show({ id: userInfo.org_id, status: 1 });
      if (!orgRes) {
        ctx.helper.render(912);
        return;
      }
      res.org_name = orgRes.name;
    }

    // 查询用户下所有角色信息
    const where = {
      user_id: userInfo.id,
    };
    const columns = ['role_id'];
    const userRoleRes = await ctx.service.userRole.index(where, columns);
    if (userRoleRes && userRoleRes.length > 0) {
      const roleIdArr = userRoleRes && userRoleRes.map(val => val.role_id);
      // 查询角色
      const roleWhere = {
        status: '1',
        is_delete: 0,
        id: [...roleIdArr],
      };// WHERE 条件
      const roleColumns = ['id', 'name'];
      const roleRes = await ctx.service.role.index(roleWhere, roleColumns);
      res.roles = roleRes;
    }

    // 查询主题
    const skinRes = await ctx.service.systemTheme.show({ user_id: ctx.locals.auth.id });

    if (skinRes && skinRes.content) {
      res.skin = skinRes.content;
    }

    // 查询按钮权限(超管获取所有按钮权限)
    const elementColumns = ['code'];
    const elementWhere = {
      status: '1',
      is_delete: 0,
    };
    if (userInfo.is_super !== 1) {
      const activePermission = await ctx.service.common.index.userIdSelectAllPermission(userInfo.id, 'element');
      elementWhere.permission_id = activePermission;
    }
    const elementsRes = await ctx.service.element.index(elementColumns, elementWhere);
    const elements = elementsRes.map(val => val.code);
    res.elements = elements;


    // 获取接口权限(超管获取所有接口权限)
    const apiColumns = ['path', 'method'];
    const apiWhere = {
      status: '1',
      is_delete: 0,
    };
    if (userInfo.is_super !== 1) {
      const activePermission = await ctx.service.common.index.userIdSelectAllPermission(userInfo.id, 'api');
      apiWhere.permission_id = activePermission;
    }
    const apisRes = await ctx.service.api.index(apiColumns, apiWhere);
    const RedisKey = `user:${userInfo.id}`;
    const redisInfo = await ctx.helper.getRedis(RedisKey);
    redisInfo.apis = apisRes;
    const ttlKeyTime = await ctx.helper.ttlRedis(RedisKey);
    await ctx.helper.setRedis(RedisKey, redisInfo, ttlKeyTime);

    ctx.helper.render(200, res);
  }

  //  获取用户菜单信息
  async menu() {
    const { ctx } = this;
    const userInfo = await ctx.service.user.show({ id: ctx.locals.auth.id });
    if (!userInfo) {
      ctx.helper.render(912);
      return;
    }
    // 超管获取所有在用菜单
    if (userInfo.is_super === 1) {
      const columns = ['id', 'pid', 'name', 'path', 'cmp_path', 'icon', 'is_router', 'is_show', 'sort'];
      const where = {
        status: '1',
        is_delete: 0,
      };
      const res = await ctx.service.menu.index(columns, where);
      ctx.helper.render(200, res);
    } else {
      //  通过id查询所属角色下某一类型的权限集合（在用）
      const activePermission = await ctx.service.common.index.userIdSelectAllPermission(userInfo.id, 'menu');
      // 获取当前角色下的菜单
      const columns = ['id', 'pid', 'name', 'path', 'cmp_path', 'icon', 'is_router', 'is_show', 'sort'];
      const where = {
        status: '1',
        is_delete: 0,
      };
      const res = await ctx.service.menu.index(columns, {
        ...where,
        permission_id: activePermission,
      });

      // 获取全部在用菜单
      const allMenuRes = await ctx.service.menu.index(columns, where);

      const seekNowMenuFisrt = (list, newArr = []) => {
        list.forEach(item => {
          const { pid } = item;
          const isRepeat = newArr.findIndex(val => val.id === item.id);
          if (pid) {
            // 去重复
            if (isRepeat === -1) newArr.push(item);

            const nowFisrt = allMenuRes.filter(val => val.id === pid);
            return seekNowMenuFisrt(nowFisrt, newArr);
          }
          // 去重复
          if (isRepeat === -1) newArr.push(item);
        });
        return newArr;
      };
      // 递归查找父节点（栏目）
      const allMenu = seekNowMenuFisrt(res);
      //  orders: [['sort', 'acs'], ['id', 'desc']], 按照列表查询的规则排序
      allMenu.sort((a, b) => {
        // sort相同按照id排序
        if (a.sort === b.sort) {
          return a.id - b.id;
        }
        return a.sort - b.sort;
      });
      ctx.helper.render(200, allMenu);
    }
  }
}

module.exports = AuthController;
