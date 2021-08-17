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
        const authorization = request.header.token + '';
        if (authorization !== 'null' && authorization) {
            const token = authorization.substring(7);
            const twAuth = await helper.getRedis('tw_auth');
            const userInfo = await verifyToken(token, app.config.jwt.secret, redisConfig, ctx);
            // token过期 TokenExpiredError，无效的token JsonWebTokenError
            if (userInfo.name === 'TokenExpiredError' || userInfo.name === 'JsonWebTokenError') {
                helper.render(userInfo.name === 'TokenExpiredError' ? 904 : 901);
                // 因为jwt过期后无法拿到用户id，没有办法清除redis中的多余用户id
                // 根据redis token后面存储的过期时间，如果过期了，去除redis中多余的过期或者异常用户
                const timestamp = new Date().getTime() / 1000;
                for (const key in twAuth) {
                    const val = twAuth[key];
                    if (val.timestamp < timestamp) {
                        twAuth[key] && delete twAuth[key];
                        await helper.setRedis('tw_auth', twAuth);
                    }
                }
                return;
            }
            // 账号在其他地方登录
            if (twAuth[userInfo.id].token !== token) {
                helper.render(903);
                return;
            }
            ctx.locals.auth = {
                id: userInfo.id,
                name: userInfo.name,
            };
            await next();
        } else {
            helper.render(902);
        }
    };

    async function verifyToken(token, secret, redisConfig, ctx) {
        try {
            const userInfo = jwt.verify(token, secret, (err, decoded) => {
                console.log(err, decoded, 'err,data');
                if (err) {
                    // 'TokenExpiredError' //token过期
                    // 'JsonWebTokenError' //无效的token
                    return {
                        name: err.name,
                    };
                }
                return decoded;
            });
            // 过期时间还剩xxx秒的时候，如果用户在操作，自动增加过期时间并更换token
            const timestamp = new Date().getTime() / 1000;
            // 去除redis中因
            if (timestamp + redisConfig.updateExpireTime > userInfo.exp) {
                const data = {
                    id: userInfo.id,
                    name: userInfo.name,
                };
                const newToken = jwt.sign(data, secret, {
                    expiresIn: redisConfig.expireTime,
                });
                const twAuth = await ctx.helper.getRedis('tw_auth');
                twAuth[userInfo.id] = {
                    token: newToken,
                    timestamp: timestamp + redisConfig.expireTime,
                };
                await ctx.helper.setRedis('tw_auth', twAuth);
                ctx.set('token', newToken);
                return data;
            }
            return userInfo;
        } catch (e) {
            // console.error(e);
        }
        return;
    }
};
