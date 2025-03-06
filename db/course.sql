/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80100
 Source Host           : 192.168.1.29:3306
 Source Schema         : course

 Target Server Type    : MySQL
 Target Server Version : 80100
 File Encoding         : 65001

 Date: 06/03/2025 17:09:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `created_at` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `update_at` datetime(0) NULL DEFAULT NULL,
  `if_del` int(0) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, '前端开发', NULL, '2025-03-06 16:02:10', NULL, 0);
INSERT INTO `category` VALUES (2, '后端开发', NULL, '2025-03-06 16:02:15', NULL, 0);
INSERT INTO `category` VALUES (3, '运维部署', NULL, '2025-03-06 16:02:24', NULL, 0);
INSERT INTO `category` VALUES (4, '移动开发', NULL, '2025-03-06 16:02:30', NULL, 0);
INSERT INTO `category` VALUES (5, 'AI/机器学习', NULL, '2025-03-06 16:02:42', NULL, 0);
INSERT INTO `category` VALUES (6, '其他', NULL, '2025-03-06 16:02:49', NULL, 0);

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `category_id` int(0) NULL DEFAULT 0,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `user_id` int(0) NULL DEFAULT NULL,
  `create_at` datetime(0) NULL DEFAULT NULL,
  `update_at` datetime(0) NULL DEFAULT NULL,
  `if_del` int(0) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `category_id`(`category_id`) USING BTREE,
  CONSTRAINT `course_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `if_del` int(0) NULL DEFAULT 0,
  `create_at` datetime(0) NULL DEFAULT NULL,
  `update_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE,
  UNIQUE INDEX `user_name`(`user_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '123', '949661474@qq.com', NULL, '$2b$10$8Ltf5SWFJSeqFUXHyqM0jO9v5JtrGu5kOtshRGVgzCLdwzoPZTy1O', 0, '2025-02-26 03:28:34', '2025-02-26 03:28:34');
INSERT INTO `user` VALUES (5, '1234', '9496614742@qq.com', NULL, '$2b$10$rKn2yIMo18h1imK7u.ARdOeJXNXZBG6pgEJZweUxWNWPtnNgbWHcO', 0, '2025-02-26 06:56:55', '2025-02-26 06:56:55');
INSERT INTO `user` VALUES (16, 'test', 'test', NULL, '$2b$10$Y1MTf70S8gymRcmLl9FQxO5XH5YkpHp7BI35sO451JXkSWyVRBYo.', 0, '2025-03-05 08:04:45', '2025-03-05 08:04:45');

SET FOREIGN_KEY_CHECKS = 1;
