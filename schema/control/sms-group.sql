CREATE TABLE `sms_group` (
    `id` int NOT NULL AUTO_INCREMENT,
    `user_id` int NOT NULL,
    `customer_id` int NOT NULL,
    `name` varchar(100) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 624 DEFAULT CHARSET = utf8mb3