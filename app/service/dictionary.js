/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-20 14:58:23
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-20 15:03:39
 * @FilePath: /egg/admin/app/service/dict.js
 */
'use strict';
const Service = require('egg').Service;
const moment = require('moment');
class DictService extends Service {

    // 获取单条用户信息
    async show(data) {
        const { app } = this;
        const prefix = app.config.mysqlConfig.prefix;
        const res = await app.mysql.get(`${prefix}dictionary`, data);
        return res;
    }

    // 获取所有随记文章信息
    async index(columns, where) {
        const { app } = this;
        const prefix = app.config.mysqlConfig.prefix;
        const res = await this.app.mysql.select(`${prefix}dictionary`, {
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
        const { current, page_size, name, code, status } = query;
        const offset = current * page_size - page_size;
        let whereSql = '';
        const columns = 'id, name, code, status, description, created_at, updated_at';
        let listSql = `select ${columns} from ${prefix}dictionary where is_delete=0 `;
        let countSql = `select count(*) as count from ${prefix}dictionary where is_delete=0 `;
        name && (whereSql += `and name like ${escape(`%${name}%`)} `);
        code && (whereSql += `and code like ${escape(`%${code}%`)} `);
        status && (whereSql += `and status=${escape(status)} `);
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
        const { app: { mysql, config } } = this;
        const prefix = config.mysqlConfig.prefix;
        data.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const result = await mysql.insert(`${prefix}dictionary`, {
            ...data,
        });
        return result.affectedRows === 1;
    }
    // 修改
    async update(row, options) {
        const { app } = this;
        const prefix = app.config.mysqlConfig.prefix;
        row.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const res = await this.app.mysql.update(`${prefix}dictionary`, row, options);
        return res.affectedRows === 1;
    }
}
module.exports = DictService;
