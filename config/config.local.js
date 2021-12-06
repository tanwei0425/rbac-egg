/*
 * @Descripttion: 开发环境配置
 * @Author: tanwei
 * @Date: 2020-07-01 17:21:17
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-20 13:49:05
 * @FilePath: /egg/admin/config/config.local.js
 */
'use strict';
/** @type Egg.EggPlugin */
module.exports = {
    mysqlConfig: {
        prefix: 'tw_',
    },
    security: {
        csrf: {
            enable: false,
        },
        domainWhiteList: ['http://localhost:3000'], // 域白名单
    },
    mysql: {
        // 单数据库信息配置
        client: {
            // host
            host: 'localhost',
            // 端口号
            port: '3306',
            // 用户名
            user: 'root',
            // 密码
            password: '123',
            // 数据库名
            database: 'tw-rbac',
            // 编码（富文本中表情是4个字节，mysql 默认的utf8 彪马最多3个字节）
            charset: 'utf8mb4',
        },
        // client: {
        //     // host
        //     host: '119.3.182.57',
        //     // 端口号
        //     port: '3306',
        //     // 用户名
        //     user: 'gjzck',
        //     // 密码
        //     password: '!@90OPKLmn',
        //     // 数据库名
        //     database: 'gjzck',
        // },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
    },
    redis: {
        client: {
            port: 6379, // Redis port
            host: '127.0.0.1', // Redis host
            password: '123',
            db: 0,
        },
    },
    // 验证码配置
    svgCaptchaConfig: {
        width: 90,
        height: 30,
        fontSize: 42,
        noise: 1,
        color: true,
        mathMin: 1,
        mathMax: 1,
        mathOperator: '+',
    },
    // 覆盖config.default.js 中间件，开发环境中不处理数据加密
    middleware: ['paramDataFormat', 'jwtVerify', 'authCheckApi'],
};
