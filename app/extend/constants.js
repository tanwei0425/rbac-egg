/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-17 13:53:41
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-20 14:51:19
 * @FilePath: /egg/admin/app/extend/constants.js
 */
'use strict';
module.exports = {
    codeStatus: {
        200: '操作成功',
        // 客户端错误
        400: '入参异常或缺少参数',
        401: '名称已存在',
        422: '参数错误',
        // 服务器错误
        500: '服务器错误',
        501: '数据库错误',
        // 账号信息错误
        901: '登录信息异常，请重新登陆',
        902: '请登录后再进行操作',
        903: '您的账号已在其他地方登录',
        904: '登录状态已过期,请重新登录',
        905: '验证码错误',
        906: '密码错误',
        907: '旧密码错误',
        908: '新密码两次输入不一致',
        909: '新密码不能和旧密码相同',
        910: '账号不存在',
        911: '获取用户关联信息错误',
        912: '获取用户信息失败',
        913: '没有访问该接口的权限',
        914: '您的账号已被禁用，请联系管理员',
        // 200: '请求成功。客户端向服务器请求数据，服务器返回相关数据',
        // 201: '资源创建成功。客户端向服务器提供数据，服务器创建资源',
        // 202: '请求被接收。但处理尚未完成',
        // 204: '客户端告知服务器删除一个资源，服务器移除它',
        // 206: '请求成功。但是只有部分回应',
        // 400: '请求无效。数据不正确，请重试',
        // 401: '请求没有权限。缺少API token，无效或者超时',
        // 403: '用户得到授权，但是访问是被禁止的。',
        // 404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
        // 406: '请求失败。请求头部不一致，请重试',
        // 410: '请求的资源被永久删除，且不会再得到的。',
        // 422: '请求失败。请验证参数',
        // 500: '服务器发生错误，请检查服务器。',
        // 502: '网关错误。',
        // 503: '服务不可用，服务器暂时过载或维护。',
        // 504: '网关超时。',
    },
};
