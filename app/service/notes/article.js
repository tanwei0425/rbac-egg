/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-04 19:28:42
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-22 09:03:09
 * @FilePath: /egg/admin/app/service/api.js
 */
'use strict';
const Service = require('egg').Service;
const moment = require('moment');
class NotesArticleService extends Service {
    // 获取单条用户信息
    async show(data) {
        const { app } = this;
        const prefix = app.config.mysqlConfig.prefix;
        const res = await app.mysql.get(`${prefix}notes_article`, data);
        return res;
    }

    // 获取所有随记文章信息
    async index(columns, where) {
        const { app } = this;
        const prefix = app.config.mysqlConfig.prefix;
        const res = await this.app.mysql.select(`${prefix}notes_article`, {
            where, // WHERE 条件
            columns, // 要查询的表字段
        });
        return res;
    }
    // 获取列表所有随记文章信息
    async list(query) {
        const { app: { mysql, config } } = this;
        const { escape } = mysql;
        const prefix = config.mysqlConfig.prefix;
        const { current, page_size, title, status, classification, author, create_user_name, create_user_id } = query;
        const offset = current * page_size - page_size;
        let whereSql = '';
        const columns = 'id, title, classification, status, description, author, read_number, create_user_name, created_at, updated_at';
        let listSql = `select ${columns} from ${prefix}notes_article where is_delete=0 `;
        let countSql = `select count(*) as count from ${prefix}notes_article where is_delete=0 `;
        title && (whereSql += `and title like ${escape(`%${title}%`)} `);
        status && (whereSql += `and status=${escape(status)} `);
        if (classification) {
            classification.split().map(val => escape(val)).join();
            whereSql += `and classification in (${classification}) `;
        }
        author && (whereSql += `and author like ${escape(`%${author}%`)} `);
        create_user_name && (whereSql += `and create_user_name like ${escape(`%${create_user_name}%`)} `);
        // 处理除了超管自己能看自己发布的文章
        create_user_id && (whereSql += `and create_user_id=${escape(create_user_id)} `);
        whereSql && (countSql += whereSql);
        whereSql && (listSql += whereSql);
        listSql += `order by id desc limit ${escape(+offset)}, ${escape(+page_size)}`;
        const listRes = await mysql.query(listSql);
        const totalRes = await mysql.query(countSql);
        const data = {
            list: listRes,
            total: totalRes[0].count,
        };
        return data;
    }
    // 添加
    async create(data) {
        const { ctx, app: { mysql, config } } = this;
        const prefix = config.mysqlConfig.prefix;
        data.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        data.create_user_id = ctx.locals.auth.id;
        data.create_user_name = ctx.locals.auth.username;
        const result = await mysql.insert(`${prefix}notes_article`, {
            ...data,
        });
        return result.affectedRows === 1;
    }
    // 修改
    async update(row, options) {
        const { app } = this;
        const prefix = app.config.mysqlConfig.prefix;
        row.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const res = await this.app.mysql.update(`${prefix}notes_article`, row, options);
        return res.affectedRows === 1;
    }
    // 文章浏览量
    async updateReadNumberRes(row, options, insertData) {
        const { app: { mysql, config }, ctx } = this;
        const prefix = config.mysqlConfig.prefix;
        // 更新文章浏览量并记录在记录表中
        const res = await mysql.beginTransactionScope(async conn => {
            await conn.update(`${prefix}notes_article`, row, options);
            insertData.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
            await conn.insert(`${prefix}notes_article_record`, insertData);
            return true;
        }, ctx);
        return res;
    }
}
module.exports = NotesArticleService;
