/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-04 12:23:59
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-17 14:09:47
 * @FilePath: /egg/admin/app/middleware/authCheckApi.js
 */
'use strict';
// 不需要验证权限的接口,比如登录，验证码，获取用户信息这些只要是用户就需要有的接口
const whiteUrl = [
    '/admin/v1/captcha', // 登录验证码
    '/admin/v1/auth/signIn', // 登录
    '/admin/v1/auth/user', // 获取用户信息
    '/admin/v1/auth/menu', // 获取用户菜单
    '/admin/v1/dict', // 获取数据字典
    '/admin/v1/auth/signOut', // 登出
    '/admin/v1/updatePassword', // 修改密码
    '/admin/v1/baby', // 门户宝宝名称
];
// 匹配/:id 和 /8 等情况
function RegExpUrl(url1, url2) {
    const reg = url1.replace(/:\w+\/?/, '(.+/?)');
    const regex = new RegExp(`^${reg}$`);
    return regex.test(url2);
}

module.exports = () => {
    // ...等待处理接口权限问题
    return async function authCheckApi(ctx, next) {
        const { request: { path, method }, locals, helper } = ctx;
        if (
            whiteUrl.includes(path) ||
            (path.indexOf('/admin/v1/baby/') >= 0 && method === 'DELETE') // 暂时处理delete情况
        ) {
            await next();
        } else {
            const userInfo = locals.auth;
            const RedisKey = userInfo.id + userInfo.username;
            const redisInfo = await helper.getRedis(RedisKey);
            const apisAuth = redisInfo && redisInfo.apis ? redisInfo.apis : [];
            const target = apisAuth.findIndex(val => val.method === method && RegExpUrl(val.path, path));
            if (target === -1) {
                helper.render(913);
                return;
            }

            // 自定义日志(权限接口操作日志) 异步不阻塞
            ctx.service.common.index.customLogger({
                name: 'apisLogger',
                dataKey: 't-apis',
                data: {
                    status: target === -1 ? '失败' : '成功',
                },
            });
            await next();
        }
    };
};
