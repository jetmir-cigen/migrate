CREATE TABLE `cost_object` (
    `id` int NOT NULL AUTO_INCREMENT,
    `app_message` text,
    `code` varchar(45) NOT NULL,
    `country_id` int DEFAULT '47',
    `status` char(1) NOT NULL DEFAULT 'A',
    `customer_id` int NOT NULL,
    `type` char(1) NOT NULL,
    `name` varchar(255) DEFAULT NULL,
    `locale` varchar(2) DEFAULT NULL,
    `department_id` int DEFAULT NULL,
    `employee_no` varchar(45) DEFAULT NULL,
    `invoice_info` varchar(255) DEFAULT NULL,
    `email` varchar(100) DEFAULT NULL,
    `benefit_mobile` char(1) NOT NULL DEFAULT 'N',
    `benefit_mobile_ceiling` decimal(10, 2) DEFAULT NULL,
    `benefit_phone` int NOT NULL DEFAULT '0',
    `benefit_data` int NOT NULL DEFAULT '0',
    `has_admin_cost` int NOT NULL DEFAULT '1',
    `contract_date` date DEFAULT NULL,
    `termination_fee` decimal(10, 2) DEFAULT NULL,
    `termination_fee_type` char(1) DEFAULT NULL,
    `note` text,
    `connection_number` varchar(45) DEFAULT NULL,
    `connection_speed` int DEFAULT NULL,
    `accounting_code` varchar(55) DEFAULT NULL,
    `vendor_product_id` int DEFAULT NULL,
    `start_date` date DEFAULT NULL,
    `end_date` date DEFAULT NULL,
    `cost_price` decimal(10, 2) DEFAULT NULL,
    `invoice_price` decimal(10, 2) DEFAULT NULL,
    `benefit_phone_start` date DEFAULT NULL,
    `benefit_phone_end` date DEFAULT NULL,
    `benefit_phone_amount` decimal(10, 2) DEFAULT NULL,
    `benefit_data_start` date DEFAULT NULL,
    `benefit_data_end` date DEFAULT NULL,
    `benefit_data_amount` decimal(10, 2) DEFAULT NULL,
    `fixed_salary_deduction_amount` decimal(8, 2) NOT NULL DEFAULT '0.00',
    `fixed_salary_deduction_comment` text,
    `parent_cost_object_id` int DEFAULT NULL,
    `all_cost_responsible` int NOT NULL DEFAULT '0',
    `salary_deduction_minimum_amount` decimal(10, 2) NOT NULL DEFAULT '0.00',
    `salary_deduction_profile_id` int DEFAULT NULL,
    `mobile_user` int NOT NULL DEFAULT '1',
    `customer_head_admin_id` int DEFAULT NULL,
    `dim_1` varchar(255) DEFAULT NULL,
    `dim_2` varchar(255) DEFAULT NULL,
    `dim_3` varchar(255) DEFAULT NULL,
    `dim_4` varchar(255) DEFAULT NULL,
    `mass_message_recipient` int NOT NULL DEFAULT '1',
    `device_policy_id` int DEFAULT NULL,
    `created` datetime DEFAULT NULL,
    `last_update` datetime DEFAULT NULL,
    `last_invoice` date DEFAULT NULL,
    `hidden` tinyint NOT NULL DEFAULT '0',
    `ad_username` varchar(255) DEFAULT NULL,
    `created_user_id` int DEFAULT NULL,
    `edited_user_id` int DEFAULT NULL,
    `carrier_api_subscription_id` varchar(100) DEFAULT NULL,
    `carrier_api_billingaccount` varchar(100) DEFAULT NULL,
    `carrier_api_subscription_product_code` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_cost_objects_customer_id_code` (`customer_id`, `code`),
    KEY `fk_cost_objects_departments_idx` (`department_id`),
    KEY `as_code_status` (`code`, `status`),
    KEY `lk_benefits_per_employee_no` (
        `employee_no`,
        `benefit_mobile`,
        `benefit_phone`,
        `benefit_data`
    ),
    KEY `department_id` (`department_id`),
    KEY `customer_id` (`customer_id`),
    KEY `type` (`type`),
    KEY `name` (`name`),
    KEY `has_admin_costs_idx` (`has_admin_cost`),
    KEY `accounting_code` (`accounting_code`),
    KEY `salary_deduction_profile_id` (`salary_deduction_profile_id`),
    KEY `employee_no` (`employee_no`),
    KEY `customer_head_admin_id` (`customer_head_admin_id`),
    KEY `hidden` (`hidden`),
    KEY `last_invoice` (`last_invoice`),
    KEY `cost_object_code_email_mobile_user_index` (`code`, `email`, `mobile_user`),
    KEY `cost_object_email_index` (`email`),
    KEY `cost_object_mobile_user_index` (`mobile_user`),
    KEY `cost_object_country_id_fk` (`country_id`),
    CONSTRAINT `cost_object_country_id_fk` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`) ON DELETE
    SET
        NULL ON UPDATE CASCADE,
        CONSTRAINT `fk_cost_objects_customers` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `fk_cost_objects_departments` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE
    SET
        NULL
) ENGINE = InnoDB AUTO_INCREMENT = 279001 DEFAULT CHARSET = utf8mb3