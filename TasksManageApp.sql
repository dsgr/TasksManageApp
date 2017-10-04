/*
Navicat PGSQL Data Transfer

Source Server         : localhos-POSTGRESQL
Source Server Version : 90603
Source Host           : localhost:5432
Source Database       : tasks_manage_app
Source Schema         : public

Target Server Type    : PGSQL
Target Server Version : 90603
File Encoding         : 65001

Date: 2017-10-04 23:38:33
*/


-- ----------------------------
-- Sequence structure for hibernate_sequence
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."hibernate_sequence";
CREATE SEQUENCE "public"."hibernate_sequence"
 INCREMENT 1
 MINVALUE 1
 MAXVALUE 9223372036854775807
 START 180
 CACHE 1;
SELECT setval('"public"."hibernate_sequence"', 180, true);

-- ----------------------------
-- Table structure for authorities
-- ----------------------------
DROP TABLE IF EXISTS "public"."authorities";
CREATE TABLE "public"."authorities" (
"id" int4 DEFAULT nextval('hibernate_sequence'::regclass) NOT NULL,
"authority" varchar(50) COLLATE "default" NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of authorities
-- ----------------------------
INSERT INTO "public"."authorities" VALUES ('1', 'ROLE_ADMIN');
INSERT INTO "public"."authorities" VALUES ('2', 'ROLE_MANAGER');
INSERT INTO "public"."authorities" VALUES ('3', 'ROLE_USER');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS "public"."comments";
CREATE TABLE "public"."comments" (
"id" int4 DEFAULT nextval('hibernate_sequence'::regclass) NOT NULL,
"message" text COLLATE "default" NOT NULL,
"date" timestamp(6) DEFAULT now(),
"user_id" int4 NOT NULL,
"task_id" int4 NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO "public"."comments" VALUES ('169', 'Сколько градусов?', '2017-10-04 01:39:00', '119', '168');
INSERT INTO "public"."comments" VALUES ('175', 'около 40', '2017-10-04 20:36:00', '119', '168');
INSERT INTO "public"."comments" VALUES ('179', 'Первый комментарий к заявке "Сходить в магазин"', '2017-10-04 22:39:00', '119', '177');

-- ----------------------------
-- Table structure for task_statuses
-- ----------------------------
DROP TABLE IF EXISTS "public"."task_statuses";
CREATE TABLE "public"."task_statuses" (
"id" int4 DEFAULT nextval('hibernate_sequence'::regclass) NOT NULL,
"name" varchar COLLATE "default",
"description" varchar COLLATE "default"
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of task_statuses
-- ----------------------------
INSERT INTO "public"."task_statuses" VALUES ('1', 'Зарегистрирована', '');
INSERT INTO "public"."task_statuses" VALUES ('2', 'Передана в работу', null);
INSERT INTO "public"."task_statuses" VALUES ('3', 'Выполнена', null);
INSERT INTO "public"."task_statuses" VALUES ('4', 'Отменена', null);

-- ----------------------------
-- Table structure for tasks
-- ----------------------------
DROP TABLE IF EXISTS "public"."tasks";
CREATE TABLE "public"."tasks" (
"id" int4 DEFAULT nextval('hibernate_sequence'::regclass) NOT NULL,
"name" varchar(255) COLLATE "default",
"description" text COLLATE "default",
"task_status_id" int4,
"user_id" int4,
"date_start" timestamp(0),
"date_end" timestamp(6)
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of tasks
-- ----------------------------
INSERT INTO "public"."tasks" VALUES ('168', 'Помыть посуду тёплой водой', 'В мытье посуды очень важно использовать воду нужной температуры.', '3', '28', '2017-12-12 13:00:00', null);
INSERT INTO "public"."tasks" VALUES ('174', 'Почистить картошку', 'Используй нож, руки, кастрюлю и ведро', '2', '28', '2017-12-12 14:00:00', null);
INSERT INTO "public"."tasks" VALUES ('177', 'Сходить в магазин', 'Купить хлеб, батон, молоко и сметану', '2', '119', '2017-11-11 14:11:00', null);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
"id" int4 DEFAULT nextval('hibernate_sequence'::regclass) NOT NULL,
"username" varchar(300) COLLATE "default" NOT NULL,
"password" varchar(500) COLLATE "default" NOT NULL,
"first_name" varchar(50) COLLATE "default",
"last_name" varchar(50) COLLATE "default",
"phone_number" varchar(50) COLLATE "default",
"mail" varchar(100) COLLATE "default"
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" VALUES ('26', 'admin', 'admin', 'Адимнистратор', 'Админович', '375297888266', 'admin@mail.ru');
INSERT INTO "public"."users" VALUES ('27', 'manager', 'manager', 'Менеджер', 'Менеджорский', '375297323635', 'manager@tut.by');
INSERT INTO "public"."users" VALUES ('28', 'user', 'user', 'Пользователь', 'Пользовательский', '375339513575', 'user@user.ru');
INSERT INTO "public"."users" VALUES ('119', 'poly', 'poly', 'Многоправный', 'Многоправченский', '335502', 'poly@tut.by');

-- ----------------------------
-- Table structure for users_to_authorities
-- ----------------------------
DROP TABLE IF EXISTS "public"."users_to_authorities";
CREATE TABLE "public"."users_to_authorities" (
"user_id" int4 NOT NULL,
"authority_id" int4 NOT NULL
)
WITH (OIDS=FALSE)

;

-- ----------------------------
-- Records of users_to_authorities
-- ----------------------------
INSERT INTO "public"."users_to_authorities" VALUES ('26', '1');
INSERT INTO "public"."users_to_authorities" VALUES ('27', '2');
INSERT INTO "public"."users_to_authorities" VALUES ('28', '3');
INSERT INTO "public"."users_to_authorities" VALUES ('119', '1');
INSERT INTO "public"."users_to_authorities" VALUES ('119', '2');
INSERT INTO "public"."users_to_authorities" VALUES ('119', '3');

-- ----------------------------
-- Alter Sequences Owned By 
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table authorities
-- ----------------------------
ALTER TABLE "public"."authorities" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table comments
-- ----------------------------
ALTER TABLE "public"."comments" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table task_statuses
-- ----------------------------
ALTER TABLE "public"."task_statuses" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tasks
-- ----------------------------
ALTER TABLE "public"."tasks" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD UNIQUE ("username");
ALTER TABLE "public"."users" ADD UNIQUE ("mail");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table users_to_authorities
-- ----------------------------
CREATE INDEX "fki_user_roles_fk1" ON "public"."users_to_authorities" USING btree ("authority_id");

-- ----------------------------
-- Primary Key structure for table users_to_authorities
-- ----------------------------
ALTER TABLE "public"."users_to_authorities" ADD PRIMARY KEY ("user_id", "authority_id");

-- ----------------------------
-- Foreign Key structure for table "public"."comments"
-- ----------------------------
ALTER TABLE "public"."comments" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."comments" ADD FOREIGN KEY ("task_id") REFERENCES "public"."tasks" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Key structure for table "public"."tasks"
-- ----------------------------
ALTER TABLE "public"."tasks" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."tasks" ADD FOREIGN KEY ("task_status_id") REFERENCES "public"."task_statuses" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Key structure for table "public"."users_to_authorities"
-- ----------------------------
ALTER TABLE "public"."users_to_authorities" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."users_to_authorities" ADD FOREIGN KEY ("authority_id") REFERENCES "public"."authorities" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
