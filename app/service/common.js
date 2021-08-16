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
        const auth = locals.auth;
        const twAuth = await helper.getRedis('tw_auth');
        twAuth[auth.id] && delete twAuth[auth.id];
        await helper.setRedis('tw_auth', twAuth);
        return true;
    }
}
module.exports = CommonService;
