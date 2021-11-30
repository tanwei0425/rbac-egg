/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-01 13:58:10
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-22 08:50:30
 * @FilePath: /egg/admin/app/controller/menu.js
 */
'use strict';

const Controller = require('egg').Controller;
class MenuController extends Controller {
    async show() {
        const { ctx: { service, helper, params } } = this;
        const res = await service.menu.show({ id: params.id });
        helper.render(200, res);
    }
    async index() {
        const { ctx } = this;
        const columns = ['id', 'pid', 'name', 'code', 'path', 'is_router', 'cmp_path', 'status', 'icon', 'created_at', 'is_show', 'sort'];
        const where = {
            is_delete: 0,
        };
        const res = await ctx.service.menu.index(columns, where);
        ctx.helper.render(200, res);
    }
    async create() {
        const { ctx: { service, helper, request } } = this;
        const body = request.body;
        const showRes = await service.menu.show({ name: body.name, pid: body.pid, is_delete: 0 });
        if (showRes) {
            helper.render(401, {}, '菜单名称已存在');
            return;
        }
        const res = await service.menu.create(body);
        helper.render(res ? 200 : 501, {});
    }
    async update() {
        const { ctx: { service, helper, params, request } } = this;
        const body = request.body;
        const showRes = await service.menu.show({ name: body.name, pid: body.pid, is_delete: 0 });
        if (showRes && `${showRes.id}` !== `${params.id}`) {
            helper.render(401, {}, '菜单名称已存在');
            return;
        }
        const options = {
            where: { id: params.id },
        };
        const res = await service.menu.update(body, options);
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
        const res = await service.menu.update(row, options);
        helper.render(res ? 200 : 501, {});
    }
}

module.exports = MenuController;
