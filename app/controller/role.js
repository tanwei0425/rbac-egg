/*
 * @Descripttion:
 * @Author: tanwei
 * @Date: 2020-07-01 13:58:10
 * @LastEditors: tanwei
 * @LastEditTime: 2020-07-23 11:15:21
 * @FilePath: /egg/admin/app/controller/role.js
 */
'use strict';

const Controller = require('egg').Controller;
class RoleController extends Controller {
    async show() {
        const { ctx: { service, helper, params } } = this;
        const res = await service.role.show({ id: params.id });
        helper.render(200, res);
    }
    async all() {
        const { ctx: { service, helper } } = this;
        const where = {
            status: '1',
            is_delete: 0,
        };// WHERE 条件
        const columns = ['id', 'name'];
        const res = await service.role.index(where, columns);
        helper.render(200, res);
    }
    async index() {
        const { ctx: { service, helper, query } } = this;
        const res = await service.role.list(query);
        helper.render(200, res);
    }
    async create() {
        const { ctx: { service, helper, request } } = this;
        const body = request.body;
        const showRes = await service.role.show({ name: body.name, is_delete: 0 });
        if (showRes) {
            helper.render(401, {}, '角色名称已存在');
            return;
        }
        const res = await service.role.create(body);
        helper.render(res ? 200 : 501, {});
    }
    async update() {
        const { ctx: { service, helper, params, request } } = this;
        const body = request.body;
        const showRes = await service.role.show({ name: body.name, is_delete: 0 });
        if (showRes && `${showRes.id}` !== `${params.id}`) {
            helper.render(401, {}, '角色名称已存在');
            return;
        }
        const options = {
            where: { id: params.id },
        };
        const res = await service.role.update(body, options);
        helper.render(res ? 200 : 501, {});
    }
    async destroy() {
        const { ctx: { service, helper, params } } = this;
        const row = {
            is_delete: 1,
        };
        const options = {
            where: { id: params.id },
        };
        const res = await service.role.update(row, options);
        helper.render(res ? 200 : 501, {});
    }
    async getAssociateUser() {
        const { ctx: { service, helper, params } } = this;
        const where = {
            role_id: params.id,
        };
        const columns = ['user_id'];
        const userRoleRes = await service.userRole.index(where, columns);
        let res = [];
        if (userRoleRes && userRoleRes.length > 0) {
            const userIdArr = userRoleRes && userRoleRes.map(val => val.user_id);
            // 查询用户
            const userWhere = {
                status: '1',
                is_delete: 0,
                id: [...userIdArr],
            };// WHERE 条件
            const userColumns = ['id'];
            const userRes = await service.user.index(userColumns, userWhere);
            res = userRes ? userRes.map(val => val.id) : [];
        }
        helper.render(200, res);
    }
    async putAssociateUser() {
        const { ctx: { service, helper, params, request } } = this;
        const body = request.body;
        const where = {
            role_id: params.id,
        };
        const columns = ['user_id'];
        const userRoleRes = await service.userRole.index(where, columns);
        const userIdArr = userRoleRes && userRoleRes.map(val => val.user_id);
        const res = await service.userRole.putAssociateUser({
            deleteData: {
                user_id: userIdArr,
                role_id: +params.id,
            },
            insertData: {
                role_id: +params.id,
                associateUser: body.associate_user,
            },
        });
        helper.render(res ? 200 : 501, {});
    }
    async getRoleAuthDetail() {
        const { ctx: { service, helper, params } } = this;
        const rolePermissionWhere = {
            role_id: params.id,
        };
        const rolePermissionColumns = ['permission_id'];
        const rolePermissionRes = await service.rolePermission.index(rolePermissionWhere, rolePermissionColumns);
        if (!rolePermissionRes || rolePermissionRes.length < 1) {
            helper.render(200, []);
            return;
        }
        const allPermission = rolePermissionRes.map(val => val.permission_id);
        const permissionRes = await service.permission.index({
            id: allPermission,
        });
        if (!permissionRes || permissionRes.length < 1) {
            helper.render(200, []);
            return;
        }
        const menus = [];
        const elements = [];
        const apis = [];
        permissionRes.forEach(val => {
            if (val.type === 'menu') menus.push(val.id);
            if (val.type === 'element') elements.push(val.id);
            if (val.type === 'api') apis.push(val.id);
        });
        const data = {
            menus,
            elements,
            apis,
        };
        helper.render(200, data);
    }
    async setRoleAuth() {
        const { ctx: { service, helper, params, request } } = this;
        const body = request.body;
        const where = {
            role_id: params.id,
        };
        const columns = ['permission_id'];
        const rolePermissionRes = await service.rolePermission.index(where, columns);
        const permissionIdArr = rolePermissionRes && rolePermissionRes.map(val => val.permission_id);
        const res = await service.rolePermission.setRoleAuth({
            deleteData: {
                permission_id: permissionIdArr,
            },
            insertData: {
                role_id: +params.id,
                data: [...body.menus, ...body.elements, ...body.apis],
            },
        });
        helper.render(res ? 200 : 501, {});
    }
}

module.exports = RoleController;
