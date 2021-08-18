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
    const twCaptcha = await helper.getRedis('tw_captcha');
    if (!twCaptcha[uuid]) {
      helper.render(905);
      return;
    }
    const { code: redisUuid } = twCaptcha[uuid];
    delete twCaptcha[uuid];
    await helper.setRedis('tw_captcha', twCaptcha);
    if (code !== redisUuid) {
      helper.render(905);
      return;
    }
    const userInfo = await service.user.show({ username: rest.username, is_delete: 0 });
    if (!userInfo) {
      helper.render(910);
      return;
    }
    const pwdCrypto = helper.addSaltPassword(rest.password);
    if (userInfo.password !== pwdCrypto) {
      helper.render(906);
      return;
    }

    const token = await helper.loginToken({ id: userInfo.id, username: userInfo.username }, app.config.redisConfig.expireTime);
    ctx.set('token', token);
    helper.render(200);
  }

  // 退出登录
  async signOut() {
    const { ctx } = this;
    const res = await ctx.service.common.loginOut();
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
    };
    // 查询机构
    if (userInfo.org_id) {
      const orgRes = await ctx.service.org.show({ id: userInfo.org_id, status: 1 });
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
    if (userInfo.is_super === 1) {
      const columns = ['code'];
      const where = {
        status: '1',
        is_delete: 0,
      };
      const elementsRes = await ctx.service.element.index(columns, where);
      const elements = elementsRes.map(val => val.code);
      res.elements = elements;
    } else {
      // 查询角色
      const userRoleRes = await ctx.service.userRole.index({
        user_id: userInfo.id,
      }, ['role_id']);
      if (!userRoleRes || userRoleRes.length < 1) {
        ctx.helper.render(200, []);
        return;
      }
      const roleIdArr = userRoleRes.map(val => val.role_id);

      // 去除当前角色已禁用或者删除的角色
      const roleRes = await ctx.service.role.index({
        status: '1',
        is_delete: 0,
        id: [...roleIdArr],
      }, ['id']);
      if (!roleRes || roleRes.length < 1) {
        ctx.helper.render(200, []);
        return;
      }
      const activeRoleIdArr = roleRes.map(val => val.id);

      // 查询当前在用角色下的元素权限
      const rolePermissionRes = await ctx.service.rolePermission.index({
        role_id: activeRoleIdArr,
      }, ['permission_id']);
      if (!rolePermissionRes || rolePermissionRes.length < 1) {
        ctx.helper.render(200, []);
        return;
      }
      const allPermission = rolePermissionRes.map(val => val.permission_id);
      const permissionElementRes = await ctx.service.permission.index({
        id: allPermission,
        type: 'element',
      });
      if (!permissionElementRes || permissionElementRes.length < 1) {
        ctx.helper.render(200, []);
        return;
      }

      const activePermissionElement = permissionElementRes.map(val => val.id);
      const columns = ['code'];
      const where = {
        status: '1',
        is_delete: 0,
        permission_id: activePermissionElement,
      };
      const elementsRes = await ctx.service.element.index(columns, where);
      const elements = elementsRes.map(val => val.code);
      res.elements = elements;
    }
    // 查询按钮权限
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
      // 查询角色
      const userRoleRes = await ctx.service.userRole.index({
        user_id: userInfo.id,
      }, ['role_id']);
      if (!userRoleRes || userRoleRes.length < 1) {
        ctx.helper.render(200, []);
        return;
      }
      const roleIdArr = userRoleRes.map(val => val.role_id);

      // 去除当前角色已禁用或者删除的角色
      const roleRes = await ctx.service.role.index({
        status: '1',
        is_delete: 0,
        id: [...roleIdArr],
      }, ['id']);
      if (!roleRes || roleRes.length < 1) {
        ctx.helper.render(200, []);
        return;
      }
      const activeRoleIdArr = roleRes.map(val => val.id);

      // 查询当前在用角色下的菜单权限
      const rolePermissionRes = await ctx.service.rolePermission.index({
        role_id: activeRoleIdArr,
      }, ['permission_id']);
      if (!rolePermissionRes || rolePermissionRes.length < 1) {
        ctx.helper.render(200, []);
        return;
      }
      const allPermission = rolePermissionRes.map(val => val.permission_id);
      const permissionMenuRes = await ctx.service.permission.index({
        id: allPermission,
        type: 'menu',
      });
      if (!permissionMenuRes || permissionMenuRes.length < 1) {
        ctx.helper.render(200, []);
        return;
      }

      const activePermissionMenu = permissionMenuRes.map(val => val.id);
      // 获取当前角色下的菜单
      const columns = ['id', 'pid', 'name', 'path', 'cmp_path', 'icon', 'is_router', 'is_show', 'sort'];
      const where = {
        status: '1',
        is_delete: 0,
      };
      const res = await ctx.service.menu.index(columns, {
        ...where,
        permission_id: activePermissionMenu,
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
