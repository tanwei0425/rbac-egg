/*
 * @Descripttion: 通用配置
 * @Author: tanwei
 * @Date: 2020-07-01 13:58:10
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-16 14:33:02
 * @FilePath: /egg/admin/config/config.default.js
 */
/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    security: {
      csrf: {
        enable: false,
      },
      domainWhiteList: ['https://admin.hellotanwei.cn'], // 域白名单
    },
    jwt: {
      secret: 'tw_fight_@666', // 自定义 jwt 的加密条件字符串
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    },
  };


  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1593583038799_269';
  config.pwdCryptoKey = 'tw_@_666_hehe';
  config.initPassword = '123456';
  /**
   * 在这里配置的中间件默认是全局的
   * enable：控制中间件是否开启。
   * match：设置只有符合某些规则的请求才会经过这个中间件。
   * ignore：设置符合某些规则的请求不经过这个中间件。
   */
  config.middleware = ['decrypt', 'paramDataFormat', 'jwtVerify', 'authCheckApi'];

  // 数据加密解密私钥
  config.secret = 'ViQmKzCqtGoZwvqf4wRzfh26WBbR36YmwuLKkJGmT55';

  config.jwtVerify = {
    enable: true,
    ignore: ['/admin/v1/auth/signIn', '/admin/v1/captcha'],
  };
  config.redisConfig = {
    expireTime: 7200, // jwt、redis过期时间(s)
    updateExpireTime: 1800, // jwt、redis如果用户一直在操作，距离给redis的key续费的时间(s) //30分钟
  };

  // 验证码配置
  config.svgCaptchaConfig = {
    width: 90,
    height: 30,
    fontSize: 42,
    noise: 4,
    color: true,
    mathMin: 1,
    mathMax: 19,
    mathOperator: '+/-',
  };

  config.proxy = true; // 开启
  // config.maxProxyCount = 1; //开启的数量

  // 日志配置
  config.logger = {
    outputJSON: true,
  };
  // 自定义日志
  config.customLogger = {
    // 登录日志
    loginLogger: {
      file: path.join(appInfo.root, 'logs/login-logger/login.log'),
    },
    // 授权接口操作日志
    apisLogger: {
      file: path.join(appInfo.root, 'logs/apis-logger/apis.log'),
    },
  };

  // 全球IP归属地查询AppCode
  config.ipGetAddressAppCode = '75dfd88407ca48aebf9491269fd796bb';
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
