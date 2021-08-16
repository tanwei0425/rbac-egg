/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-04 19:28:42
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-20 14:46:35
 * @FilePath: /egg/admin/app/service/menu.js
 */
'use strict';
const Service = require('egg').Service;
const moment = require('moment');
class OrgService extends Service {
    // 获取详情信息
    async show(data) {
        const { app } = this;
        const prefix = app.config.mysqlConfig.prefix;
        const res = await app.mysql.get(`${prefix}menu`, data);
        return res;
    }
    // 获取角色的权限菜单和菜单列表
    async index(columns, where) {
        const { app } = this;
        const prefix = app.config.mysqlConfig.prefix;
        const res = await app.mysql.select(`${prefix}menu`, {
            columns,
            // auth menu授权部分排序也要同步调整
            orders: [['sort', 'acs'], ['id', 'desc']],
            where,
        });
        return res;
    }

    // 添加
    async create(data) {
        const { app: { mysql, config }, ctx } = this;
        const prefix = config.mysqlConfig.prefix;
        data.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        // 添加的时候permission要创建一条数据，并且关联到menu的permission_id上
        const res = await mysql.beginTransactionScope(async conn => {
            const permissionRes = await conn.insert(`${prefix}permission`, {
                type: 'menu',
            });
            await conn.insert(`${prefix}menu`, {
                ...data,
                permission_id: permissionRes.insertId,
            });
            return true;
        }, ctx);
        return res;
    }
    // 修改
    async update(row, options) {
        const { app } = this;
        const prefix = app.config.mysqlConfig.prefix;
        row.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const res = await this.app.mysql.update(`${prefix}menu`, row, options);
        return res.affectedRows === 1;
    }
}
module.exports = OrgService;
