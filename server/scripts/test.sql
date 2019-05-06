DROP TABLE
IF EXISTS `test`;

CREATE TABLE `test`(
	`id` INT NOT NULL AUTO_INCREMENT ,
  `content` VARCHAR(10) NOT NULL,
	`created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
	PRIMARY KEY(`id`)
) ENGINE = INNODB DEFAULT CHARSET = utf8mb4;