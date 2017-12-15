# ************************************************************
# Database: pithyMark
# Generation Time: 2017-11-26 11:26:55 +0000
# ************************************************************

# ------------------------------------------------------------
DROP TABLE IF EXISTS `pmb_options`;
CREATE TABLE `pmb_options` (
  `optkey` varchar(255) NOT NULL DEFAULT '',
  `optvalue` text,
  `optdesc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`optkey`),
  UNIQUE KEY `optkey` (`optkey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `pmb_options` (`optkey`, `optvalue`, `optdesc`)
VALUES
  ('description','A Simple & Fast Node Bloging Platform Base On koa2','网站描述'),
  ('keywords','www,koa2,nodejs','网站关键字'),
  ('favicon_url','','favicon'),
  ('logo_url','/public/images/logo.jpg','logo 地址'),
  ('miitbeian','www20171126','网站备案号'),
  ('postsListSize','10','文章一页显示的条数'),
  ('password_salt','pithyMarkBlog','密码 salt，网站安装的时候随机生成一个'),
  ('site_url','http://localhost:3000','网站地址'),
  ('theme','default','主题名称'),
  ('title','pithyMarkBlog','网站标题');

  
# ------------------------------------------------------------
DROP TABLE IF EXISTS `pmb_options_sys`;
CREATE TABLE `pmb_options_sys` (
  `optkey` varchar(255) NOT NULL DEFAULT '',
  `optvalue` text,
  `optdesc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`optkey`),
  UNIQUE KEY `optkey` (`optkey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `pmb_options_sys` (`optkey`, `optvalue`, `optdesc`)
VALUES
  ('founder_pass','96e79218965eb72c92a549dd5a330112','创始人密码'),
  ('upload',NULL,'上传配置，默认为本地，也可以选择七牛云');
  
  
# ------------------------------------------------------------
DROP TABLE IF EXISTS `pmb_posts`;
CREATE TABLE `pmb_posts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `posttype` tinyint(11) NOT NULL DEFAULT '0' COMMENT '0 为文章，1 为页面，9 系统页面',
  `status` tinyint(11) NOT NULL DEFAULT '0' COMMENT '0 为草稿，1 为待审核，2 为已拒绝，3 为已经发布，4 为私有不公开，9 删除',
  `postcate` varchar(32) DEFAULT '未分类',
  `title` varchar(255) NOT NULL,
  `pathname` varchar(255) NOT NULL DEFAULT '' COMMENT 'URL 的 pathname',
  `summary` longtext COMMENT '摘要',
  `markdown_content` longtext,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_bin,
  `allow_comment` tinyint(11) NOT NULL DEFAULT '0' COMMENT '1 为允许， 0 为不允许',
  `create_time` datetime NOT NULL DEFAULT NOW(),
  `update_time` datetime,
  `options` text COMMENT '一些选项，JSON 结构',
  PRIMARY KEY (`id`),
  KEY `create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;  
  
INSERT INTO `pmb_posts` (`posttype`,`title`,`pathname`)
VALUES
  (9, '首页', 'home'),
  (9, '分类', 'categories'),
  (9, '归档', 'archives'),
  (1, '关于', 'about'),
  (0, '创始人密码','pathname1'),
  (0, '上传可以选择七牛云','pathname2');

# ------------------------------------------------------------
DROP TABLE IF EXISTS `pmb_post_history`;
CREATE TABLE `pmb_post_history` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int(11) DEFAULT NULL,
  `make_time` datetime NOT NULL,
  `markdown_content` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;  
  
  
# ------------------------------------------------------------
DROP TABLE IF EXISTS `pmb_cate`;
CREATE TABLE `pmb_cate` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `pid` int(11) NOT NULL DEFAULT '0',
  `pathname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `pmb_cate` (`name`)
VALUES
  ('日志');
