CREATE TABLE `country` (
    `id` int NOT NULL,
    `name` varchar(255) NOT NULL,
    `default_whitelabl_id` int DEFAULT NULL,
    `locale` varchar(5) NOT NULL DEFAULT 'no',
    `flag` varchar(5) NOT NULL DEFAULT 'no',
    `currency` varchar(3) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;is_password_change_required