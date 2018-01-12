# ------------------------------------------------------------
DROP TABLE IF EXISTS `tbl_counter`;
CREATE TABLE `tbl_counter` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `host` varchar(32) NOT NULL,
  `cid` varchar(32) NOT NULL,
  `param` varchar(255) DEFAULT NULL,
  `count` int(11) NOT NULL DEFAULT '0',
  `create_time` datetime NOT NULL DEFAULT NOW(),
  `update_time` datetime,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# ------------------------------------------------------------
DROP TABLE IF EXISTS `tbl_counter_log`;
CREATE TABLE `tbl_counter_log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `host` varchar(32) NOT NULL,
  `cid` varchar(32) NOT NULL,
  `param` varchar(255) DEFAULT NULL,
  `call_date` varchar(32) NOT NULL,
  `call_time` varchar(32) NOT NULL,
  `uid` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;