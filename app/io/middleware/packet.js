
'use strict';

// eslint-disable-next-line no-unused-vars
module.exports = app => {

    // 作用于每一个数据包（每一条消息）；在生产环境中，通常用于对消息做预处理，又或者是对加密消息的解密等操作
    return async (ctx, next) => {
        ctx.socket.emit('res', 'packet-connected');
        console.log('经过socket每一条消息中间件');
        await next();
    };
};
