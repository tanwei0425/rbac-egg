/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80020
 Source Host           : localhost:3306
 Source Schema         : tw-rbac

 Target Server Type    : MySQL
 Target Server Version : 80020
 File Encoding         : 65001

 Date: 19/12/2021 18:35:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tw_api
-- ----------------------------
DROP TABLE IF EXISTS `tw_api`;
CREATE TABLE `tw_api` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '接口名称',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '接口路径',
  `method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '接口方法',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '描述',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '状态',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '修改时间',
  `menu_id` int unsigned NOT NULL DEFAULT '0' COMMENT '0表示公共接口',
  `permission_id` int DEFAULT NULL,
  `is_delete` tinyint unsigned NOT NULL DEFAULT '0' COMMENT '1删除0未删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of tw_api
-- ----------------------------
BEGIN;
INSERT INTO `tw_api` VALUES (2, '修改用户', '/admin/v1/user/:id', 'PUT', '', '1', '2019-07-29 07:44:31', '2019-07-30 08:32:03', 5, 11, 0);
INSERT INTO `tw_api` VALUES (5, '添加用户', '/admin/v1/user', 'POST', '', '1', '2019-07-29 08:02:22', '2019-07-30 08:31:55', 5, 15, 0);
INSERT INTO `tw_api` VALUES (6, '获取用户列表', '/admin/v1/user', 'GET', '公共接口', '1', '2019-07-29 08:36:06', '2019-07-30 08:32:41', 5, 16, 0);
INSERT INTO `tw_api` VALUES (7, '获取所有地区', '/admin/v1/all/region', 'GET', '', '1', '2019-07-29 10:22:14', '2021-08-15 16:44:22', 0, 18, 1);
INSERT INTO `tw_api` VALUES (8, '获取用户详情', '/admin/v1/user/:id', 'GET', '', '1', '2019-07-30 08:33:05', '2019-07-30 08:33:05', 5, 31, 0);
INSERT INTO `tw_api` VALUES (9, '获取所有用户', '/admin/v1/allUser', 'GET', '', '1', '2019-07-30 08:33:56', '2021-11-26 16:53:50', 5, 32, 0);
INSERT INTO `tw_api` VALUES (10, '获取角色列表', '/admin/v1/role', 'GET', '', '1', '2019-07-30 08:34:44', '2019-07-30 08:34:44', 2, 33, 0);
INSERT INTO `tw_api` VALUES (11, '获取角色详情', '/admin/v1/role/:id', 'GET', '', '1', '2019-07-30 08:35:11', '2019-07-30 08:35:11', 2, 34, 0);
INSERT INTO `tw_api` VALUES (12, '添加角色', '/admin/v1/role', 'POST', '', '1', '2019-07-30 08:35:22', '2019-07-30 08:35:22', 2, 35, 0);
INSERT INTO `tw_api` VALUES (13, '修改角色', '/admin/v1/role/:id', 'PUT', '', '1', '2019-07-30 08:35:35', '2019-07-30 08:35:35', 2, 36, 0);
INSERT INTO `tw_api` VALUES (14, '获取所有角色', '/admin/v1/allRole', 'GET', '', '1', '2019-07-30 08:37:52', '2021-11-26 16:57:23', 0, 37, 0);
INSERT INTO `tw_api` VALUES (15, '关联用户', '/admin/v1/role/associateUser/:id', 'PUT', '', '1', '2019-07-30 08:38:22', '2021-08-15 15:27:24', 2, 38, 0);
INSERT INTO `tw_api` VALUES (16, '获取角色授权详情', '/admin/v1/role/auth/:id', 'GET', '', '1', '2019-07-30 08:40:13', '2021-08-15 15:29:08', 2, 39, 0);
INSERT INTO `tw_api` VALUES (17, '角色授权', '/admin/v1/role/auth/:id', 'PUT', '', '1', '2019-07-30 08:40:55', '2021-08-15 15:28:17', 2, 40, 0);
INSERT INTO `tw_api` VALUES (18, '删除用户', '/admin/v1/user/:id', 'DELETE', '', '1', '2019-07-30 10:54:32', '2019-07-30 10:54:32', 5, 43, 0);
INSERT INTO `tw_api` VALUES (19, '重置密码', '/admin/v1/reloadPwdUser/:id', 'GET', '', '1', '2019-07-30 15:22:55', '2021-11-26 16:53:39', 5, 45, 0);
INSERT INTO `tw_api` VALUES (20, '删除角色', '/admin/v1/role/:id', 'DELETE', '', '1', '2019-07-30 21:33:34', '2019-07-30 21:33:34', 2, 55, 0);
INSERT INTO `tw_api` VALUES (21, '获取公司列表', '/admin/v1/company', 'GET', '', '1', '2019-10-14 12:52:32', '2021-08-15 15:54:28', 10, 61, 1);
INSERT INTO `tw_api` VALUES (22, '获取公司详情', '/admin/v1/company/:id', 'GET', '', '1', '2019-10-14 12:52:46', '2021-08-15 15:54:25', 10, 62, 1);
INSERT INTO `tw_api` VALUES (23, '新增公司', '/admin/v1/company', 'POST', '', '1', '2019-10-14 12:53:02', '2021-08-15 15:54:22', 10, 63, 1);
INSERT INTO `tw_api` VALUES (24, '修改公司', '/admin/v1/company/:id', 'PUT', '', '1', '2019-10-14 12:53:15', '2021-08-15 15:54:16', 10, 64, 1);
INSERT INTO `tw_api` VALUES (25, '删除公司', '/admin/v1/company/:id', 'DELETE', '', '1', '2019-10-14 12:53:26', '2021-08-15 15:54:13', 10, 65, 1);
INSERT INTO `tw_api` VALUES (26, '获取地区所有公司', '/admin/v1/all/company', 'GET', '', '1', '2019-10-14 14:13:25', '2021-08-15 15:54:10', 0, 66, 1);
INSERT INTO `tw_api` VALUES (27, '获取员工列表', '/admin/v1/staff', 'GET', '', '1', '2019-10-14 14:55:23', '2021-08-15 15:54:07', 11, 70, 1);
INSERT INTO `tw_api` VALUES (28, '获取员工详情', '/admin/v1/staff/:id', 'GET', '', '1', '2019-10-14 14:55:38', '2021-08-15 15:54:03', 11, 71, 1);
INSERT INTO `tw_api` VALUES (29, '新增员工', '/admin/v1/staff', 'POST', '', '1', '2019-10-14 14:55:49', '2021-08-15 15:53:59', 11, 72, 1);
INSERT INTO `tw_api` VALUES (30, '修改员工', '/admin/v1/staff/:id', 'PUT', '', '1', '2019-10-14 14:56:02', '2021-08-15 15:53:55', 11, 73, 1);
INSERT INTO `tw_api` VALUES (31, '删除员工', '/admin/v1/staff/:id', 'DELETE', '', '1', '2019-10-14 14:56:17', '2021-08-15 15:53:52', 11, 74, 1);
INSERT INTO `tw_api` VALUES (32, '上传图片', '/admin/v1/upload/picture', 'POST', '', '1', '2019-10-16 13:10:27', '2021-08-15 15:53:48', 0, 75, 1);
INSERT INTO `tw_api` VALUES (33, 'EXCEL导入', '/admin/v1/upload/excel/import/company', 'POST', '', '1', '2019-10-18 10:00:44', '2021-08-15 15:53:45', 10, 77, 1);
INSERT INTO `tw_api` VALUES (34, '导出员工', '/admin/v1/export/staff', 'GET', '', '1', '2019-10-31 10:22:58', '2021-08-15 15:53:40', 11, 79, 1);
INSERT INTO `tw_api` VALUES (35, '测试接口', '/aaaa22', 'POST', '3123d', '1', '2021-07-11 17:29:10', '2021-07-11 17:30:03', 0, NULL, 1);
INSERT INTO `tw_api` VALUES (36, '3123', '3123', 'GET', '', '1', '2021-07-11 17:32:47', '2021-07-11 17:34:39', 0, NULL, 1);
INSERT INTO `tw_api` VALUES (37, 'e213123', '321312', 'GET', '', '1', '2021-07-11 17:36:15', NULL, 4, NULL, 1);
INSERT INTO `tw_api` VALUES (38, '3213213', '312312', 'PUT', '', '1', '2021-07-11 17:36:55', NULL, 4, NULL, 1);
INSERT INTO `tw_api` VALUES (39, '312312312', '3213123', 'PUT', '', '1', '2021-07-11 17:37:18', '2021-07-11 17:39:20', 0, NULL, 1);
INSERT INTO `tw_api` VALUES (40, 'dasdas', '312321', 'POST', '', '1', '2021-07-11 17:37:49', '2021-07-11 17:39:23', 0, NULL, 1);
INSERT INTO `tw_api` VALUES (41, '大大说', '大师答', 'POST', '', '1', '2021-07-11 17:38:05', '2021-07-11 17:39:18', 4, NULL, 1);
INSERT INTO `tw_api` VALUES (42, '12312312', '3123213', 'GET', '321', '1', '2021-08-08 16:37:07', '2021-08-15 15:21:01', 0, 85, 1);
INSERT INTO `tw_api` VALUES (43, '获取关联用户详情', '/admin/v1/role/associateUser/:id', 'GET', '', '1', '2021-08-15 15:27:48', NULL, 2, 92, 0);
INSERT INTO `tw_api` VALUES (44, '添加菜单', '/admin/v1/menu', 'POST', '', '1', '2021-08-15 15:30:28', NULL, 7, 93, 0);
INSERT INTO `tw_api` VALUES (45, '删除菜单', '/admin/v1/menu/:id', 'DELETE', '', '1', '2021-08-15 15:31:03', NULL, 7, 94, 0);
INSERT INTO `tw_api` VALUES (46, '修改菜单', '/admin/v1/menu/:id', 'PUT', '', '1', '2021-08-15 15:31:29', NULL, 7, 95, 0);
INSERT INTO `tw_api` VALUES (47, '获取菜单列表', '/admin/v1/menu', 'GET', '', '1', '2021-08-15 15:32:14', NULL, 7, 96, 0);
INSERT INTO `tw_api` VALUES (48, '获取菜单详情', '/admin/v1/menu/:id', 'GET', '', '1', '2021-08-15 15:32:40', NULL, 7, 97, 0);
INSERT INTO `tw_api` VALUES (49, '添加元素', '/admin/v1/element', 'POST', '', '1', '2021-08-15 15:34:12', NULL, 8, 98, 0);
INSERT INTO `tw_api` VALUES (50, '删除元素', '/admin/v1/element/:id', 'DELETE', '', '1', '2021-08-15 15:34:37', NULL, 8, 99, 0);
INSERT INTO `tw_api` VALUES (51, '修改元素', '/admin/v1/element/:id', 'PUT', '', '1', '2021-08-15 15:35:26', '2021-08-18 15:18:05', 8, 100, 0);
INSERT INTO `tw_api` VALUES (52, '获取元素列表', '/admin/v1/element', 'GET', '', '1', '2021-08-15 15:35:51', NULL, 8, 101, 0);
INSERT INTO `tw_api` VALUES (53, '获取元素详情', '/admin/v1/element/:id', 'GET', '', '1', '2021-08-15 15:36:14', '2021-08-18 15:18:17', 8, 102, 0);
INSERT INTO `tw_api` VALUES (54, '添加接口', '/admin/v1/api', 'POST', '', '1', '2021-08-15 15:37:09', NULL, 9, 103, 0);
INSERT INTO `tw_api` VALUES (55, '删除接口', '/admin/v1/api/:id', 'DELETE', '', '1', '2021-08-15 15:37:31', NULL, 9, 104, 0);
INSERT INTO `tw_api` VALUES (56, '修改接口', '/admin/v1/api/:id', 'PUT', '', '1', '2021-08-15 15:37:52', NULL, 9, 105, 0);
INSERT INTO `tw_api` VALUES (57, '获取接口列表', '/admin/v1/api', 'GET', '', '1', '2021-08-15 15:38:14', NULL, 9, 106, 0);
INSERT INTO `tw_api` VALUES (58, '获取接口详情', '/admin/v1/api/:id', 'GET', '', '1', '2021-08-15 15:38:29', NULL, 9, 107, 0);
INSERT INTO `tw_api` VALUES (59, '获取所有菜单、元素和接口', '/admin/v1/allMenuElementApi', 'GET', '角色授权的渲染数据集合', '1', '2021-08-15 16:06:41', '2021-08-20 16:14:17', 0, 108, 0);
INSERT INTO `tw_api` VALUES (60, '修改密码', '/admin/v1/updatePassword', 'PUT', '', '1', '2021-08-15 16:07:53', '2021-08-19 08:03:36', 0, 109, 1);
INSERT INTO `tw_api` VALUES (61, '修改系统主题', '/admin/v1/thmemUpdate', 'PUT', '', '1', '2021-08-15 16:08:12', NULL, 0, 110, 0);
INSERT INTO `tw_api` VALUES (62, '获取验证码', '/admin/v1/captcha', 'GET', '登陆的验证码', '1', '2021-08-15 16:09:31', '2021-08-19 08:02:51', 0, 111, 1);
INSERT INTO `tw_api` VALUES (63, '获取系统数据字典', '/admin/v1/auth/dict', 'GET', '', '1', '2021-08-15 16:10:16', '2021-08-19 08:03:04', 0, 112, 1);
INSERT INTO `tw_api` VALUES (64, '获取系统菜单权限', '/admin/v1/auth/menu', 'GET', '', '1', '2021-08-15 16:12:21', '2021-08-19 08:03:01', 0, 113, 1);
INSERT INTO `tw_api` VALUES (65, '获取系统用户信息（元素权限）', '/admin/v1/auth/user', 'GET', '获取系统用户信息（元素权限）', '1', '2021-08-15 16:12:54', '2021-08-19 08:02:58', 0, 114, 1);
INSERT INTO `tw_api` VALUES (66, '用户登录', '/admin/v1/auth/signIn', 'POST', '', '1', '2021-08-15 16:13:38', '2021-08-19 08:02:36', 0, 115, 1);
INSERT INTO `tw_api` VALUES (67, '用户登出', '/admin/v1/auth/signOut', 'GET', '', '1', '2021-08-15 16:13:56', '2021-08-19 08:02:33', 0, 116, 1);
INSERT INTO `tw_api` VALUES (68, '导出用户', '/admin/v1/exportUser', 'GET', '导出用户', '1', '2021-10-26 09:29:32', '2021-11-26 16:53:27', 5, 119, 0);
INSERT INTO `tw_api` VALUES (69, '修改自己的密码', '/admin/v1/updatePassword', 'PUT', '修改自己的密码', '1', '2021-11-26 16:03:42', NULL, 0, 121, 0);
INSERT INTO `tw_api` VALUES (70, '获取随记分类列表', '/admin/v1/notes/classification', 'GET', '', '1', '2021-11-30 14:51:07', NULL, 37, 125, 0);
INSERT INTO `tw_api` VALUES (71, '获取随记分类详情', '/admin/v1/notes/classification/:id', 'GET', '', '1', '2021-11-30 14:51:39', NULL, 37, 126, 0);
INSERT INTO `tw_api` VALUES (72, '修改随记分类', '/admin/v1/notes/classification/:id', 'PUT', '', '1', '2021-11-30 14:52:24', NULL, 37, 127, 0);
INSERT INTO `tw_api` VALUES (73, '添加随记分类', '/admin/v1/notes/classification', 'POST', '', '1', '2021-11-30 14:54:02', '2021-11-30 14:54:35', 37, 128, 0);
INSERT INTO `tw_api` VALUES (74, '删除随记分类', '/admin/v1/notes/classification/:id', 'DELETE', '', '1', '2021-11-30 14:54:52', NULL, 37, 129, 0);
INSERT INTO `tw_api` VALUES (75, '获取随记文章列表', '/admin/v1/notes/article', 'GET', '', '1', '2021-12-01 13:50:55', NULL, 38, 133, 0);
INSERT INTO `tw_api` VALUES (76, '获取随记文章详情', '/admin/v1/notes/article/:id', 'GET', '', '1', '2021-12-01 13:51:24', NULL, 38, 134, 0);
INSERT INTO `tw_api` VALUES (77, '修改随记文章', '/admin/v1/notes/article/:id', 'PUT', '', '1', '2021-12-01 13:52:00', NULL, 38, 135, 0);
INSERT INTO `tw_api` VALUES (78, '添加随记文章', '/admin/v1/notes/article', 'POST', '', '1', '2021-12-01 13:52:21', '2021-12-01 13:52:47', 38, 136, 0);
INSERT INTO `tw_api` VALUES (79, '删除随记文章', '/admin/v1/notes/article/:id', 'DELETE', '', '1', '2021-12-01 13:52:39', NULL, 38, 137, 0);
INSERT INTO `tw_api` VALUES (80, '获取所有随记分类', '/admin/v1/allNotesClassification', 'GET', '', '1', '2021-12-01 14:54:26', NULL, 37, 141, 0);
INSERT INTO `tw_api` VALUES (81, '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试', '12312312', 'PUT', '312312312312312312312312312312', '1', '2021-12-08 13:49:03', NULL, 4, 142, 0);
INSERT INTO `tw_api` VALUES (82, '获取所有字典', '/admin/v1/allDictionary', 'GET', '在用字典', '1', '2021-12-10 14:03:47', NULL, 39, 144, 0);
INSERT INTO `tw_api` VALUES (83, '获取字典详情', '/admin/v1/dictionary/:id', 'GET', '', '1', '2021-12-10 14:04:22', NULL, 39, 145, 0);
INSERT INTO `tw_api` VALUES (84, '获取字典列表', '/admin/v1/dictionary', 'GET', '', '1', '2021-12-10 14:04:41', NULL, 39, 146, 0);
INSERT INTO `tw_api` VALUES (85, '添加字典', '/admin/v1/dictionary', 'POST', '', '1', '2021-12-10 14:04:58', NULL, 39, 147, 0);
INSERT INTO `tw_api` VALUES (86, '修改字典', '/admin/v1/dictionary/:id', 'PUT', '', '1', '2021-12-10 14:05:14', NULL, 39, 148, 0);
INSERT INTO `tw_api` VALUES (87, '删除字典', '/admin/v1/dictionary/:id', 'DELETE', '', '1', '2021-12-10 14:05:26', NULL, 39, 149, 0);
COMMIT;

-- ----------------------------
-- Table structure for tw_baby
-- ----------------------------
DROP TABLE IF EXISTS `tw_baby`;
CREATE TABLE `tw_baby` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(10) COLLATE utf8mb4_general_ci NOT NULL COMMENT '宝宝名称',
  `add_name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '添加人',
  `ip` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ip',
  `address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '添加地址',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `is_delete` tinyint unsigned NOT NULL DEFAULT '0' COMMENT '1删除0未删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of tw_baby
-- ----------------------------
BEGIN;
INSERT INTO `tw_baby` VALUES (13, '谭测试', '卢闯', '::1', '[object Object]', '2021-11-21 15:22:53', 1);
INSERT INTO `tw_baby` VALUES (14, '谭测1', '李行', '::1', '[object Object]', '2021-11-21 15:23:26', 1);
INSERT INTO `tw_baby` VALUES (15, '谭测2', '卢闯', '185.199.111.153', NULL, '2021-11-21 15:25:47', 1);
INSERT INTO `tw_baby` VALUES (16, '谭测3', '李行', '185.199.111.153', NULL, '2021-11-21 15:26:14', 1);
INSERT INTO `tw_baby` VALUES (17, '谭伟2', '马川', '185.199.111.153', '美国西雅图', '2021-11-21 15:27:49', 0);
INSERT INTO `tw_baby` VALUES (18, '谭测11', '马川', '::1', NULL, '2021-11-21 15:29:02', 1);
INSERT INTO `tw_baby` VALUES (19, '谭测试', '卢闯', '::1', NULL, '2021-11-21 18:05:34', 1);
INSERT INTO `tw_baby` VALUES (20, '谭测试2', '李行', '::1', NULL, '2021-11-26 17:13:02', 1);
INSERT INTO `tw_baby` VALUES (21, '谭测试3', '马川', '::1', NULL, '2021-11-28 19:45:04', 1);
INSERT INTO `tw_baby` VALUES (22, '谭测试', '卢闯', '::1', NULL, '2021-12-18 14:40:43', 1);
INSERT INTO `tw_baby` VALUES (23, '谭清研', '其他', '::1', NULL, '2021-12-19 15:51:19', 0);
INSERT INTO `tw_baby` VALUES (24, '谭苏珩', '其他', '::1', NULL, '2021-12-19 15:53:03', 0);
INSERT INTO `tw_baby` VALUES (25, '谭沭阳', '马川', '::1', NULL, '2021-12-19 16:01:21', 1);
COMMIT;

-- ----------------------------
-- Table structure for tw_dictionary
-- ----------------------------
DROP TABLE IF EXISTS `tw_dictionary`;
CREATE TABLE `tw_dictionary` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '数据类型名称',
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '数据字典编码',
  `status` enum('0','1') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '1' COMMENT '状态0禁用1启用',
  `value` longtext CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '数据类型值',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '描述',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '修改时间',
  `is_delete` tinyint unsigned NOT NULL DEFAULT '0' COMMENT '1删除0未删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of tw_dictionary
-- ----------------------------
BEGIN;
INSERT INTO `tw_dictionary` VALUES (1, '通用状态', 'status', '1', '[{\"key\":\"1\",\"value\":\"启用\"},{\"key\":\"0\",\"value\":\"禁用\"}]', '用户，角色，菜单状态', '2021-06-24 17:31:10', '2021-12-10 15:05:08', 0);
INSERT INTO `tw_dictionary` VALUES (2, '通用是否', 'yesNo', '1', '[{\"key\":\"1\",\"value\":\"是\"},{\"key\":\"0\",\"value\":\"否\"}]', '', '2021-06-24 17:31:10', '2021-12-10 15:04:51', 0);
INSERT INTO `tw_dictionary` VALUES (3, '菜单类型', 'menuType', '1', '[{\"key\":\"0\",\"value\":\"栏目\"},{\"key\":\"1\",\"value\":\"菜单\"}]', '菜单类型', '2021-06-24 17:31:10', '2021-12-10 14:40:18', 0);
INSERT INTO `tw_dictionary` VALUES (4, '是否显示', 'isShow', '1', '[{\"key\":\"1\",\"value\":\"显示\"},{\"key\":\"0\",\"value\":\"隐藏\"}]', '是否显示', '2021-06-24 17:31:10', '2021-12-10 14:44:25', 0);
INSERT INTO `tw_dictionary` VALUES (5, '请求方法', 'method', '1', '[{\"key\":\"GET\",\"value\":\"GET\"},{\"key\":\"POST\",\"value\":\"POST\"},{\"key\":\"PUT\",\"value\":\"PUT\"},{\"key\":\"DELETE\",\"value\":\"DELETE\"},{\"key\":\"HEAD\",\"value\":\"HEAD\"},{\"key\":\"PATCH\",\"value\":\"PATCH\"}]', '请求方法', '2021-06-24 17:31:10', '2021-12-10 14:46:14', 0);
INSERT INTO `tw_dictionary` VALUES (6, '谭伟测试', '312321', '0', '[{\"value\":\"哈哈\",\"key\":\"bb\"},{\"value\":\"嘿嘿\",\"key\":\"cc\"}]', '123123', '2021-12-10 14:28:39', '2021-12-10 14:51:10', 0);
COMMIT;

-- ----------------------------
-- Table structure for tw_element
-- ----------------------------
DROP TABLE IF EXISTS `tw_element`;
CREATE TABLE `tw_element` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '元素名称',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '元素编码',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '描述',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '状态',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '修改时间',
  `menu_id` int unsigned NOT NULL DEFAULT '0' COMMENT '0表示公共元素',
  `permission_id` int DEFAULT NULL,
  `is_delete` tinyint unsigned NOT NULL DEFAULT '0' COMMENT '1删除0未删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of tw_element
-- ----------------------------
BEGIN;
INSERT INTO `tw_element` VALUES (1, '添加角色', 'add-role', '', '1', '2019-07-29 10:09:29', '2021-12-01 09:36:19', 2, 17, 0);
INSERT INTO `tw_element` VALUES (2, '分配角色', 'user-role', '', '0', '2019-07-29 11:17:29', '2019-10-14 08:12:30', 5, 19, 0);
INSERT INTO `tw_element` VALUES (3, '编辑用户', 'edit-user', '', '1', '2019-07-29 13:40:06', '2021-12-01 09:36:49', 5, 20, 0);
INSERT INTO `tw_element` VALUES (4, '添加用户', 'add-user', '添加用户的按钮', '1', '2019-07-29 13:43:58', '2021-12-01 09:36:14', 5, 21, 0);
INSERT INTO `tw_element` VALUES (5, '编辑角色', 'edit-role', '', '1', '2019-07-29 19:51:41', '2021-12-01 09:36:44', 2, 22, 0);
INSERT INTO `tw_element` VALUES (6, '关联用户', 'associateUser-role', '', '1', '2019-07-29 19:52:02', '2021-08-13 18:39:38', 2, 23, 0);
INSERT INTO `tw_element` VALUES (7, '角色授权', 'permission-role', '', '1', '2019-07-29 19:52:20', '2021-08-13 18:39:14', 2, 24, 0);
INSERT INTO `tw_element` VALUES (8, '添加菜单', 'add-menu', '', '1', '2019-07-29 22:09:09', '2019-07-29 22:18:48', 7, 25, 0);
INSERT INTO `tw_element` VALUES (9, '编辑菜单', 'edit-menu', '', '1', '2019-07-29 22:10:01', '2021-12-01 09:36:39', 7, 26, 0);
INSERT INTO `tw_element` VALUES (10, '添加元素', 'add-element', '', '1', '2019-07-29 22:10:28', '2021-12-01 09:36:09', 8, 27, 0);
INSERT INTO `tw_element` VALUES (11, '编辑元素', 'edit-element', '', '1', '2019-07-29 22:10:57', '2021-12-01 09:36:34', 8, 28, 0);
INSERT INTO `tw_element` VALUES (12, '添加接口', 'add-api', '', '1', '2019-07-29 22:11:09', '2021-12-01 09:36:05', 9, 29, 0);
INSERT INTO `tw_element` VALUES (13, '编辑接口', 'edit-api', '', '1', '2019-07-29 22:11:22', '2021-12-01 09:36:28', 9, 30, 0);
INSERT INTO `tw_element` VALUES (14, '重置密码', 'reset-pwd', '', '1', '2019-07-30 10:23:15', '2021-08-13 16:07:39', 5, 41, 1);
INSERT INTO `tw_element` VALUES (15, '删除用户', 'delete-user', '', '1', '2019-07-30 10:25:23', '2019-07-30 10:25:43', 5, 42, 0);
INSERT INTO `tw_element` VALUES (16, '批量删除用户', 'mult-del-user', '', '1', '2019-07-30 14:09:06', '2021-08-13 18:49:43', 5, 44, 1);
INSERT INTO `tw_element` VALUES (17, '删除角色', 'delete-role', '', '1', '2019-07-30 15:48:29', '2019-07-30 15:48:29', 2, 46, 0);
INSERT INTO `tw_element` VALUES (32, '重置用户密码', 'reloadPwd-user', '', '1', '2021-08-13 16:06:03', NULL, 5, 87, 0);
INSERT INTO `tw_element` VALUES (33, '测试公共', 'demo-public', '', '1', '2021-08-13 16:20:50', '2021-08-15 14:42:16', 0, 88, 0);
INSERT INTO `tw_element` VALUES (34, '删除菜单', 'delete-menu', '', '1', '2021-08-13 18:41:42', NULL, 7, 89, 0);
INSERT INTO `tw_element` VALUES (35, '删除元素', 'delete-element', '', '1', '2021-08-13 18:46:32', NULL, 8, 90, 0);
INSERT INTO `tw_element` VALUES (36, '删除接口', 'delete-api', '', '1', '2021-08-13 18:47:55', NULL, 9, 91, 0);
INSERT INTO `tw_element` VALUES (37, 'ceshi', '123123', '', '1', '2021-08-21 17:27:07', NULL, 0, 117, 0);
INSERT INTO `tw_element` VALUES (38, '导出用户', 'export-user', '导出用户', '1', '2021-10-26 09:30:22', '2021-10-26 09:30:38', 5, 120, 0);
INSERT INTO `tw_element` VALUES (39, '删除随记分类', 'delete-notes-classification', '', '1', '2021-12-01 09:33:33', NULL, 37, 130, 0);
INSERT INTO `tw_element` VALUES (40, '编辑随记分类', 'edit-notes-classification', '', '1', '2021-12-01 09:34:23', '2021-12-01 09:35:44', 37, 131, 0);
INSERT INTO `tw_element` VALUES (41, '添加随记分类', 'add-notes-classification', '', '1', '2021-12-01 09:35:05', '2021-12-01 09:35:38', 37, 132, 0);
INSERT INTO `tw_element` VALUES (42, '删除随记文章', 'delete-notes-article', '', '1', '2021-12-01 13:54:03', NULL, 38, 138, 0);
INSERT INTO `tw_element` VALUES (43, '编辑随记文章', 'edit-notes-article', '', '1', '2021-12-01 13:54:36', NULL, 38, 139, 0);
INSERT INTO `tw_element` VALUES (44, '添加随记文章', 'add-notes-article', '', '1', '2021-12-01 13:55:00', NULL, 38, 140, 0);
INSERT INTO `tw_element` VALUES (45, '删除字典', 'delete-dictionary', '', '1', '2021-12-10 14:07:02', NULL, 39, 150, 0);
INSERT INTO `tw_element` VALUES (46, '添加字典', 'add-dictionary', '', '1', '2021-12-10 14:07:18', NULL, 39, 151, 0);
INSERT INTO `tw_element` VALUES (47, '编辑字典', 'edit-dictionary', '', '1', '2021-12-10 14:07:34', '2021-12-10 14:08:57', 39, 152, 0);
COMMIT;

-- ----------------------------
-- Table structure for tw_menu
-- ----------------------------
DROP TABLE IF EXISTS `tw_menu`;
CREATE TABLE `tw_menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '菜单名称',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '菜单编码',
  `pid` int unsigned NOT NULL DEFAULT '0' COMMENT '父级菜单id',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '路径',
  `cmp_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '组件路径',
  `sort` int DEFAULT '1' COMMENT '排序',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '图标',
  `active_menu` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '高亮',
  `is_show` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '隐藏菜单',
  `is_router` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '是否路由',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '描述',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '状态',
  `is_super` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '是否是超级',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '修改时间',
  `permission_id` int DEFAULT NULL,
  `is_delete` tinyint unsigned NOT NULL DEFAULT '0' COMMENT '1删除0未删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of tw_menu
-- ----------------------------
BEGIN;
INSERT INTO `tw_menu` VALUES (2, '角色管理', 'role', 4, '/system/role', 'pages/system/role', 20, '', '', '1', '1', '', '1', '0', '2019-07-27 20:25:04', '2021-11-29 11:15:46', 2, 0);
INSERT INTO `tw_menu` VALUES (4, '系统管理', 'system', 0, '/system', '', 10, 'SettingOutlined', '', '1', '0', '', '1', '0', '2019-07-27 20:46:36', '2021-11-29 11:15:32', 4, 0);
INSERT INTO `tw_menu` VALUES (5, '用户管理', 'user', 4, '/system/user', 'pages/system/user', 10, '', '', '1', '1', '', '1', '0', '2019-07-27 20:47:40', '2021-11-29 11:15:39', 5, 0);
INSERT INTO `tw_menu` VALUES (6, '权限管理', 'permission', 4, '/system/permission', '', 30, '', '', '1', '0', '', '1', '1', '2019-07-27 21:17:13', '2021-11-29 11:15:52', 6, 0);
INSERT INTO `tw_menu` VALUES (7, '菜单管理', 'menu', 6, '/system/permission/menu', 'pages/system/menu', 10, '', '', '1', '1', '', '1', '1', '2019-07-27 21:17:41', '2021-11-29 11:15:58', 7, 0);
INSERT INTO `tw_menu` VALUES (8, '元素管理', 'element', 6, '/system/permission/element', 'pages/system/element', 20, '', '', '1', '1', '', '1', '1', '2019-07-27 21:18:29', '2021-11-29 11:16:03', 8, 0);
INSERT INTO `tw_menu` VALUES (9, '接口管理', 'api', 6, '/system/permission/api', 'pages/system/api', 30, '', '', '1', '1', '', '1', '1', '2019-07-27 21:18:54', '2021-11-29 11:16:09', 9, 0);
INSERT INTO `tw_menu` VALUES (10, '公司管理', 'company', 0, '/company', 'pages/company', 2, 'SettingOutlined', '', '1', '1', '', '0', '0', '2019-10-14 10:40:14', '2021-08-13 18:49:14', 56, 1);
INSERT INTO `tw_menu` VALUES (11, '员工管理', 'staff', 0, '/staff', 'pages/staff', 3, 'SettingOutlined', '', '1', '1', '', '0', '0', '2019-10-14 10:43:09', '2021-08-13 18:49:12', 57, 1);
INSERT INTO `tw_menu` VALUES (12, '导入数据', 'importData', 0, '/importData', 'pages/importData', 10, 'SettingOutlined', '', '1', '1', '只用来导入数据', '0', '1', '2019-11-02 11:45:35', '2021-08-13 18:49:09', 80, 1);
INSERT INTO `tw_menu` VALUES (25, '测试菜单', 'demo', 0, '/demo', 'pages/demo', 99, 'SettingOutlined', '', '1', '1', '', '1', '0', '2021-07-10 18:50:58', '2021-07-29 10:26:17', NULL, 1);
INSERT INTO `tw_menu` VALUES (26, '测试菜单', '2222', 4, '多对多', '', 99, '', '', '1', '0', '', '1', '0', '2021-07-10 18:51:17', '2021-07-11 15:39:43', NULL, 1);
INSERT INTO `tw_menu` VALUES (27, '测试菜单', '32132', 10, '安德森', '', 99, '', '', '1', '0', '', '1', '0', '2021-07-10 18:51:47', '2021-07-10 18:52:00', NULL, 1);
INSERT INTO `tw_menu` VALUES (30, '测试菜单1', '2222', 0, '321312', '', 99, '', '', '1', '0', '', '1', '0', '2021-07-10 18:54:36', '2021-07-10 19:24:30', NULL, 1);
INSERT INTO `tw_menu` VALUES (31, '测试菜单	', '312312', 4, '大师答', '', 99, '', '', '1', '0', '', '1', '0', '2021-07-11 15:38:14', '2021-07-29 10:26:41', NULL, 1);
INSERT INTO `tw_menu` VALUES (34, 'ccccc2222', '111111', 0, '/demo', '', 99, '', '', '1', '0', '', '1', '0', '2021-08-08 16:31:52', '2021-08-13 18:49:16', 83, 1);
INSERT INTO `tw_menu` VALUES (35, 'socket测试', 'socketDemo', 0, '/socketDemo', 'pages/socketDemo', 99, 'SettingOutlined', '', '1', '1', '', '1', '0', '2021-10-18 16:44:37', '2021-10-18 16:46:01', 118, 0);
INSERT INTO `tw_menu` VALUES (36, '随记管理', 'notes', 0, '/notes', '', 20, 'EditOutlined', '', '1', '0', '', '1', '0', '2021-11-29 11:15:11', '2021-11-29 11:16:19', 122, 0);
INSERT INTO `tw_menu` VALUES (37, '随记分类', 'notesClassification', 36, '/notes/classification', 'pages/notes/classification', 10, '', '', '1', '1', '', '1', '0', '2021-11-29 13:48:38', '2021-11-29 14:53:16', 123, 0);
INSERT INTO `tw_menu` VALUES (38, '随记文章', 'notesArticle', 36, '/notes/article', 'pages/notes/article', 20, '', '', '1', '1', '', '1', '0', '2021-11-29 13:50:35', '2021-12-01 09:28:08', 124, 0);
INSERT INTO `tw_menu` VALUES (39, '字典管理', 'dictionary', 4, '/system/dictionary', 'pages/system/dictionary', 40, '', '', '1', '1', '', '1', '0', '2021-12-08 17:00:21', '2021-12-08 17:03:17', 143, 0);
COMMIT;

-- ----------------------------
-- Table structure for tw_notes_article
-- ----------------------------
DROP TABLE IF EXISTS `tw_notes_article`;
CREATE TABLE `tw_notes_article` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '名称',
  `classification` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '分类',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '状态',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '内容',
  `author` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '作者',
  `create_user_id` int unsigned NOT NULL COMMENT '发布用户id',
  `create_user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '发布用户名字',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '修改时间',
  `is_delete` tinyint unsigned NOT NULL DEFAULT '0' COMMENT '1删除0未删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of tw_notes_article
