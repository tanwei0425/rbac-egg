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
        const res = await app.mysql.get(`${prefix}api`, data);
        return res;
    }

    // 获取所有角色信息
    async index(columns, where) {
        const { app } = this;
        const prefix = app.config.mysqlConfig.prefix;
        const res = await this.app.mysql.select(`${prefix}api`, {
            where, // WHERE 条件
            columns, // 要查询的表字段
        });
        return res;
    }
    // 获取列表所有角色信息
    async list(query) {
        const { app: { mysql, config }, ctx: { service } } = this;
        const { escape } = mysql;
        const prefix = config.mysqlConfig.prefix;
        const { current, page_size, name, status, menu_id, method } = query;
        let menu_all_id = [];
        // 查找当前menu_id 有没有子菜单，一起搜索出来
        if (menu_id) menu_all_id = [menu_id];
        if (menu_id && menu_id !== '0') {
            // 获取所有在用的菜单
            const columns = ['id', 'pid', 'name', 'code', 'path', 'is_router', 'cmp_path', 'status', 'icon', 'created_at', 'is_show', 'sort'];
            const where = {
                is_delete: 0,
                status: '1',
            };
            const res = await service.menu.index(columns, where);
            // 查找所有相关子菜单
            const seekAllChildMenu = (data, target) => {
                data.forEach(val => {
                    if (target === `${val.pid}`) {
                        menu_all_id.push(`${val.id}`);
                        seekAllChildMenu(data, `${val.id}`);
                    }
                });
            };
            seekAllChildMenu(res, menu_id);
        }
        const menu_all_id_string = menu_all_id.join();
        const offset = current * page_size - page_size;
        let whereSql = '';
        const api = `${prefix}api`;
        const menu = `${prefix}menu`;
        const columns = `${api}.id, ${api}.name, ${api}.path,  ${api}.method, ${api}.menu_id, ${menu}.name as menu_name, ${api}.status, ${api}.created_at`;
        // 内连接查询
        let listSql = `select ${columns} from ${api} left join ${menu} on ${api}.menu_id = ${menu}.id where ${api}.is_delete=0 `;
        let countSql = `select count(*) as count from ${api} where is_delete=0 `;
        name && (whereSql += `and ${api}.name like ${escape(`%${name}%`)} `);
        method && (whereSql += `and ${api}.method=${escape(method)} `);
        status && (whereSql += `and ${api}.status=${escape(status)} `);
        menu_all_id_string && (whereSql += `and ${api}.menu_id in (${menu_all_id_string}) `);
        whereSql && (countSql += whereSql);
        whereSql && (listSql += whereSql);
        listSql += `order by ${api}.id desc limit ${escape(+offset)}, ${escape(+page_size)}`;
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
        const { app: { mysql, config }, ctx } = this;
        const prefix = config.mysqlConfig.prefix;
        data.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        // 添加的时候permission要创建一条数据，并且关联到api的permission_id上
        const res = await mysql.beginTransactionScope(async conn => {
            const permissionRes = await conn.insert(`${prefix}permission`, {
                type: 'api',
            });
            await conn.insert(`${prefix}api`, {
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
        const res = await this.app.mysql.update(`${prefix}api`, row, options);
        return res.affectedRows === 1;
    }
}
module.exports = ApiService;
