'use strict';


module.exports = () => {
    // 门户网站不用校验
    const reg = /^\/web\/.*/;

    return async function decrypt(ctx, next) {
        const { request: { path }, helper, query, request } = ctx;

        if (JSON.stringify(ctx.request.body) !== '{}') {
            console.log(request.body, 'data, rsa');
            let resData = request.body;
            // 处理门户不需要加密的情况
            if (!reg.test(path)) {
                let { data, rsa } = request.body;
                // 解密
                data = helper.decrypt(data);
                if (!helper.equal(rsa, JSON.stringify(data))) {
                    helper.render(422);
                    return;
                }
                resData = data;
            }
            // data中JSON对象的key值转换为下划线格式
            resData && helper.jsonTo_(resData);
            ctx.request.body = resData;
        }
        // query中JSON对象的key值转换为下划线格式
        query && helper.jsonTo_(query);
        await next();
    };
};
