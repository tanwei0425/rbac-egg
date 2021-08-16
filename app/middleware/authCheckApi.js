/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-04 12:23:59
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-17 14:09:47
 * @FilePath: /egg/admin/app/middleware/authCheckApi.js
 */
'use strict';
module.exports = () => {
    // ...等待处理接口权限问题
    return async function authCheckApi(ctx, next) {
        // const { request, app, helper } = ctx;
        // const { redisConfig } = ctx.app.config;
        // const authorization = request.header.token + '';
        await next();
    };
};
