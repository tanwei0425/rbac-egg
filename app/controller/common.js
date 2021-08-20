/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-01 15:44:23
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-21 18:16:40
 * @FilePath: /egg/admin/app/controller/login.js
 */
'use strict';
const svgCaptcha = require('svg-captcha');
const { v4: uuidv4 } = require('uuid');
const Controller = require('egg').Controller;
class CommonController extends Controller {

    // 修改密码
    async updatePassword() {
        const { ctx } = this;
        const { password, newPassword } = ctx.request.body;
        const userRes = await ctx.service.user.show({ id: ctx.locals.auth.id });
        const oldPwdCrypto = ctx.helper.addSaltPassword(password);
        if (userRes && userRes.password !== oldPwdCrypto) {
            // 密码错误
            ctx.helper.render(907);
            return;
        }
        const newPwdCrypto = ctx.helper.addSaltPassword(newPassword);
        if (oldPwdCrypto === newPwdCrypto) {
            // 旧密码和新密码一致
            ctx.helper.render(909);
            return;
        }
        const res = await ctx.service.user.update(
            {
                password: newPwdCrypto,
            },
            {
                where: { id: ctx.locals.auth.id },
            }
        );
        ctx.helper.render(res ? 200 : 501);
    }

    // 获取用户数据字典
    async dict() {
        const { ctx } = this;
        const res = await ctx.service.dict.index();
        const obj = {};
        if (res) {
            res.forEach(val => {
                const code = val.code;
                const value = eval(val.value);
                obj[code] = value;
            });
        }
        ctx.helper.render(200, obj);
    }
    // 验证码
    async captcha() {
        const { ctx: { helper, query, app } } = this;
        const prevUuid = query.uuid;
        // create 默认(传统的图形验证码)
        // const captcha = svgCaptcha.create({
        //     width: 90,
        //     height: 30,
        //     noise: 4,
        //     fontSize: 42,
        //     color: true,
        // });
        // createMathExpr 算术验证码
        const captcha = svgCaptcha.createMathExpr(app.config.svgCaptchaConfig);

        const uuid = uuidv4();
        const timestamp = new Date().getTime();
        const twCaptcha = await helper.getRedis('tw_captcha');
        twCaptcha[prevUuid] && delete twCaptcha[prevUuid];
        twCaptcha[uuid] = {
            code: captcha.text,
            timestamp: timestamp + 10 * 60 * 1000,
        };
        const newCaptcha = {};
        for (const key in twCaptcha) {
            if (twCaptcha[key].timestamp > timestamp) {
                newCaptcha[key] = twCaptcha[key];
            }
        }
        await helper.setRedis('tw_captcha', newCaptcha);
        const data = {
            captcha: captcha.data,
            uuid,
        };
        helper.render(200, data);
    }

    // 设置用户主题
    async thmemUpdate() {
        const { ctx } = this;
        const body = ctx.request.body;
        if (!body.skin) {
            ctx.helper.render(400);
            return;
        }
        const resGet = await ctx.service.systemTheme.show({ user_id: ctx.locals.auth.id });
        if (resGet && resGet.id) {
            const res = await ctx.service.systemTheme.update({ id: resGet.id, ...body });
            if (!res) {
                ctx.helper.render(501);
                return;
            }
        } else {
            const res = await ctx.service.systemTheme.create({ user_id: ctx.locals.auth.id, ...body });
            console.log(res, 'res');
            if (!res) {
                ctx.helper.render(501);
                return;
            }
        }
        ctx.helper.render(200);
    }

    // 获取所有在用的菜单、元素、接口
    async allMenuElementApi() {
        const { ctx: { service, helper } } = this;
        const columns = ['id', 'name', 'menu_id', 'permission_id'];
        const menuColumns = ['id', 'pid', 'name', 'permission_id'];
        const where = {
            is_delete: 0,
            status: '1',
        };
        const menuRes = await service.menu.index(menuColumns, where);
        const elementRes = await service.element.index(columns, where);
        const apiRes = await service.api.index(columns, where);

        // 过滤菜单禁用的元素和接口
        const menuIdArr = menuRes.map(val => val.id);
        // val.menu_id === 0 公共的
        const actionElementRes = elementRes.filter(val => menuIdArr.includes(val.menu_id) || val.menu_id === 0);
        const actionapiRes = apiRes.filter(val => menuIdArr.includes(val.menu_id) || val.menu_id === 0);
        const data = {
            menus: menuRes,
            elements: actionElementRes,
            apis: actionapiRes,
        };
        helper.render(200, data);
    }
}

module.exports = CommonController;
