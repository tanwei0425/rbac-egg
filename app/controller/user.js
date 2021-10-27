/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-01 13:58:10
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-23 11:15:21
 * @FilePath: /egg/admin/app/controller/user.js
 */
'use strict';

const Controller = require('egg').Controller;
class UserController extends Controller {
    async show() {
        const { ctx: { service, helper, params } } = this;
        const res = await service.user.show({ id: params.id });
        const data = {};
        if (res) {
            data.id = res.id;
            data.username = res.username;
            data.name = res.name;
            data.phone = res.phone;
            data.status = res.status;
        }

        // 查询用户下所有角色信息
        const where = {
            user_id: params.id,
        };
        const columns = ['role_id'];
        const userRoleRes = await service.userRole.index(where, columns);
        const roleIdArr = userRoleRes && userRoleRes.map(val => `${val.role_id}`);
        data.roles = roleIdArr;
        helper.render(200, data);
    }
    async index() {
        const { ctx: { service, helper, query } } = this;
        const res = await service.user.list(query);
        helper.render(200, res);
    }
    async create() {
        const { ctx: { service, helper, request } } = this;
        const body = request.body;
        const showRes = await service.user.show({ username: body.username });
        if (showRes) {
            helper.render(401, {}, '用户名称已存在');
            return;
        }
        if (body.is_super) {
            helper.render(401, {}, '你要搞事情啊？');
            return;
        }
        const res = await service.user.create(body);
        helper.render(res ? 200 : 501, {});
    }
    async update() {
        const { ctx: { service, helper, params, request } } = this;
        const body = request.body;
        // 不能修改用户名
        const { username, ...rest } = body;
        const options = {
            where: { id: params.id },
        };
        const res = await service.user.update(rest, options);
        if (res && rest.status === '0') {
            await service.common.index.userStatusUpdateSyncRedis(params.id + username);
        }
        helper.render(res ? 200 : 501, {});
    }
    async destroy() {
        const { ctx: { service, helper, params } } = this;
        const row = {
            is_delete: 1,
        };
        const options = {
            where: { id: params.id },
        };
        const userInfo = await service.user.show({ id: params.id, is_delete: 0 });
        // 校验用户信息
        if (!userInfo) {
            helper.render(910);
            return;
        }
        // 超管不能删除
        if (userInfo.is_super === 1) {
            helper.render(401, {}, '你要搞事情啊？');
            return;
        }
        const res = await service.user.update(row, options);
        if (res) {
            await service.common.index.userStatusUpdateSyncRedis(params.id + userInfo.username);
        }
        helper.render(res ? 200 : 501, {});
    }
    async reloadPwd() {
        const { ctx: { service, helper, params }, app: { config } } = this;
        const options = {
            where: { id: params.id },
        };
        const password = helper.addSaltPassword(config.initPassword);
        const body = {
            password,
        };
        const res = await service.user.update(body, options);
        helper.render(res ? 200 : 501, {});
    }
    async all() {
        const { ctx: { service, helper } } = this;
        const columns = ['id', 'username'];
        const where = {
            status: '1',
            is_delete: 0,
            is_super: 0,
        };
        const res = await service.user.index(columns, where);
        helper.render(200, res);
    }

    async exportUser() {
        const { ctx } = this;
        const { service, query, helper } = ctx;
        const columns = ['username', 'name', 'phone', 'status'];
        const userDataRes = await service.user.exportList(columns, query);
        const headerStyle = {
            fill: {
                bgColor: { rgb: 'CCCCCC' },
                fgColor: { rgb: 'AAAAAA' },
                patternType: 'solid',
            },
            alignment: {
                horizontal: 'left',
                vertical: 'center',
                wrapText: true,
            },
            font: {
                sz: 16,
            },
            border: {
                top: {
                    style: 'thin', color: { rgb: 'CCCCCC' },
                },
                bottom: {
                    style: 'thin', color: { rgb: 'CCCCCC' },
                },
                left: {
                    style: 'thin', color: { rgb: 'CCCCCC' },
                },
                right: {
                    style: 'thin', color: { rgb: 'CCCCCC' },
                },
            },
        };
        const demoStyle = {
            font: {
                color: {
                    rgb: 'FF4D4F',
                },
                sz: 15,
            },
            alignment: {
                horizontal: 'center',
                vertical: 'center',
            },
        };
        const exportUserData = [
            [{ v: '合并单元格测试', s: demoStyle }],
            [{ v: '用户名称', s: headerStyle }, { v: '真实姓名', s: headerStyle }, { v: '手机号', s: headerStyle }, { v: '状态', s: headerStyle }],
        ];
        userDataRes.forEach(val => {
            exportUserData.push(
                [val.username, val.name, val.phone, val.status === '1' ? '启用' : '禁用']
            );
        });
        const data = [
            {
                name: '用户信息',
                data: exportUserData,
            },
        ];
        const filename = '系统用户';
        const options = {
            '!cols': [
                { wch: 25 },
                { wch: 25 },
                { wch: 15 },
                { wch: 10 },
            ],
            // 合并0,0 - 0，3
            // c是行 , r是列
            '!merges': [
                { s: { c: 0, r: 0 }, e: { c: 3, r: 0 } },
            ],
        };

        const resBuffer = await helper.exportFile({
            data,
            filename,
            options,
            directoryPath: 'user/',
            saveXlsx: true,
        });
        ctx.body = resBuffer; // 直接返回流文件
    }
}

module.exports = UserController;
