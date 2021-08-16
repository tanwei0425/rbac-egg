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
class UserRoleService extends Service {
    // 获取多对多角色信息
    async index(where, columns) {
        const { app } = this;
        const prefix = app.config.mysqlConfig.prefix;
        return await this.app.mysql.select(`${prefix}user_role`, {
            where, // WHERE 条件
            columns, // 要查询的表字段
        });
    }


    // 批量处理user_role 关联数据的添加和删除
    async putAssociateUser({ deleteData, insertData }) {
        const { app: { mysql, config }, ctx } = this;
        const prefix = config.mysqlConfig.prefix;
        const newInsertData = insertData.associateUser.map(val => ({
            user_id: val,
            role_id: insertData.role_id,
            created_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        }));
        const res = await mysql.beginTransactionScope(async conn => {
            if (deleteData.user_id.length > 0) {
                await conn.delete(`${prefix}user_role`, deleteData);
            }
            if (newInsertData.length > 0) {
                await conn.insert(`${prefix}user_role`, newInsertData);
            }
            return true;
        }, ctx);
        return res;
    }
}
module.exports = UserRoleService;