-- ----------------------------
BEGIN;
INSERT INTO `tw_notes_article` VALUES (87, '33123', '77', '1', '<p>💚🤣</p>', '312312', 1, 'admin', '2021-12-06 14:28:05', NULL, 0);
INSERT INTO `tw_notes_article` VALUES (88, '3312333123', '76', '1', '<p>3213123</p>', '3123123', 1, 'admin', '2021-12-08 16:59:06', NULL, 0);
COMMIT;

-- ----------------------------
-- Table structure for tw_notes_classification
-- ----------------------------
DROP TABLE IF EXISTS `tw_notes_classification`;
CREATE TABLE `tw_notes_classification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '随记分类名称',
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '随记分类颜色',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '状态',
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '描述',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '修改时间',
  `is_delete` tinyint unsigned NOT NULL DEFAULT '0' COMMENT '1删除0未删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of tw_notes_classification
-- ----------------------------
BEGIN;
INSERT INTO `tw_notes_classification` VALUES (75, '谭伟测试1', '#553ad6', '1', '测试', '2021-11-30 15:06:31', '2021-11-30 16:43:01', 1);
INSERT INTO `tw_notes_classification` VALUES (76, '谭伟测试2', '#3089e6', '1', NULL, '2021-11-30 16:35:46', '2021-12-02 13:25:11', 0);
INSERT INTO `tw_notes_classification` VALUES (77, '谭伟测试1', '#d13d16', '1', '1', '2021-11-30 17:05:36', '2021-12-03 14:12:02', 0);
INSERT INTO `tw_notes_classification` VALUES (78, '测试2', '#bdb4ee', '0', NULL, '2021-12-01 16:15:36', '2021-12-02 13:24:41', 0);
INSERT INTO `tw_notes_classification` VALUES (79, '谭伟测试23', '#3210da', '1', NULL, '2021-12-02 13:19:26', '2021-12-02 13:25:01', 0);
INSERT INTO `tw_notes_classification` VALUES (80, '分类份额里', '#644dd7', '1', '大三大四的 大三大四的 大三大四的 大三大四的 大三大四的 ', '2021-12-05 14:16:08', NULL, 0);
COMMIT;

-- ----------------------------
-- Table structure for tw_org
-- ----------------------------
DROP TABLE IF EXISTS `tw_org`;
CREATE TABLE `tw_org` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '机构id',
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '机构名称',
  `status` tinyint unsigned NOT NULL DEFAULT '1' COMMENT '1-开启 0-禁用',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of tw_org
-- ----------------------------
BEGIN;
INSERT INTO `tw_org` VALUES (1, '人民政府办公厅', 1, NULL, '2020-07-14 09:31:39', '2021-06-29 10:03:09');
INSERT INTO `tw_org` VALUES (2, '发展和改革委员会', 1, '', '2020-07-21 18:07:44', '2021-06-29 09:53:24');
COMMIT;

-- ----------------------------
-- Table structure for tw_permission
-- ----------------------------
DROP TABLE IF EXISTS `tw_permission`;
CREATE TABLE `tw_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '权限类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of tw_permission
-- ----------------------------
BEGIN;
INSERT INTO `tw_permission` VALUES (1, 'menu');
INSERT INTO `tw_permission` VALUES (2, 'menu');
INSERT INTO `tw_permission` VALUES (3, 'menu');
INSERT INTO `tw_permission` VALUES (4, 'menu');
INSERT INTO `tw_permission` VALUES (5, 'menu');
INSERT INTO `tw_permission` VALUES (6, 'menu');
INSERT INTO `tw_permission` VALUES (7, 'menu');
INSERT INTO `tw_permission` VALUES (8, 'menu');
INSERT INTO `tw_permission` VALUES (9, 'menu');
INSERT INTO `tw_permission` VALUES (11, 'api');
INSERT INTO `tw_permission` VALUES (14, 'menu');
INSERT INTO `tw_permission` VALUES (15, 'api');
INSERT INTO `tw_permission` VALUES (16, 'api');
INSERT INTO `tw_permission` VALUES (17, 'element');
INSERT INTO `tw_permission` VALUES (18, 'api');
INSERT INTO `tw_permission` VALUES (19, 'element');
INSERT INTO `tw_permission` VALUES (20, 'element');
INSERT INTO `tw_permission` VALUES (21, 'element');
INSERT INTO `tw_permission` VALUES (22, 'element');
INSERT INTO `tw_permission` VALUES (23, 'element');
INSERT INTO `tw_permission` VALUES (24, 'element');
INSERT INTO `tw_permission` VALUES (25, 'element');
INSERT INTO `tw_permission` VALUES (26, 'element');
INSERT INTO `tw_permission` VALUES (27, 'element');
INSERT INTO `tw_permission` VALUES (28, 'element');
INSERT INTO `tw_permission` VALUES (29, 'element');
INSERT INTO `tw_permission` VALUES (30, 'element');
INSERT INTO `tw_permission` VALUES (31, 'api');
INSERT INTO `tw_permission` VALUES (32, 'api');
INSERT INTO `tw_permission` VALUES (33, 'api');
INSERT INTO `tw_permission` VALUES (34, 'api');
INSERT INTO `tw_permission` VALUES (35, 'api');
INSERT INTO `tw_permission` VALUES (36, 'api');
INSERT INTO `tw_permission` VALUES (37, 'api');
INSERT INTO `tw_permission` VALUES (38, 'api');
INSERT INTO `tw_permission` VALUES (39, 'api');
INSERT INTO `tw_permission` VALUES (40, 'api');
INSERT INTO `tw_permission` VALUES (41, 'element');
INSERT INTO `tw_permission` VALUES (42, 'element');
INSERT INTO `tw_permission` VALUES (43, 'api');
INSERT INTO `tw_permission` VALUES (44, 'element');
INSERT INTO `tw_permission` VALUES (45, 'api');
INSERT INTO `tw_permission` VALUES (46, 'element');
INSERT INTO `tw_permission` VALUES (47, 'menu');
INSERT INTO `tw_permission` VALUES (48, 'menu');
INSERT INTO `tw_permission` VALUES (49, 'menu');
INSERT INTO `tw_permission` VALUES (50, 'menu');
INSERT INTO `tw_permission` VALUES (51, 'menu');
INSERT INTO `tw_permission` VALUES (52, 'menu');
INSERT INTO `tw_permission` VALUES (53, 'menu');
INSERT INTO `tw_permission` VALUES (54, 'menu');
INSERT INTO `tw_permission` VALUES (55, 'api');
INSERT INTO `tw_permission` VALUES (58, 'element');
INSERT INTO `tw_permission` VALUES (59, 'element');
INSERT INTO `tw_permission` VALUES (60, 'element');
INSERT INTO `tw_permission` VALUES (61, 'api');
INSERT INTO `tw_permission` VALUES (62, 'api');
INSERT INTO `tw_permission` VALUES (63, 'api');
INSERT INTO `tw_permission` VALUES (64, 'api');
INSERT INTO `tw_permission` VALUES (65, 'api');
INSERT INTO `tw_permission` VALUES (66, 'api');
INSERT INTO `tw_permission` VALUES (67, 'element');
INSERT INTO `tw_permission` VALUES (68, 'element');
INSERT INTO `tw_permission` VALUES (69, 'element');
INSERT INTO `tw_permission` VALUES (70, 'api');
INSERT INTO `tw_permission` VALUES (71, 'api');
INSERT INTO `tw_permission` VALUES (72, 'api');
INSERT INTO `tw_permission` VALUES (73, 'api');
INSERT INTO `tw_permission` VALUES (74, 'api');
INSERT INTO `tw_permission` VALUES (75, 'api');
INSERT INTO `tw_permission` VALUES (76, 'element');
INSERT INTO `tw_permission` VALUES (77, 'api');
INSERT INTO `tw_permission` VALUES (78, 'element');
INSERT INTO `tw_permission` VALUES (79, 'api');
INSERT INTO `tw_permission` VALUES (80, 'menu');
INSERT INTO `tw_permission` VALUES (83, 'menu');
INSERT INTO `tw_permission` VALUES (84, 'element');
INSERT INTO `tw_permission` VALUES (85, 'api');
INSERT INTO `tw_permission` VALUES (86, 'element');
INSERT INTO `tw_permission` VALUES (87, 'element');
INSERT INTO `tw_permission` VALUES (88, 'element');
INSERT INTO `tw_permission` VALUES (89, 'element');
INSERT INTO `tw_permission` VALUES (90, 'element');
INSERT INTO `tw_permission` VALUES (91, 'element');
INSERT INTO `tw_permission` VALUES (92, 'api');
INSERT INTO `tw_permission` VALUES (93, 'api');
INSERT INTO `tw_permission` VALUES (94, 'api');
INSERT INTO `tw_permission` VALUES (95, 'api');
INSERT INTO `tw_permission` VALUES (96, 'api');
INSERT INTO `tw_permission` VALUES (97, 'api');
INSERT INTO `tw_permission` VALUES (98, 'api');
INSERT INTO `tw_permission` VALUES (99, 'api');
INSERT INTO `tw_permission` VALUES (100, 'api');
INSERT INTO `tw_permission` VALUES (101, 'api');
INSERT INTO `tw_permission` VALUES (102, 'api');
INSERT INTO `tw_permission` VALUES (103, 'api');
INSERT INTO `tw_permission` VALUES (104, 'api');
INSERT INTO `tw_permission` VALUES (105, 'api');
INSERT INTO `tw_permission` VALUES (106, 'api');
INSERT INTO `tw_permission` VALUES (107, 'api');
INSERT INTO `tw_permission` VALUES (108, 'api');
INSERT INTO `tw_permission` VALUES (109, 'api');
INSERT INTO `tw_permission` VALUES (110, 'api');
INSERT INTO `tw_permission` VALUES (111, 'api');
INSERT INTO `tw_permission` VALUES (112, 'api');
INSERT INTO `tw_permission` VALUES (113, 'api');
INSERT INTO `tw_permission` VALUES (114, 'api');
INSERT INTO `tw_permission` VALUES (115, 'api');
INSERT INTO `tw_permission` VALUES (116, 'api');
INSERT INTO `tw_permission` VALUES (117, 'element');
INSERT INTO `tw_permission` VALUES (118, 'menu');
INSERT INTO `tw_permission` VALUES (119, 'api');
INSERT INTO `tw_permission` VALUES (120, 'element');
INSERT INTO `tw_permission` VALUES (121, 'api');
INSERT INTO `tw_permission` VALUES (122, 'menu');
INSERT INTO `tw_permission` VALUES (123, 'menu');
INSERT INTO `tw_permission` VALUES (124, 'menu');
INSERT INTO `tw_permission` VALUES (125, 'api');
INSERT INTO `tw_permission` VALUES (126, 'api');
INSERT INTO `tw_permission` VALUES (127, 'api');
INSERT INTO `tw_permission` VALUES (128, 'api');
INSERT INTO `tw_permission` VALUES (129, 'api');
INSERT INTO `tw_permission` VALUES (130, 'element');
INSERT INTO `tw_permission` VALUES (131, 'element');
INSERT INTO `tw_permission` VALUES (132, 'element');
INSERT INTO `tw_permission` VALUES (133, 'api');
INSERT INTO `tw_permission` VALUES (134, 'api');
INSERT INTO `tw_permission` VALUES (135, 'api');
INSERT INTO `tw_permission` VALUES (136, 'api');
INSERT INTO `tw_permission` VALUES (137, 'api');
INSERT INTO `tw_permission` VALUES (138, 'element');
INSERT INTO `tw_permission` VALUES (139, 'element');
INSERT INTO `tw_permission` VALUES (140, 'element');
INSERT INTO `tw_permission` VALUES (141, 'api');
INSERT INTO `tw_permission` VALUES (142, 'api');
INSERT INTO `tw_permission` VALUES (143, 'menu');
INSERT INTO `tw_permission` VALUES (144, 'api');
INSERT INTO `tw_permission` VALUES (145, 'api');
INSERT INTO `tw_permission` VALUES (146, 'api');
INSERT INTO `tw_permission` VALUES (147, 'api');
INSERT INTO `tw_permission` VALUES (148, 'api');
INSERT INTO `tw_permission` VALUES (149, 'api');
INSERT INTO `tw_permission` VALUES (150, 'element');
INSERT INTO `tw_permission` VALUES (151, 'element');
INSERT INTO `tw_permission` VALUES (152, 'element');
COMMIT;

