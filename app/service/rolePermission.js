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
const moment = require('moment');
class RolePermissionService extends Service {
    // 获取多对多权限信息
    async index(where, columns) {
        const { app } = this;
        const prefix = app.config.mysqlConfig.prefix;
        return await this.app.mysql.select(`${prefix}role_permission`, {
            where, // WHERE 条件
            columns, // 要查询的表字段
        });
    }
    // 批量处理role_permission 授权数据的添加和删除
    async setRoleAuth({ deleteData, insertData }) {
        const { app: { mysql, config }, ctx } = this;
        const prefix = config.mysqlConfig.prefix;
        const newInsertData = insertData.data.map(val => ({
            permission_id: val,
            role_id: insertData.role_id,
            created_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        }));
        const res = await mysql.beginTransactionScope(async conn => {
            if (deleteData.permission_id.length > 0) {
                await conn.delete(`${prefix}role_permission`, deleteData);
            }
            if (newInsertData.length > 0) {
                await conn.insert(`${prefix}role_permission`, newInsertData);
            }
            return true;
        }, ctx);
        return res;
    }
}
module.exports = RolePermissionService;
