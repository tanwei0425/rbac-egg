'use strict';
// eslint-disable-next-line no-unused-vars
module.exports = app => {

    // 在每一个客户端连接或者退出时发生作用，故而我们通常在这一步进行授权认证，对认证失败的客户端做出相应的处理
    return async (ctx, next) => {
        ctx.socket.emit('connectSattus', 'connection-connected');
        console.log('经过socket客户端连接或者退出中间价');
        await next();
    };
};