-- ----------------------------
-- Table structure for tw_region
-- ----------------------------
DROP TABLE IF EXISTS `tw_region`;
CREATE TABLE `tw_region` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '地区名称',
  `status` int NOT NULL DEFAULT '1' COMMENT '状态',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of tw_region
-- ----------------------------
BEGIN;
INSERT INTO `tw_region` VALUES (1, '长春地区', 1, '2019-10-13 21:48:32', '2019-10-13 21:48:38');
INSERT INTO `tw_region` VALUES (2, '吉林地区', 1, '2019-10-13 21:48:48', '2019-10-13 21:48:54');
INSERT INTO `tw_region` VALUES (3, '四平地区', 1, '2019-10-13 21:49:10', '2019-10-13 21:49:13');
INSERT INTO `tw_region` VALUES (4, '辽源地区', 1, '2019-10-13 21:50:17', '2019-10-13 21:50:21');
INSERT INTO `tw_region` VALUES (5, '通化地区', 1, '2019-10-13 21:50:46', '2019-10-13 21:50:50');
INSERT INTO `tw_region` VALUES (6, '白山地区', 1, '2019-10-13 21:52:04', '2019-10-13 21:52:08');
INSERT INTO `tw_region` VALUES (7, '白城地区', 1, '2019-10-13 21:52:21', '2019-10-13 21:52:24');
INSERT INTO `tw_region` VALUES (8, '延边地区', 1, '2019-10-13 21:52:51', '2019-10-13 21:52:54');
INSERT INTO `tw_region` VALUES (9, '松原地区', 1, '2019-10-13 21:53:12', '2019-10-13 21:53:14');
INSERT INTO `tw_region` VALUES (10, '公主岭', 1, '2019-10-16 19:31:12', '2019-10-16 19:31:15');
INSERT INTO `tw_region` VALUES (11, '梅河口', 1, '2019-10-16 19:31:53', '2019-10-16 19:31:56');
COMMIT;

