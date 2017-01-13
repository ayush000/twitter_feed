CREATE DATABASE twitter;
USE twitter;
CREATE TABLE `tweets` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tweet` varchar(250) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `hashtag` varchar(150) COLLATE utf8mb4_bin NOT NULL DEFAULT '#',
  `logged_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tweet` (`tweet`,`hashtag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
