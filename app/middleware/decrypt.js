'use strict';

module.exports = () => {
    return async function decrypt(ctx, next) {
        const { helper, query, request } = ctx;
        if (JSON.stringify(ctx.request.body) !== '{}') {

            let { data, rsa } = request.body;
            // 解密
            data = helper.decrypt(data);
            if (!helper.equal(rsa, JSON.stringify(data))) {
                helper.render(422);
                return;
            }

            // data中JSON对象的key值转换为下划线格式
            data && helper.jsonTo_(data);
            ctx.request.body = data;
        }
        // query中JSON对象的key值转换为下划线格式
        query && helper.jsonTo_(query);
        await next();
    };
};
