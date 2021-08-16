/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-04 19:28:42
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-22 09:02:07
 * @FilePath: /egg/admin/app/service/org.js
 */
'use strict';
const Service = require('egg').Service;
class OrgService extends Service {
    // 获取机构信息
    async show(data) {
        const { app } = this;
        const prefix = app.config.mysqlConfig.prefix;
        return await this.app.mysql.get(`${prefix}org`, data);
    }

    // 获取所有机构信息
    async index() {
        const { app } = this;
        const prefix = app.config.mysqlConfig.prefix;
        const res = await this.app.mysql.select(`${prefix}org`, {
            where: { status: 1 }, // WHERE 条件
            columns: ['id', 'name'], // 要查询的表字段
        });
        const newRes = res.map(val => ({ label: val.name, value: val.id }));
        return newRes;
    }
}
module.exports = OrgService;
