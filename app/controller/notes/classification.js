/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-01 13:58:10
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-23 11:15:21
 * @FilePath: /egg/admin/app/controller/notes/classification.js
 */
'use strict';

const Controller = require('egg').Controller;
class NotesClassificationController extends Controller {
    async show() {
        const { ctx: { service, helper, params } } = this;
        const res = await service.notes.classification.show({ id: params.id });
        helper.render(200, res);
    }
    async index() {
        const { ctx: { service, helper, query } } = this;
        const res = await service.notes.classification.list(query);
        helper.render(200, res);
    }
    async create() {
        const { ctx: { service, helper, request } } = this;
        const body = request.body;
        const showRes = await service.notes.classification.show({ name: body.name, is_delete: 0 });
        if (showRes) {
            helper.render(401, {}, '随记分类名称已存在');
            return;
        }
        const res = await service.notes.classification.create(body);
        helper.render(res ? 200 : 501, {});
    }
    async update() {
        const { ctx: { service, helper, params, request } } = this;
        const body = request.body;
        const showRes = await service.notes.classification.show({ name: body.name, is_delete: 0 });
        if (showRes && `${showRes.id}` !== `${params.id}`) {
            helper.render(401, {}, '随记分类名称已存在');
            return;
        }
        const options = {
            where: { id: params.id },
        };
        const res = await service.notes.classification.update(body, options);
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
        // 获取使用当前分类的文章
        const showRes = await service.notes.article.index(['title'], { classification: params.id, is_delete: 0 });
        // 分类下如果有文章，不能删除
        if (showRes.length > 0) {
            helper.render(915, {}, `当前分类下存在${showRes.length}篇文章，请先清空分类下文章`);
            return;
        }
        const res = await service.notes.classification.update(row, options);
        helper.render(res ? 200 : 501, {});
    }
    async all() {
        const { ctx: { service, helper } } = this;
        const where = {
            status: '1',
            is_delete: 0,
        };// WHERE 条件
        const columns = ['id', 'name'];
        const res = await service.notes.classification.index(where, columns);
        helper.render(200, res);
    }
}

module.exports = NotesClassificationController;
