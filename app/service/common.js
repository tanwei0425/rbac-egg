/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-20 14:58:23
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-20 15:03:39
 * @FilePath: /egg/admin/app/service/common.js
 */
'use strict';
const Service = require('egg').Service;
class CommonService extends Service {

    // 退出登录
    async loginOut() {
        const { ctx: { helper, locals } } = this;
        // 清除redis
        const userInfo = locals.auth;
        console.log(userInfo, 'userInfo');
        const result = await helper.delRedis(userInfo.id + userInfo.username);
        console.log(result, 'result');
        return result;
    }

    // 通过用户id 获取
    async userIdSelectAllPermission(id, type) {
        const { ctx: { helper, service } } = this;
        // 查询用户下所有角色信息
        const where = {
            user_id: id,
        };
        const columns = ['role_id'];
        const userRoleRes = await service.userRole.index(where, columns);

        if (!userRoleRes || userRoleRes.length < 1) {
            helper.render(200, []);
            return;
        }
        const roleIdArr = userRoleRes.map(val => val.role_id);

        // 去除当前角色已禁用或者删除的角色（在用的）
        const roleRes = await service.role.index({
            status: '1',
            is_delete: 0,
            id: [...roleIdArr],
        }, ['id']);
        if (!roleRes || roleRes.length < 1) {
            helper.render(200, []);
            return;
        }
        const activeRoleIdArr = roleRes.map(val => val.id);

        // 查询当前在用角色下的权限的id
        const rolePermissionRes = await service.rolePermission.index({
            role_id: activeRoleIdArr,
        }, ['permission_id']);
        if (!rolePermissionRes || rolePermissionRes.length < 1) {
            helper.render(200, []);
            return;
        }
        const allPermission = rolePermissionRes.map(val => val.permission_id);
        const permissionRes = await service.permission.index({
            id: allPermission,
            type,
        });
        if (!permissionRes || permissionRes.length < 1) {
            helper.render(200, []);
            return;
        }

        const activePermission = permissionRes.map(val => val.id);
        return activePermission;
    }


    // 正在登录的用户被禁用或者删除后，强制踢出
    async userStatusUpdateSyncRedis(key) {
        const { ctx: { helper } } = this;
        const res = await helper.getRedis(key);
        if (res.token) {
            await helper.delRedis(key);
        }
    }

    // 正在登录的用户，以下情况触发用户对应权限修改，更新redis的接口权限。
    // 1.角色授权更改
    // 2.角色关联用户取消
    // 3.角色被禁用
    // 4.角色被删除
    // 5.接口被禁用
    // 6.接口被删除
    async roleOrPermissionStatusUpdateSyncRedis(key) {
        console.log(key, 'key');
    }
}
module.exports = CommonService;
