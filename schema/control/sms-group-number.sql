CREATE TABLE `sms_group_number` (
    `id` int NOT NULL AUTO_INCREMENT,
    `group_id` int NOT NULL,
    `country_id` int DEFAULT NULL,
    `number` varchar(20) NOT NULL,
    `name` varchar(100) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `group_id` (`group_id`, `number`),
    KEY `group_id_2` (`group_id`),
    KEY `sms_group_number_country_id_fk` (`country_id`),
    CONSTRAINT `sms_group_number_country_id_fk` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 9399 DEFAULT CHARSET = utf8mb3