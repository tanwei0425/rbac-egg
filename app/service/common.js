/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-20 14:58:23
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-20 15:03:39
 * @FilePath: /egg/admin/app/service/common.js
 */
'use strict';
const Service = require('egg').Service;
class CommonService extends Service {

    // 退出登录
    async loginOut() {
        const { ctx: { helper, locals } } = this;
        // 清除redis
        const userInfo = locals.auth;
        console.log(userInfo, 'userInfo');
        const result = await helper.delRedis(userInfo.id + userInfo.username);
        console.log(result, 'result');
        return result;
    }
}
module.exports = CommonService;
