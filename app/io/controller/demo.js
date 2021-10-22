'use strict';

const Controller = require('egg').Controller;

class NspController extends Controller {
    // 测试 socket
    async index() {
        const { ctx: { socket, query, args } } = this;
        const message = args[0];
        console.log(query, 'ctx');
        console.log(message, 'msg');
        let num = 0;
        await socket.emit('resIndex', {
            name: '测试',
            num: ++num,
            ...message,
        });
    }
}

module.exports = NspController;
