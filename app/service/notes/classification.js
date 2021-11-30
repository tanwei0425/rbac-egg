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
class ApiService extends Service {
    // 获取单条用户信息
    async show(data) {
        const { app } = this;
        const prefix = app.config.mysqlConfig.prefix;
        const res = await app.mysql.get(`${prefix}notes_classification`, data);
        return res;
    }

    // 获取所有角色信息
    async index(columns, where) {
        const { app } = this;
        const prefix = app.config.mysqlConfig.prefix;
        const res = await this.app.mysql.select(`${prefix}notes_classification`, {
            where, // WHERE 条件
            columns, // 要查询的表字段
        });
        return res;
    }
    // 获取列表所有角色信息
    async list(query) {
        const { app: { mysql, config } } = this;
        const { escape } = mysql;
        const prefix = config.mysqlConfig.prefix;
        const { current, page_size, name, status } = query;
        const offset = current * page_size - page_size;
        let whereSql = '';
        const columns = 'id, name, color, status,description, created_at';
        let listSql = `select ${columns} from ${prefix}notes_classification where is_delete=0 `;
        let countSql = `select count(*) as count from ${prefix}notes_classification where is_delete=0 `;
        name && (whereSql += `and name=${escape(name)} `);
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
        const result = await mysql.insert(`${prefix}notes_classification`, {
            ...data,
        });
        return result.affectedRows === 1;
    }
    // 修改
    async update(row, options) {
        const { app } = this;
        const prefix = app.config.mysqlConfig.prefix;
        row.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const res = await this.app.mysql.update(`${prefix}notes_classification`, row, options);
        return res.affectedRows === 1;
    }
}
module.exports = ApiService;
