/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-04 19:28:42
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-23 11:10:38
 * @FilePath: /egg/admin/app/service/user.js
 */
'use strict';
const Service = require('egg').Service;
const moment = require('moment');
class SkinTheme extends Service {

    // 获取
    async show(data) {
        const { app } = this;
        const prefix = app.config.mysqlConfig.prefix;
        const res = await app.mysql.get(`${prefix}system_theme`, data);
        return res;
    }
    async create(data) {
        const { app: { mysql, config } } = this;
        const prefix = config.mysqlConfig.prefix;
        data.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        data.content = data.skin;
        delete data.skin;
        const result = await mysql.insert(`${prefix}system_theme`, {
            ...data,
        });
        return result.affectedRows === 1;
    }
    async update(data) {
        const { app: { config, mysql } } = this;
        const prefix = config.mysqlConfig.prefix;
        console.log(data.skin, 'data.skin');
        const row = {
            content: data.skin,
            updated_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        };
        const options = {
            where: {
                id: data.id,
            },
        };
        const res = await mysql.update(`${prefix}system_theme`, row, options);
        return res.affectedRows === 1;
    }
}
module.exports = SkinTheme;
