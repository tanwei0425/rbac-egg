/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-04 19:28:42
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-22 09:03:09
 * @FilePath: /egg/admin/app/service/userRole.js
 */
'use strict';
const Service = require('egg').Service;
// const moment = require('moment');
class PermissionService extends Service {
    async index(where, columns) {
        const { app } = this;
        const prefix = app.config.mysqlConfig.prefix;
        return await this.app.mysql.select(`${prefix}permission`, {
            where, // WHERE 条件
            columns, // 要查询的表字段
        });
    }
}
module.exports = PermissionService;
