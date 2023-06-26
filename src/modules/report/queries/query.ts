export const groupByOrder = `
SELECT name,
        employee_no,
        phone_no,
        dim_1,
        co_accounting_code,
        department_code,
        department_name,
        model,
        IF(
                is_buyout = 1,
                DATE_FORMAT(payment_date, '%Y-%m-%d'),
                DATE_FORMAT(order_date, '%Y-%m-%d')
        ) AS order_date,
        DATE_FORMAT(order_update, '%Y-%m-%d') AS order_update,
        delivery_date,
        down_payments,
        cover_amount,
        AVG(total_amount - cover_amount) AS remainder_amount,
        AVG(total_amount) AS total_amount,
        SUM(amount) AS amount,
        is_buyout,
        down_payment.customer_id,
        customer_name,
        customer_head_id,
        IF(
                is_buyout = 1
                AND cse.salary_deduction_code_buyout IS NOT NULL,
                cse.salary_deduction_code_buyout,
                cse.salary_deduction_code_device
        ) AS accounting_code,
        cse.project_device,
        cse.department_override_device
FROM (
                SELECT co.name,
                        co.employee_no,
                        co.dim_1,
                        co.code AS phone_no,
                        co.accounting_code AS co_accounting_code,
                        d.code AS department_code,
                        d.name AS department_name,
                        product.model,
                        dpod.payment_date,
                        dpo.order_date,
                        dpo.order_update,
                        dpo.delivery_date,
                        dpo.down_payments,
                        dpo.total_amount,
                        dpo.total_amount - dpo.remainder_amount AS cover_amount,
                        dpod.amount,
                        dpod.is_buyout,
                        c.name AS customer_name,
                        c.id AS customer_id,
                        c.customer_head_id
                FROM device_policy.order_downpayment dpod
                        LEFT JOIN control.cost_object co ON dpod.cost_object_id = co.id
                        JOIN control.customer c ON c.id = co.customer_id
                        LEFT JOIN device_policy.order dpo ON dpod.order_id = dpo.id
                        LEFT JOIN device_policy.product product ON dpo.product_id = product.id
                        LEFT JOIN department d ON d.id = co.department_id
                WHERE (
                                c.id = ?
                                OR c.customer_head_id = ?
                        )
                        AND DATE(dpod.payment_date) >= ?
                        AND DATE(dpod.payment_date) <= ?
                UNION
                SELECT co.name,
                        co.employee_no,
                        co.dim_1,
                        co.code AS phone_no,
                        co.accounting_code AS co_accounting_code,
                        d.code,
                        d.name AS department_name,
                        a.asset_description AS model,
                        odp.date AS payment_date,
                        o.order_date,
                        o.updated AS order_update,
                        o.DeliveredDate AS delivery_date,
                        o.down_payments,
                        o.cover_amount + o.remainder_amount AS total_amount,
                        o.cover_amount,
                        odp.amount,
                        odp.is_buyout,
                        c.name AS customer_name,
                        c.id AS customer_id,
                        c.customer_head_id
                FROM ecom.order_down_payment odp
                        LEFT JOIN control.cost_object co ON odp.cost_object_id = co.id
                        JOIN control.customer c ON c.id = co.customer_id
                        LEFT JOIN control.department d ON d.id = co.department_id
                        LEFT JOIN ecom.orders o ON odp.order_id = o.id
                        LEFT JOIN assets.asset a ON a.id = odp.asset_id
                WHERE (
                                c.id = ?
                                OR c.customer_head_id = ?
                        )
                        AND odp.is_active = 1
                        AND DATE(odp.date) >= ?
                        AND DATE(odp.date) <= ?
                GROUP BY odp.id
        ) AS down_payment
        LEFT JOIN control.customer_setup_export cse ON down_payment.customer_id = cse.customer_id
GROUP BY name,
        employee_no,
        department_code,
        department_name,
        order_date,
        order_update,
        delivery_date,
        total_amount,
        cover_amount,
        down_payments,
        is_buyout,
        model
ORDER BY name`;

export const groupByEmployeeNo = `
SELECT employee_no,
        amount,
        cse.salary_deduction_code_device AS accounting_code
FROM (
                SELECT co.employee_no,
                        co.customer_id,
                        dpod.amount AS amount
                FROM device_policy.order_downpayment dpod
                        LEFT JOIN control.cost_object co ON dpod.cost_object_id = co.id
                        JOIN control.customer c ON c.id = co.customer_id
                        LEFT JOIN department d ON d.id = co.department_id
                WHERE (
                                c.id = ?
                                OR c.customer_head_id = ?
                        )
                        AND DATE(dpod.payment_date) >= ?
                        AND DATE(dpod.payment_date) <= ?
                UNION
                SELECT co.employee_no,
                        co.customer_id,
                        odp.amount AS amount
                FROM ecom.order_down_payment odp
                        LEFT JOIN cost_object co ON odp.cost_object_id = co.id
                        JOIN customer c ON c.id = co.customer_id
                        LEFT JOIN department d ON d.id = co.department_id
                WHERE (
                                c.id = ?
                                OR c.customer_head_id = ?
                        )
                        AND odp.is_active = 1
                        AND DATE(odp.date) >= ?
                        AND DATE(odp.date) <= ?
                GROUP BY co.employee_no
        ) AS employee
        LEFT JOIN control.customer_setup_export cse ON employee.customer_id = cse.customer_id
GROUP BY employee_no
ORDER BY employee_no`;
