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
        const res = await app.mysql.get(`${prefix}baby`, data);
        return res;
    }

    // 获取列表所有角色信息
    async list(query) {
        const { app: { mysql, config } } = this;
        const { escape } = mysql;
        const prefix = config.mysqlConfig.prefix;
        const { current, page_size, add_name } = query;
        const offset = current * page_size - page_size;
        let whereSql = '';
        const columns = 'id, name, add_name, address, created_at';
        let listSql = `select ${columns} from ${prefix}baby where is_delete=0 `;
        let countSql = `select count(*) as count from ${prefix}baby where is_delete=0 `;
        add_name && (whereSql += `and add_name=${escape(add_name)} `);
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
        console.log(data, 'data');
        const { ctx: { ip, service }, app: { mysql, config } } = this;
        console.log(ip, 'ip');
        const prefix = config.mysqlConfig.prefix;
        data.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        data.ip = ip;
        const getAddress = (ip !== '127.0.0.1' || ip !== '::1') ? await service.common.index.ipGetAddress(ip) : {};
        data.address = getAddress.address;
        const result = await mysql.insert(`${prefix}baby`, {
            ...data,
        });
        return result.affectedRows === 1;
    }
    // 修改
    async update(row, options) {
        const { app } = this;
        const prefix = app.config.mysqlConfig.prefix;
        const res = await this.app.mysql.update(`${prefix}baby`, row, options);
        return res.affectedRows === 1;
    }
}
module.exports = ApiService;