-- ----------------------------
-- Table structure for tw_role
-- ----------------------------
DROP TABLE IF EXISTS `tw_role`;
CREATE TABLE `tw_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色名称',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '描述',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '状态',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '修改时间',
  `is_delete` tinyint unsigned NOT NULL DEFAULT '0' COMMENT '1删除0未删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of tw_role
-- ----------------------------
BEGIN;
INSERT INTO `tw_role` VALUES (1, '省级管理员', '测试', '1', '2019-10-14 07:35:10', '2021-12-03 14:03:18', 1);
INSERT INTO `tw_role` VALUES (2, '地区管理员', '', '1', '2019-10-14 10:36:51', '2021-12-03 14:03:21', 1);
INSERT INTO `tw_role` VALUES (3, '公司管理员', '', '0', '2019-10-14 10:44:42', '2019-10-14 10:44:42', 0);
INSERT INTO `tw_role` VALUES (4, '谭伟测试', '3123123', '0', '2021-07-06 17:13:30', '2021-07-10 19:32:24', 1);
INSERT INTO `tw_role` VALUES (7, 'tanwei', '312312', '1', '2021-07-10 19:31:17', '2021-07-10 19:31:21', 1);
INSERT INTO `tw_role` VALUES (8, 'tanwei11', '1', '1', '2021-07-10 19:33:24', '2021-12-03 14:03:23', 1);
INSERT INTO `tw_role` VALUES (9, '3213213', '13', '1', '2021-07-12 15:59:22', '2021-08-20 10:48:45', 1);
INSERT INTO `tw_role` VALUES (10, '测试角色', '谭伟测试', '1', '2021-07-29 14:38:03', '2021-12-03 14:03:36', 1);
INSERT INTO `tw_role` VALUES (11, '11123123', '321312', '1', '2021-08-11 16:08:54', '2021-12-02 13:30:07', 1);
INSERT INTO `tw_role` VALUES (12, '3213123123', '312312321', '1', '2021-08-11 16:19:47', '2021-12-02 13:30:05', 1);
INSERT INTO `tw_role` VALUES (13, '3123123', '', '1', '2021-08-14 11:26:42', '2021-08-14 11:57:28', 1);
INSERT INTO `tw_role` VALUES (14, '31231231', '', '1', '2021-08-14 12:06:38', '2021-12-02 13:30:03', 1);
INSERT INTO `tw_role` VALUES (15, '312312312', '', '1', '2021-08-14 12:07:37', '2021-12-02 13:30:01', 1);
INSERT INTO `tw_role` VALUES (16, '测试角色', '', '1', '2021-11-26 16:06:29', '2021-12-03 14:03:41', 0);
INSERT INTO `tw_role` VALUES (17, '随记发布', '', '1', '2021-12-02 13:30:16', NULL, 0);
COMMIT;

-- ----------------------------
-- Table structure for tw_role_permission
-- ----------------------------
DROP TABLE IF EXISTS `tw_role_permission`;
CREATE TABLE `tw_role_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int DEFAULT NULL,
  `permission_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `gas_role_permission_gasRoleId_gasPermissionId_unique` (`role_id`,`permission_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1031 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of tw_role_permission
