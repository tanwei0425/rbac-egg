/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-04 19:28:42
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-22 09:03:09
 * @FilePath: /egg/admin/app/service/notes/articleRecord.js
 */
'use strict';
const Service = require('egg').Service;
class NotesClassificationService extends Service {
    // 获取列表所有文章访问记录
    async list(query) {
        const { app: { mysql, config } } = this;
        const { escape } = mysql;
        const prefix = config.mysqlConfig.prefix;
        const { current, page_size, title, classification, ip } = query;
        const offset = current * page_size - page_size;
        let whereSql = '';
        const columns = 'id, title, classification, author, ip, os, browser, created_at';
        let listSql = `select ${columns} from ${prefix}notes_article_record where 1=1 `;
        let countSql = `select count(*) as count from ${prefix}notes_article_record where 1=1 `;
        title && (whereSql += `and title like ${escape(`%${title}%`)} `);
        ip && (whereSql += `and ip like ${escape(`%${ip}%`)} `);
        if (classification) {
            classification.split().map(val => escape(val)).join();
            whereSql += `and classification in (${classification}) `;
        }
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
}
module.exports = NotesClassificationService;
