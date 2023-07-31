export const sql = `
-- query_name = users_profile
SELECT
        u.id,
        IF(u.locale IS NULL, c.locale, u.locale) AS locale,
        u.username,
        u.phone_number,
        u.email,
        CONCAT(u.first_name, ' ', u.last_name) AS name,
        c.device_dealer_user_id,
        dp.id IS NOT NULL AS has_device_policy,
        u.is_password_change_required,
        ctr.currency AS currency,
        ctr.id AS country_id,
        c.id AS customer_id,
        c.name AS customer_name
FROM
        control.user u
        JOIN control.customer c ON c.id = u.customer_id
        LEFT JOIN control.country ctr ON c.country_id = ctr.id
        LEFT JOIN control.cost_object co ON co.code = u.phone_number
        LEFT JOIN control.department d ON d.id = co.department_id
        LEFT JOIN control.device_policy dp ON (
                dp.customer_id = c.id
                OR dp.customer_head_id = c.customer_head_id
        )
        AND dp.is_active = 1
WHERE
        u.id = 9061
GROUP BY
        u.id;`;