-- ----------------------------
BEGIN;
INSERT INTO `tw_role_permission` VALUES (8, 1, 18, '2019-10-14 08:18:58');
INSERT INTO `tw_role_permission` VALUES (68, 2, 18, '2019-10-14 10:37:27');
INSERT INTO `tw_role_permission` VALUES (78, 2, 56, '2019-10-14 10:40:44');
INSERT INTO `tw_role_permission` VALUES (79, 3, 57, '2019-10-14 10:45:14');
INSERT INTO `tw_role_permission` VALUES (80, 2, 58, '2019-10-14 12:50:57');
INSERT INTO `tw_role_permission` VALUES (81, 2, 59, '2019-10-14 12:50:57');
INSERT INTO `tw_role_permission` VALUES (82, 2, 60, '2019-10-14 12:50:57');
INSERT INTO `tw_role_permission` VALUES (83, 2, 61, '2019-10-14 12:53:45');
INSERT INTO `tw_role_permission` VALUES (84, 2, 62, '2019-10-14 12:53:45');
INSERT INTO `tw_role_permission` VALUES (85, 2, 63, '2019-10-14 12:53:45');
INSERT INTO `tw_role_permission` VALUES (86, 2, 64, '2019-10-14 12:53:45');
INSERT INTO `tw_role_permission` VALUES (87, 2, 65, '2019-10-14 12:53:45');
INSERT INTO `tw_role_permission` VALUES (88, 1, 56, '2019-10-14 12:54:07');
INSERT INTO `tw_role_permission` VALUES (89, 1, 61, '2019-10-14 12:54:07');
INSERT INTO `tw_role_permission` VALUES (90, 2, 66, '2019-10-14 14:13:43');
INSERT INTO `tw_role_permission` VALUES (91, 3, 18, '2019-10-14 14:13:56');
INSERT INTO `tw_role_permission` VALUES (92, 3, 66, '2019-10-14 14:13:56');
INSERT INTO `tw_role_permission` VALUES (93, 1, 57, '2019-10-14 14:47:03');
INSERT INTO `tw_role_permission` VALUES (94, 1, 66, '2019-10-14 14:47:03');
INSERT INTO `tw_role_permission` VALUES (95, 2, 57, '2019-10-14 14:47:12');
INSERT INTO `tw_role_permission` VALUES (96, 1, 62, '2019-10-14 14:56:43');
INSERT INTO `tw_role_permission` VALUES (97, 1, 70, '2019-10-14 14:56:43');
INSERT INTO `tw_role_permission` VALUES (98, 1, 71, '2019-10-14 14:56:43');
INSERT INTO `tw_role_permission` VALUES (99, 2, 70, '2019-10-14 14:57:14');
INSERT INTO `tw_role_permission` VALUES (100, 2, 71, '2019-10-14 14:57:14');
INSERT INTO `tw_role_permission` VALUES (101, 3, 67, '2019-10-14 14:57:34');
INSERT INTO `tw_role_permission` VALUES (102, 3, 68, '2019-10-14 14:57:34');
INSERT INTO `tw_role_permission` VALUES (103, 3, 69, '2019-10-14 14:57:34');
INSERT INTO `tw_role_permission` VALUES (104, 3, 70, '2019-10-14 14:57:34');
INSERT INTO `tw_role_permission` VALUES (105, 3, 71, '2019-10-14 14:57:34');
INSERT INTO `tw_role_permission` VALUES (106, 3, 72, '2019-10-14 14:57:34');
INSERT INTO `tw_role_permission` VALUES (107, 3, 73, '2019-10-14 14:57:34');
INSERT INTO `tw_role_permission` VALUES (108, 3, 74, '2019-10-14 14:57:34');
INSERT INTO `tw_role_permission` VALUES (109, 3, 75, '2019-10-16 13:10:41');
INSERT INTO `tw_role_permission` VALUES (110, 2, 76, '2019-10-18 10:04:25');
INSERT INTO `tw_role_permission` VALUES (111, 2, 77, '2019-10-18 10:04:25');
INSERT INTO `tw_role_permission` VALUES (112, 3, 78, '2019-11-01 17:07:01');
INSERT INTO `tw_role_permission` VALUES (113, 3, 79, '2019-11-01 17:07:08');
INSERT INTO `tw_role_permission` VALUES (114, 2, 78, '2019-11-01 17:07:31');
INSERT INTO `tw_role_permission` VALUES (115, 2, 79, '2019-11-01 17:07:31');
INSERT INTO `tw_role_permission` VALUES (116, 1, 78, '2019-11-01 17:07:41');
INSERT INTO `tw_role_permission` VALUES (117, 1, 79, '2019-11-01 17:07:41');
INSERT INTO `tw_role_permission` VALUES (745, 10, 45, '2021-11-10 19:58:27');
INSERT INTO `tw_role_permission` VALUES (746, 10, 119, '2021-11-10 19:58:27');
INSERT INTO `tw_role_permission` VALUES (841, 8, 100, '2021-12-02 13:52:08');
INSERT INTO `tw_role_permission` VALUES (842, 8, 104, '2021-12-02 13:52:08');
INSERT INTO `tw_role_permission` VALUES (938, 16, 2, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (939, 16, 4, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (940, 16, 5, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (941, 16, 6, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (942, 16, 7, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (943, 16, 8, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (944, 16, 9, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (945, 16, 118, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (946, 16, 17, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (947, 16, 20, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (948, 16, 21, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (949, 16, 22, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (950, 16, 23, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (951, 16, 24, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (952, 16, 25, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (953, 16, 26, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (954, 16, 27, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (955, 16, 28, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (956, 16, 29, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (957, 16, 30, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (958, 16, 42, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (959, 16, 46, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (960, 16, 87, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (961, 16, 88, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (962, 16, 89, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (963, 16, 90, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (964, 16, 91, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (965, 16, 117, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (966, 16, 120, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (967, 16, 16, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (968, 16, 31, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (969, 16, 32, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (970, 16, 33, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (971, 16, 34, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (973, 16, 39, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (974, 16, 92, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (975, 16, 96, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (976, 16, 97, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (977, 16, 101, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (978, 16, 102, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (979, 16, 106, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (980, 16, 107, '2021-12-03 14:06:48');
INSERT INTO `tw_role_permission` VALUES (1005, 17, 122, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1006, 17, 123, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1007, 17, 124, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1008, 17, 130, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1009, 17, 131, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1010, 17, 132, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1011, 17, 138, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1012, 17, 139, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1013, 17, 140, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1014, 17, 88, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1015, 17, 117, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1016, 17, 37, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1017, 17, 108, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1018, 17, 110, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1019, 17, 125, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1020, 17, 126, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1021, 17, 127, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1022, 17, 128, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1023, 17, 133, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1024, 17, 134, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1025, 17, 135, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1026, 17, 136, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1027, 17, 137, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1028, 17, 141, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1029, 17, 129, '2021-12-05 14:15:23');
INSERT INTO `tw_role_permission` VALUES (1030, 17, 121, '2021-12-05 14:15:23');
COMMIT;

-- ----------------------------
-- Table structure for tw_system_theme
-- ----------------------------
DROP TABLE IF EXISTS `tw_system_theme`;
CREATE TABLE `tw_system_theme` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int unsigned NOT NULL COMMENT '用户id',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '皮肤主题内容',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of tw_system_theme
-- ----------------------------
BEGIN;
INSERT INTO `tw_system_theme` VALUES (1, 1, '{\"overallStyle\":\"dark\",\"themeColor\":\"rgb(19, 194, 194)\",\"menuTrigger\":true,\"breadcrumb\":true,\"fixedHeader\":true,\"displaySystemConfig\":false,\"watermark\":false}', '2021-06-25 17:23:50', '2021-12-08 14:57:01');
INSERT INTO `tw_system_theme` VALUES (5, 2, '{\"overallStyle\":\"dark\",\"themeColor\":\"rgb(82, 196, 26)\",\"menuTrigger\":false,\"breadcrumb\":true,\"fixedHeader\":true,\"displaySystemConfig\":true,\"watermark\":false}', '2021-07-26 08:47:16', '2021-11-10 20:01:14');
INSERT INTO `tw_system_theme` VALUES (6, 54, '{\"overallStyle\":\"dark\",\"themeColor\":\"rgb(82, 196, 26)\",\"menuTrigger\":false,\"breadcrumb\":true,\"fixedHeader\":true,\"displaySystemConfig\":true}', '2021-12-03 14:07:21', '2021-12-03 14:07:22');
INSERT INTO `tw_system_theme` VALUES (7, 55, '{\"overallStyle\":\"dark\",\"themeColor\":\"rgb(250, 84, 28)\",\"menuTrigger\":false,\"breadcrumb\":true,\"fixedHeader\":true,\"displaySystemConfig\":true}', '2021-12-03 14:12:10', '2021-12-03 14:12:11');
COMMIT;

-- ----------------------------
-- Table structure for tw_user
-- ----------------------------
DROP TABLE IF EXISTS `tw_user`;
CREATE TABLE `tw_user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '登录账号',
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '姓名',
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '手机号',
  `is_init_pwd` int NOT NULL DEFAULT '1' COMMENT '是否是初始化密码',
  `is_super` int NOT NULL DEFAULT '0' COMMENT '是否是超级管理员',
  `type` int DEFAULT '1' COMMENT '用户类型：1省级管理员2市级管理员3公司管理员',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '状态 1启用0启用',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '修改时间',
  `region_id` int unsigned DEFAULT NULL COMMENT '地区',
  `org_id` int unsigned DEFAULT NULL COMMENT '机构',
  `is_delete` tinyint unsigned NOT NULL DEFAULT '0' COMMENT '1删除0未删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of tw_user
-- ----------------------------
BEGIN;
INSERT INTO `tw_user` VALUES (1, 'admin', 'f35acb01168ef49faa94f67d075eb096', '超级管理员', '', 0, 1, 0, '1', '2019-07-25 09:22:12', '2021-07-02 09:38:36', 1, 1, 0);
INSERT INTO `tw_user` VALUES (2, 'tanwei', 'f35acb01168ef49faa94f67d075eb096', 'tanwei', '', 0, 0, 1, '1', '2021-07-01 15:26:39', '2021-11-10 19:57:32', 1, 1, 0);
INSERT INTO `tw_user` VALUES (3, 'tanwei1', 'f35acb01168ef49faa94f67d075eb096', 'tanwei1', '', 0, 0, 1, '0', '2021-07-01 15:26:39', NULL, 1, 1, 0);
INSERT INTO `tw_user` VALUES (16, 'demo', '2a2af10e67e7e2a49fb2ed6e45ffa227', '', '', 1, 0, 1, '0', '2021-07-02 23:16:44', '2021-08-20 10:22:39', NULL, NULL, 0);
INSERT INTO `tw_user` VALUES (17, 'demo2', '2a2af10e67e7e2a49fb2ed6e45ffa227', '谭伟测试2', '', 1, 0, 1, '0', '2021-07-02 23:19:28', NULL, NULL, NULL, 0);
INSERT INTO `tw_user` VALUES (18, 'demo3', '2a2af10e67e7e2a49fb2ed6e45ffa227', '谭伟', '13333333333', 1, 0, 1, '1', '2021-07-04 14:41:19', NULL, NULL, NULL, 0);
INSERT INTO `tw_user` VALUES (19, 'demo4', '2a2af10e67e7e2a49fb2ed6e45ffa227', '谭伟11222', '13333333332', 1, 0, 1, '0', '2021-07-04 14:44:02', '2021-07-10 19:25:35', NULL, NULL, 0);
INSERT INTO `tw_user` VALUES (20, 'demo5', '2a2af10e67e7e2a49fb2ed6e45ffa227', '', '', 1, 0, 1, '1', '2021-07-04 14:48:25', NULL, NULL, NULL, 0);
INSERT INTO `tw_user` VALUES (21, '3333', '2a2af10e67e7e2a49fb2ed6e45ffa227', '312312sadas', '', 1, 0, 1, '1', '2021-07-04 14:50:55', '2021-07-05 16:59:51', NULL, NULL, 0);
INSERT INTO `tw_user` VALUES (22, '4444', '2a2af10e67e7e2a49fb2ed6e45ffa227', '', '', 1, 0, 1, '1', '2021-07-04 14:50:58', NULL, NULL, NULL, 0);
INSERT INTO `tw_user` VALUES (23, '5555', '2a2af10e67e7e2a49fb2ed6e45ffa227', '', '', 1, 0, 1, '1', '2021-07-04 14:51:01', '2021-07-10 19:25:41', NULL, NULL, 0);
INSERT INTO `tw_user` VALUES (26, 'hhahhh', '2a2af10e67e7e2a49fb2ed6e45ffa227', '12312321', '13222312122', 1, 0, 1, '0', '2021-07-04 17:55:49', '2021-07-10 19:25:45', NULL, NULL, 1);
INSERT INTO `tw_user` VALUES (31, 'tanwei2222', '2a2af10e67e7e2a49fb2ed6e45ffa227', 'tanwei11112', '', 1, 0, 1, '1', '2021-07-05 15:12:29', '2021-07-06 16:26:03', NULL, NULL, 0);
INSERT INTO `tw_user` VALUES (34, '3213213123', '2a2af10e67e7e2a49fb2ed6e45ffa227', '', '', 1, 0, 1, '1', '2021-07-06 16:26:09', '2021-07-10 19:13:37', NULL, NULL, 1);
INSERT INTO `tw_user` VALUES (37, '321321', '2a2af10e67e7e2a49fb2ed6e45ffa227', '32132131', '', 1, 0, 1, '1', '2021-07-10 19:22:47', '2021-07-10 19:25:20', NULL, NULL, 0);
INSERT INTO `tw_user` VALUES (38, '1111', '2a2af10e67e7e2a49fb2ed6e45ffa227', '', '', 1, 0, 1, '1', '2021-07-13 11:16:13', NULL, NULL, NULL, 0);
INSERT INTO `tw_user` VALUES (39, '2222', '2a2af10e67e7e2a49fb2ed6e45ffa227', '', '', 1, 0, 1, '1', '2021-07-13 11:16:16', NULL, NULL, NULL, 0);
INSERT INTO `tw_user` VALUES (40, '6666', '2a2af10e67e7e2a49fb2ed6e45ffa227', '', '', 1, 0, 1, '1', '2021-07-13 11:16:27', NULL, NULL, NULL, 0);
INSERT INTO `tw_user` VALUES (41, '7777', '2a2af10e67e7e2a49fb2ed6e45ffa227', '', '', 1, 0, 1, '1', '2021-07-13 11:16:31', NULL, NULL, NULL, 0);
INSERT INTO `tw_user` VALUES (42, '8888', '2a2af10e67e7e2a49fb2ed6e45ffa227', '', '', 1, 0, 1, '1', '2021-07-13 11:16:34', NULL, NULL, NULL, 0);
INSERT INTO `tw_user` VALUES (43, '9999', '2a2af10e67e7e2a49fb2ed6e45ffa227', '', '', 1, 0, 1, '1', '2021-07-13 11:16:37', '2021-12-02 13:30:45', NULL, NULL, 1);
INSERT INTO `tw_user` VALUES (44, '11111', '2a2af10e67e7e2a49fb2ed6e45ffa227', '', '', 1, 0, 1, '1', '2021-07-13 11:16:40', '2021-12-02 13:30:43', NULL, NULL, 1);
INSERT INTO `tw_user` VALUES (45, '22222', '2a2af10e67e7e2a49fb2ed6e45ffa227', '', '', 1, 0, 1, '1', '2021-07-13 11:16:48', '2021-12-02 13:30:40', NULL, NULL, 1);
INSERT INTO `tw_user` VALUES (46, '33333', '2a2af10e67e7e2a49fb2ed6e45ffa227', '', '', 1, 0, 1, '1', '2021-07-13 11:16:52', '2021-12-02 13:30:38', NULL, NULL, 1);
INSERT INTO `tw_user` VALUES (47, '44444', '2a2af10e67e7e2a49fb2ed6e45ffa227', '', '', 1, 0, 1, '1', '2021-07-13 11:16:55', '2021-12-02 13:30:36', NULL, NULL, 1);
INSERT INTO `tw_user` VALUES (48, '55555', '2a2af10e67e7e2a49fb2ed6e45ffa227', '', '', 1, 0, 1, '1', '2021-07-13 11:16:58', '2021-12-02 13:30:34', NULL, NULL, 1);
INSERT INTO `tw_user` VALUES (49, '66666', '2a2af10e67e7e2a49fb2ed6e45ffa227', '', '', 1, 0, 1, '1', '2021-07-13 11:17:02', '2021-12-02 13:30:32', NULL, NULL, 1);
INSERT INTO `tw_user` VALUES (50, '77777', '2a2af10e67e7e2a49fb2ed6e45ffa227', '312312', '18660738669', 1, 0, 1, '1', '2021-07-13 11:17:07', '2021-12-02 13:30:30', NULL, NULL, 1);
INSERT INTO `tw_user` VALUES (53, 'tanwei22223', '2a2af10e67e7e2a49fb2ed6e45ffa227', '321321', '', 1, 0, 1, '1', '2021-08-12 15:28:24', '2021-11-10 19:58:53', NULL, NULL, 0);
INSERT INTO `tw_user` VALUES (54, '谭伟测试', '2a2af10e67e7e2a49fb2ed6e45ffa227', '', '', 1, 0, 1, '1', '2021-11-26 16:06:53', NULL, NULL, NULL, 0);
INSERT INTO `tw_user` VALUES (55, 'suiji', '2a2af10e67e7e2a49fb2ed6e45ffa227', 'suiji', '', 1, 0, 1, '1', '2021-12-02 13:31:02', NULL, NULL, NULL, 0);
INSERT INTO `tw_user` VALUES (56, 'suiji2', '2a2af10e67e7e2a49fb2ed6e45ffa227', 'suiji2', '', 1, 0, 1, '1', '2021-12-03 14:13:03', NULL, NULL, NULL, 0);
INSERT INTO `tw_user` VALUES (60, '11111', '2a2af10e67e7e2a49fb2ed6e45ffa227', '3', '', 1, 0, 1, '1', '2021-12-10 15:12:47', '2021-12-10 15:13:07', NULL, NULL, 1);
COMMIT;

-- ----------------------------
-- Table structure for tw_user_role
-- ----------------------------
DROP TABLE IF EXISTS `tw_user_role`;
CREATE TABLE `tw_user_role` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=250 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of tw_user_role
-- ----------------------------
BEGIN;
INSERT INTO `tw_user_role` VALUES (4, 10, 2, '2019-10-14 10:37:38');
INSERT INTO `tw_user_role` VALUES (10, 13, 2, '2019-10-18 08:41:25');
INSERT INTO `tw_user_role` VALUES (12, 15, 3, '2019-11-01 10:32:08');
INSERT INTO `tw_user_role` VALUES (169, 49, 12, '2021-08-12 15:13:02');
INSERT INTO `tw_user_role` VALUES (170, 48, 12, '2021-08-12 15:13:02');
INSERT INTO `tw_user_role` VALUES (171, 47, 12, '2021-08-12 15:13:02');
INSERT INTO `tw_user_role` VALUES (201, 50, 10, '2021-08-12 16:05:06');
INSERT INTO `tw_user_role` VALUES (202, 40, 1, '2021-08-12 16:05:26');
INSERT INTO `tw_user_role` VALUES (203, 39, 1, '2021-08-12 16:05:26');
INSERT INTO `tw_user_role` VALUES (204, 38, 1, '2021-08-12 16:05:26');
INSERT INTO `tw_user_role` VALUES (205, 37, 1, '2021-08-12 16:05:26');
INSERT INTO `tw_user_role` VALUES (206, 31, 1, '2021-08-12 16:05:26');
INSERT INTO `tw_user_role` VALUES (207, 23, 1, '2021-08-12 16:05:26');
INSERT INTO `tw_user_role` VALUES (208, 22, 1, '2021-08-12 16:05:26');
INSERT INTO `tw_user_role` VALUES (209, 21, 1, '2021-08-12 16:05:26');
INSERT INTO `tw_user_role` VALUES (210, 20, 1, '2021-08-12 16:05:26');
INSERT INTO `tw_user_role` VALUES (211, 18, 1, '2021-08-12 16:05:26');
INSERT INTO `tw_user_role` VALUES (213, 1, 1, '2021-08-12 16:05:26');
INSERT INTO `tw_user_role` VALUES (216, 53, 1, '2021-08-12 16:34:16');
INSERT INTO `tw_user_role` VALUES (217, 53, 2, '2021-08-12 16:34:16');
INSERT INTO `tw_user_role` VALUES (218, 53, 8, '2021-08-12 16:34:16');
INSERT INTO `tw_user_role` VALUES (219, 53, 9, '2021-08-12 16:34:58');
INSERT INTO `tw_user_role` VALUES (220, 50, 9, '2021-08-12 16:34:58');
INSERT INTO `tw_user_role` VALUES (225, 16, 1, '2021-08-20 10:22:39');
INSERT INTO `tw_user_role` VALUES (244, 2, 10, '2021-11-10 19:57:32');
INSERT INTO `tw_user_role` VALUES (245, 54, 16, '2021-11-26 16:06:53');
INSERT INTO `tw_user_role` VALUES (246, 55, 17, '2021-12-02 13:31:02');
INSERT INTO `tw_user_role` VALUES (247, 56, 17, '2021-12-03 14:13:03');
INSERT INTO `tw_user_role` VALUES (249, 60, 17, '2021-12-10 15:13:00');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
