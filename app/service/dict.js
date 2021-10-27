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
class DictService extends Service {
    // 获取数据字典
    async index() {
        const { app } = this;
        const prefix = app.config.mysqlConfig.prefix;
        const res = await this.app.mysql.select(`${prefix}dict_item`, {
            where: { status: '1' }, // WHERE 条件
            columns: ['code', 'value'], // 要查询的表字段
        });
        return res;
    }
}
module.exports = DictService;
