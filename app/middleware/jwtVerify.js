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
        const { request, app, helper } = ctx;
        const { redisConfig } = ctx.app.config;
        const authorization = request.header.token + '';
        if (authorization !== 'null' && authorization) {
            const token = authorization.substring(7);
            const twAuth = await helper.getRedis('tw_auth');
            const userInfo = await verifyToken(token, app.config.jwt.secret);
            console.log(userInfo, 'userInfo');
            const targetId = userInfo ? userInfo.id : null;
            console.log(twAuth[targetId], 'twAuth[targetId]');
            // id丢失，登录信息有误
            if (!twAuth[targetId]) {
                helper.render(901);
                return;
            }
            // 账号在其他地方登录
            if (twAuth[targetId].token !== token) {
                helper.render(903);
                return;
            }

            const timestamp = Math.floor(new Date().getTime() / 1000);
            console.log(timestamp, 'timestamp');
            // 登录已过期
            if (timestamp > twAuth[targetId].timestamp) {
                delete twAuth[targetId];
                await helper.setRedis('tw_auth', twAuth);
                helper.render(904);
                return;
            }
            // 过期时间还剩xxx秒的时候，如果用户在操作，自动增加过期时间并更换token

            console.log(redisConfig.updateExpireTime, 'redisConfig.updateExpireTime');
            console.log(twAuth[targetId].timestamp, 'twAuth[targetId].timestamp');
            if (timestamp + redisConfig.updateExpireTime > twAuth[targetId].timestamp) {
                console.log(11112222333);
                const data = {
                    id: userInfo.id,
                    name: userInfo.name,
                    // exp: timestamp + redisConfig.expireTime,
                };
                const newToken = jwt.sign(data, app.config.jwt.secret, {
                    expiresIn: redisConfig.expireTime,
                });
                twAuth[targetId] = {
                    token: newToken,
                    timestamp: timestamp + redisConfig.expireTime,
                };
                await helper.setRedis('tw_auth', twAuth);
                ctx.set('token', newToken);
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
    async function verifyToken(token, secret) {
        return jwt.verify(token, secret, (err, decoded) => {
            console.log(err, decoded, 'err,data');
            if (err) {
                console.log(err, 'err');
                if (err.name === 'TokenExpiredError') { // token过期
                    console.log(11111);
                    const str = {
                        iat: 1,
                        exp: 0,
                        msg: 'token过期',
                    };
                    return str;
                } else if (err.name === 'JsonWebTokenError') { // 无效的token
                    console.log(2222);
                    const str = {
                        iat: 1,
                        exp: 0,
                        msg: '无效的token',
                    };
                    return str;
                }
            } else {
                return decoded;
            }
        });
    }
};
