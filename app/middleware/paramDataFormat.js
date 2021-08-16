'use strict';

module.exports = () => {
    return async function decrypt(ctx, next) {
        const { helper, query, request: { body } } = ctx;
        // data中JSON对象的key值转换为下划线格式
        body && helper.jsonTo_(body);
        // query中JSON对象的key值转换为下划线格式
        query && helper.jsonTo_(query);
        await next();
    };
};
