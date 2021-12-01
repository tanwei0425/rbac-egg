/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-01 13:58:10
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-23 11:15:21
 * @FilePath: /egg/admin/app/controller/notes/article.js
 */
'use strict';

const Controller = require('egg').Controller;
class NotesArticleController extends Controller {
    async show() {
        const { ctx: { service, helper, params } } = this;
        const res = await service.notes.article.show({ id: params.id });
        helper.render(200, res);
    }
    async index() {
        const { ctx: { service, helper, query } } = this;
        const res = await service.notes.article.list(query);
        helper.render(200, res);
    }
    async create() {
        const { ctx: { service, helper, request } } = this;
        const body = request.body;
        const showRes = await service.notes.article.show({ title: body.title, is_delete: 0 });
        if (showRes) {
            helper.render(401, {}, '文章名称已存在');
            return;
        }
        const res = await service.notes.article.create(body);
        helper.render(res ? 200 : 501, {});
    }
    async update() {
        const { ctx: { service, helper, params, request } } = this;
        const body = request.body;
        const showRes = await service.notes.article.show({ title: body.title, is_delete: 0 });
        if (showRes && `${showRes.id}` !== `${params.id}`) {
            helper.render(401, {}, '文章名称已存在');
            return;
        }
        const options = {
            where: { id: params.id },
        };
        const res = await service.notes.article.update(body, options);
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
        const res = await service.notes.article.update(row, options);
        helper.render(res ? 200 : 501, {});
    }
}

module.exports = NotesArticleController;
