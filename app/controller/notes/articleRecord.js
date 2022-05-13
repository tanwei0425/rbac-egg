/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-01 13:58:10
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-23 11:15:21
 * @FilePath: /egg/admin/app/controller/notes/articleRecord.js
 */
'use strict';

const Controller = require('egg').Controller;
class NotesClassificationController extends Controller {
    async index() {
        const { ctx: { service, helper, query } } = this;
        const res = await service.notes.articleRecord.list(query);
        helper.render(200, res);
    }
}

module.exports = NotesClassificationController;
