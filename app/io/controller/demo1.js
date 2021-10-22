'use strict';

const Controller = require('egg').Controller;

class NspController extends Controller {
    // 测试 socket
    async index() {
        const { ctx: { socket, query, args } } = this;
        const message = args[0];
        console.log(query, 'ctx1');
        console.log(message, 'msg1');
        let num = 0;
        await socket.emit('resIndex', {
            name: '测试demo',
            num: ++num,
            ...message,
        });
    }
}

module.exports = NspController;
