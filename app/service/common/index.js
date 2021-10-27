/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-20 14:58:23
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-20 15:03:39
 * @FilePath: /egg/admin/app/service/common/index.js
 */
'use strict';
const Service = require('egg').Service;
const parser = require('ua-parser-js');
class CommonService extends Service {

    // 退出登录
    async loginOut() {
        const { ctx: { helper, locals } } = this;
        // 清除redis
        const userInfo = locals.auth;
        const result = await helper.delRedis(userInfo.id + userInfo.username);
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

    // 自定义日志基础信息
    async customLogger({
        name,
        dataKey,
        data,
    }) {
        const { ctx: { ip, host, protocol, request, locals }, app } = this;
        // 获取客户端信息
        const ua = parser(request.headers['user-agent']);
        const userInfo = locals.auth || {};
        const res = ip !== '127.0.0.1' ? await this.ipGetAddress(ip) : {};
        const loggerData = {
            username: userInfo.username,
            os: ua.os,
            browser: ua.browser,
            path: request.path,
            method: request.method,
            ip, // 如果开启反响代理，请在config.default.js配置中开启config.proxy = true,否则拿不到真实ip
            host, // 获取用户请求的域名
            protocol, // 获取用户请求的协议
            address: res.address || '',
            isp: res.isp || '',
            ispArea: res.ispArea || '',
            ...data,
        };
        app.getLogger(name).info(dataKey, loggerData);
    }

    // 根据ip获取所在地区
    async ipGetAddress(ip) {
        const ctx = this.ctx;
        const { app: { config } } = ctx;
        const res = await ctx.curl('https://api01.aliyun.venuscn.com/ip', {
            method: 'GET',
            data: {
                ip,
            },
            // 直接发送原始 xml 数据，不需要 HttpClient 做特殊处理
            headers: {
                Authorization: `APPCODE ${config.ipGetAddressAppCode}`,
            },
        });
        const resData = JSON.parse(res.data.toString());
        if (resData.ret === 200) {
            const data = resData.data;
            const address = data.country + data.region + data.city;
            return {
                address,
                isp: data.isp,
                ispArea: data.area,
            };
        }
        return {};
    }
}
module.exports = CommonService;
