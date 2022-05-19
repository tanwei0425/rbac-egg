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
const parser = require('ua-parser-js');
class NotesArticleController extends Controller {
    constructor(props) {
        super(props);
        // 添加编辑字段校验
        this.validateData = {
            title: { type: 'string' },
            classification: { type: 'string' },
            status: { type: 'string' },
            author: { type: 'string' },
            content: { type: 'string' },
            read_number: { type: 'number' },
            description: { type: 'string', required: false },
        };
    }
    async show() {
        const { ctx: { service, helper, params }, app: { validator } } = this;
        const errors = validator.validate({
            id: { type: 'string' },
        }, params);
        if (errors) {
            helper.render(422, errors);
            return;
        }
        const res = await service.notes.article.show({ id: params.id });
        helper.render(200, res);
    }
    async index() {
        const { ctx: { service, helper, locals, query } } = this;
        const userInfo = await service.user.show({ id: locals.auth.id });
        if (!userInfo) {
            helper.render(912);
            return;
        }
        // 如果是超级管理员获取所有文章  如果是其他用户只能获取自己创建的文章
        if (userInfo.is_super !== 1) {
            query.create_user_id = locals.auth.id;
        }
        const res = await service.notes.article.list(query);
        helper.render(200, res);
    }
    async create() {
        const { ctx: { service, helper, request }, app: { validator } } = this;
        const errors = validator.validate({
            ...this.validateData,
        }, request.body);
        if (errors) {
            helper.render(422, errors);
            return;
        }
        const res = await service.notes.article.create(request.body);
        helper.render(res ? 200 : 501, {});
    }
    async update() {
        const { ctx: { service, helper, params, locals, request }, app: { validator } } = this;
        const body = request.body;
        console.log(this.validateData, 'validateData');
        const errors = validator.validate({
            id: { type: 'string' },
            ...this.validateData,
        }, { ...body, ...params });
        if (errors) {
            helper.render(422, errors);
            return;
        }
        // 如果是超级管理员修改所有文章  如果是其他用户只能修改自己创建的文章
        const showRes = await service.notes.article.show({ id: params.id, is_delete: 0 });
        const userInfo = await service.user.show({ id: locals.auth.id });
        if (userInfo.is_super !== 1 && locals.auth.id !== showRes.create_user_id) {
            helper.render(915, {}, '您无权操作别人发布的文章');
            return;
        }
        const options = {
            where: { id: params.id },
        };
        const res = await service.notes.article.update(body, options);
        helper.render(res ? 200 : 501, {});
    }
    async destroy() {
        const { ctx: { service, helper, locals, params }, app: { validator } } = this;
        const errors = validator.validate({
            id: { type: 'string' },
        }, params);
        if (errors) {
            helper.render(422, errors);
            return;
        }
        const row = {
            is_delete: 1,
        };
        const options = {
            where: { id: params.id },
        };

        // 如果是超级管理员修改所有文章  如果是其他用户只能修改自己创建的文章
        const showRes = await service.notes.article.show({ id: params.id, is_delete: 0 });
        const userInfo = await service.user.show({ id: locals.auth.id });
        if (userInfo.is_super !== 1 && locals.auth.id !== showRes.create_user_id) {
            helper.render(915, {}, '您无权操作别人发布的文章');
            return;
        }
        const res = await service.notes.article.update(row, options);
        helper.render(res ? 200 : 501, {});
    }

    // 门户文章列表
    async noAuthArticleList() {
        const { ctx: { service, helper, query } } = this;
        const res = await service.notes.article.list(query);
        helper.render(200, res);
    }

    // 门户详情和更新文章浏览量
    async noAuthArticleShow() {
        const { ctx: { service, request, helper, params } } = this;
        const showRes = await service.notes.article.show({ id: params.id });
        // 是同一篇文章并且是同一个ip，1个小时内算一次浏览量（在同一个网络下公网可能ip相同，不一定准确）
        const articleKey = `article:${showRes.id}-${request.ip}`;
        // 查询文档是否已经阅读过（同一篇文章并且是同一个ip，1个小时内为阅读过）
        const articleKeyRes = await helper.getRedis(articleKey);
        if (showRes && articleKeyRes.status !== 1) {
            const newReadNumber = showRes.read_number + 1;
            const ua = parser(request.headers['user-agent']);
            const insertData = {
                article_id: showRes.id,
                title: showRes.title,
                classification: showRes.classification,
                author: showRes.author,
                // ip: '127.0.0.1',
                ip: request.ip,
                // os: { name: 'Mac OS', version: '10.15.7' },
                os: JSON.stringify(ua.os),
                // browser: { name: 'Chrome', version: '100.0.4896.127', major: '100' },
                browser: JSON.stringify(ua.browser),
            };
            // 更新当前浏览量并插入记录
            const updateReadNumberRes = await service.notes.article.updateReadNumberRes(
                { read_number: newReadNumber },
                { where: { id: params.id } },
                insertData
            );
            if (updateReadNumberRes) {
                // 更新成功后记录在redis中，1小时内不在此再次计算阅读
                await helper.setRedis(articleKey, { status: 1 }, 3600);
                // 查询的是没更新浏览量之前的浏览量，如果更新成功返回的时候流量量也同步+1
                showRes.read_number = newReadNumber;
            }
        }
        helper.render(200, showRes);
    }
}

module.exports = NotesArticleController;
