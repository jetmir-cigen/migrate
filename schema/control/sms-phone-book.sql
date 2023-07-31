CREATE TABLE `sms_phone_book` (
    `id` int NOT NULL AUTO_INCREMENT,
    `user_id` int NOT NULL,
    `country_id` int DEFAULT '47',
    `phone_number` varchar(30) NOT NULL,
    `name` varchar(120) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `user_id` (`user_id`),
    KEY `sms_phone_book_country_id_fk` (`country_id`),
    CONSTRAINT `sms_phone_book_country_id_fk` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3059 DEFAULT CHARSET = utf8mb3