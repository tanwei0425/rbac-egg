/*
 * @Descripttion:utility 函数
 * @Author: tanwei
 * @Date: 2020-07-04 17:35:29
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-22 17:12:29
 * @FilePath: /egg/admin/app/extend/helper.js
 */
'use strict';
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { codeStatus } = require('./constants');
const NodeRSA = require('node-rsa');
const CryptoJS = require('crypto-js');
const xlsx = require('node-xlsx');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

const privatePem = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQCTbXZ91+43DNmT5ph+o69UGmgSYr8g2peAOAyM62S2txT4xaFj
AkOEjNebw6rcwJZSbu+l/YOI8+EW+TfNLqie4nPg3eqHRDjScJFq81xblh6afKSo
wAMfCaZWL8kUdOZnOVB47LGhImKYbfwo82yygH0U4+tnojt+cTyKZcZXuwIDAQAB
AoGABSbEBy2uYzoNuD9MgNBTZgruLAZLS2iX9qD+v0XSZRgMoYy2UPFZTp5lQkoa
BFCub/70XMZ4/CYZbWYT7xV8StL9TqNgTeyoJl3fUwl7KtHHpD2jKowk5OHdNilj
legHLsYf0VIMGxTQp7xRhuxn/7FK+x6OiPv3tlOx/+l2FHECQQD4hGmgEK3SGY6Z
OltQ1GBV1/Z2sOjXcVeysZW2NnRSywtWidUOWWkxM9VwpZkHZfSWSebu5Aoodk8L
2j9xMcg/AkEAl93YMwODe7pQzm5vdgQJAdhpv9BnOVg0I4WhGz/6ugUigMgLLY5s
KDaGg5GsGcHeMI11xzu7/n/XmFLo3RrxhQJARzXR+l6tIAXYuYliPyAL1q1CXzJE
Fe/RXE/MgWDLJiouPobSOQFfxgx/PX8GAXuygRn+BTfsvTlhXxkTksDcCwJBAIwl
7p8lXvGPv4LB55rBno5VaUHa0WfaPkOJzmOXZ4rDslOmSKqCBM4Xg4tno6shfirQ
YSC7v4Hd+NhZqwxhEQECPz9Dad2mosSFtFz4pEg+BGakjxOAwSXLT8moOniJxcZM
7UTugiuih9q6HD1I9hoxT9QH2GFuy14OD7W+EoY0aQ==
-----END RSA PRIVATE KEY-----`;
const privateKey = new NodeRSA(privatePem);
privateKey.setOptions({ encryptionScheme: 'pkcs1' });

module.exports = {
    // 密码加密
    addSaltPassword(pwd) {
        const { config } = this.app;
        const md5 = crypto.createHash('md5');
        const pwdCrypto = md5.update(pwd + config.pwdCryptoKey).digest('hex');
        return pwdCrypto;
    },
    // redisKey加密
    redisKeySalt(key) {
        const { config } = this.app;
        const md5 = crypto.createHash('md5');
        const redisKeyCrypto = md5.update(key + config.redisConfig.redisKeySecret).digest('hex');
        return redisKeyCrypto;
    },
    // 设置登录token
    async loginToken(data, expires) {
        const { config } = this.app;
        const token = jwt.sign(data, config.jwt.secret, {
            expiresIn: expires,
        });
        const RedisKey = `user:${data.id}`;
        await this.setRedis(RedisKey, {
            token,
        }, expires);
        return token;
    },

    // 统一处理返回body信息
    render(code, data = {}, message) {
        const { ctx } = this;
        // 把返回的所有数据_链接的转为小驼峰
        this.jsonToHump(data);
        ctx.body = {
            code,
            data,
            message: message || codeStatus[code],
        };
        ctx.status = 200;
        return;
    },
    // json对象的key值_转为小驼峰
    jsonToHump(obj) {
        if (obj instanceof Array) {
            obj.forEach(v => {
                this.jsonToHump(v);
            });
        } else if (obj instanceof Object) {
            Object.keys(obj).forEach(key => {
                const newKey = this._toHump(key);
                if (newKey !== key) {
                    obj[newKey] = obj[key];
                    delete obj[key];
                }
                this.jsonToHump(obj[newKey]);
            });
        }
    },
    // 字符串的下划线格式转驼峰格式
    _toHump(name) {
        return name.replace(/\_(\w)/g, (all, letter) => letter.toUpperCase());
    },

    // JSON对象的key值转换为下划线格式
    jsonTo_(obj) {
        if (obj instanceof Array) {
            obj.forEach(v => {
                this.jsonTo_(v);
            });
        } else if (obj instanceof Object) {
            Object.keys(obj).forEach(key => {
                const newKey = this.humpTo_(key);
                if (newKey !== key) {
                    obj[newKey] = obj[key];
                    delete obj[key];
                }
                this.jsonTo_(obj[newKey]);
            });
        }
    },
    // 字符串的驼峰格式转下划线格式
    humpTo_(s) {
        return s.replace(/([A-Z])/g, '_$1').toLowerCase();
    },

    // 平铺转树
    toTree(data, id, array) {
        const newArr = data.filter(item => item.pid === id);
        newArr.forEach(item => {
            const result = [];
            const children = this.toTree(data, item.id, result);
            if (children && children.length > 0) {
                item.children = children;
            }
            delete item.pid;
            array.push(item);
        });
        return array;
    },
    // 获取
    async getRedis(key) {
        const { redis } = this.app;
        // 统一给redis key 加盐
        // const keySalt = this.redisKeySalt(key);
        let data = await redis.get(key);
        if (!data) return {};
        data = JSON.parse(data);
        return data;
    },
    // 设置
    async setRedis(key, value, seconds) {
        const { redis } = this.app;
        // 统一给redis key 加盐
        // const keySalt = this.redisKeySalt(key);
        value = JSON.stringify(value);
        if (!seconds) {
            await redis.set(key, value);
        } else {
            // 设置有效时间
            await redis.set(key, value, 'EX', seconds);
        }
    },
    // 更新过期时间
    async expireRedis(key, time) {
        const { redis } = this.app;
        // 统一给redis key 加盐
        const keySalt = this.redisKeySalt(key);
        let data = await redis.expire(keySalt, time);
        if (!data) return;
        data = JSON.parse(data);
        return data;
    },
    // 删除单个
    async delRedis(key) {
        const { redis } = this.app;
        // 统一给redis key 加盐
        // const keySalt = this.redisKeySalt(key);
        const result = await redis.del(key);
        return result;
    },
    // 清空redis
    async flushallRedis() {
        const { redis } = this.app;
        redis.flushall();
        return;
    },
    // 查看key的过期时间
    async ttlRedis(key) {
        const { redis } = this.app;
        // 统一给redis key 加盐
        // const keySalt = this.redisKeySalt(key);
        return redis.ttl(key) || 0;
    },
    // 对比加密数据
    equal(rsa, data) {
        const sha = privateKey.decrypt(rsa, 'utf8');
        const hash = CryptoJS.SHA256(data);
        const sha2 = hash.toString(CryptoJS.enc.Hex);
        return sha === sha2;
    },
    // 数据加密
    encrypt(content) {
        const encrypted = CryptoJS.AES.encrypt(content, this.ctx.app.config.secret);
        return encrypted.toString();
    },
    // 数据解密
    decrypt(content) {
        const bytes = CryptoJS.AES.decrypt(content, this.ctx.app.config.secret);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    },
    async exportFile({ data, filename, options = [], saveXlsx = false, directoryPath = './' }) {
        // 因为插件问题，如果使用xlsx样式无效，请安装xlsx-style，
        // 并且修改/node_modules/node-xlsx/lib/index.js 中
        // var _xlsx = _interopRequireDefault(require("xlsx")) 改为 var _xlsx = _interopRequireDefault(require('xlsx-style'));
        const { ctx } = this;
        const buffer = xlsx.build(data, options);
        const newFilename = `${encodeURIComponent(filename)} ${moment(Date.now()).format('YYYY-MM-DD')}`;
        // 存储在本地
        if (saveXlsx) {
            const filePath = path.resolve(__dirname, '../public/export/', directoryPath, `${newFilename}.xlsx`);
            fs.writeFileSync(filePath, buffer, 'utf-8');
        }
        // 返回流文件
        ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8');
        ctx.set('Content-disposition', `attachment;filename=${newFilename}.xlsx`);

        // 直接返回二进制，或者读取刚才存储的文件返回也行
        // return fs.createReadStream(filePath, 'base64'); // 读取本地保存的文件返回
        return buffer.toString('base64');
    },
};
