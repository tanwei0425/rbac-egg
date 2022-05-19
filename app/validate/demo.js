/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-01 13:58:10
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-23 11:15:21
 * @FilePath: /egg/admin/app/controller/notes/article.js
 */
'use strict';

module.exports = app => {
    const { validator } = app;
    // 添加自定义参数校验规则
    // type article:description
    validator.addRule('article:description', (rule, value) => {
        if (!value) {
            return '描述不能为空';
        }
        if (typeof value !== 'string') {
            return '描述为字符串';
        }
    });
};
