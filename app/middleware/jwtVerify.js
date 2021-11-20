/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-04 12:23:59
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-17 14:09:47
 * @FilePath: /egg/admin/app/middleware/jwtVerify.js
 */
'use strict';
const jwt = require('jsonwebtoken');
module.exports = () => {
    return async function jwtVerify(ctx, next) {
        // 使用redis存储jwt的原因
        // 1.强制过期，jwt没有强行过期，利用redis强制过期
        // 2.账号单点登录，如果不存redis，多token 多个人可以登录，存redis可以强行踢出重复用户
        const { request, app, helper } = ctx;
        const { redisConfig } = ctx.app.config;
        const authorization = request.header.authorization + '';
        if (authorization) {
            const token = authorization.substring(7);
            const userInfo = await verifyToken(token, app.config.jwt.secret);
            // token过期 TokenExpiredError，无效的token JsonWebTokenError
            if (userInfo.name === 'TokenExpiredError' || userInfo.name === 'JsonWebTokenError') {
                helper.render(userInfo.name === 'TokenExpiredError' ? 904 : 901);
                return;
            }
            // 获取redis用户信息
            const RedisKey = userInfo.id + userInfo.username;
            const redisInfo = await helper.getRedis(RedisKey);
            // 账号在其他地方登录
            if (redisInfo.token !== token) {
                helper.render(903);
                return;
            }
            // 过期时间还剩xxx秒的时候，如果用户在操作，自动增加过期时间并更换token
            const timestamp = new Date().getTime() / 1000;
            // 去除redis中因
            if (timestamp + redisConfig.updateExpireTime > userInfo.exp) {
                const newToken = jwt.sign({
                    id: userInfo.id,
                    username: userInfo.username,
                }, app.config.jwt.secret, {
                    expiresIn: redisConfig.expireTime,
                });
                // 删除redis
                await helper.delRedis(RedisKey);
                // 只更换token，其余保持不变
                await helper.setRedis(RedisKey, {
                    ...redisInfo,
                    token: newToken,
                }, redisConfig.expireTime);
                ctx.set('authorization', newToken);
            }
            ctx.locals.auth = {
                id: userInfo.id,
                username: userInfo.username,
            };
            await next();
        } else {
            helper.render(902);
        }
    };

    async function verifyToken(token, secret) {
        try {
            const userInfo = jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    // 'TokenExpiredError' //token过期
                    // 'JsonWebTokenError' //无效的token
                    return {
                        name: err.name,
                    };
                }
                return decoded;
            });
            return userInfo;
        } catch (e) {
            // console.error(e);
        }
        return;
    }
};
