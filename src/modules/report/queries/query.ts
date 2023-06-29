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
ORDER BY name
`;

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

export const accountQueryString = `SELECT co.code                        AS number
     , co.name
     , co.employee_no
     , co.accounting_code
     , d.name                         AS department_name
     , d.code                         AS department_code
     , co.dim_1                       AS DIM1
     , co.dim_2                       AS DIM2
     , co.dim_3                       AS DIM3
     , co.dim_4                       AS DIM4
     , MAX(ir.from_period)            AS from_period
     , MAX(ir.to_period)              AS to_period
     , d.project
     , SUM(ir.amount)                 AS net_amount
     , SUM(ir.vat_amount)             AS vat_amount
     , SUM(ir.vat_amount + ir.amount) AS total_amount
     , c.org_no
     , c.name                            company_name
     , i.invoice_no
     , i.vendor_net_amount
     , i.vendor_vat_amount
     , i.vendor_gross_amount

FROM control.customer c

         INNER JOIN control.invoice i
                    ON i.customer_id = c.id

         INNER JOIN control.cost_object co
                    ON c.id = co.customer_id

         LEFT JOIN control.department d
                   ON d.id = co.department_id

         INNER JOIN control.invoice_row ir
                    ON ir.cost_object_id = co.id
                        AND ir.invoice_id = i.id

WHERE (c.id = ? OR c.customer_head_id = ?)
  AND DATE(i.date) >= ?
  AND DATE(i.date) <= ?

  AND i.vendor_id != 1
  AND ir.product_id != 2141

GROUP BY co.id
       , co.code
       , co.name
       , co.dim_1
       , co.dim_2
       , co.dim_3
       , co.dim_4
       , co.employee_no
       , co.accounting_code
       , d.name
       , d.code
       , d.project
       , c.org_no
       , c.name
       , i.invoice_no
       , i.vendor_net_amount
       , i.vendor_vat_amount
       , i.vendor_gross_amount

ORDER BY co.name
`;

export const offBoardingQueryString = `
    SELECT c.name      AS customer_name,
           co.name     AS user_name,
           co.code     AS user_number,
           co.employee_no,
           ssot.termination_date,
           CASE sso.status
               WHEN 0 THEN 'NEW'
               WHEN 1 THEN 'WORKING'
               WHEN 2 THEN 'COMPLETED'
               WHEN 5 THEN 'CANCELLED'
               ELSE 'UNKNOWN'
               END
                       AS termination_status,
           a.asset_description,
           odp.amount  AS buyout_price,
           asts.status AS asset_status
    FROM control.subscription_service_order_termination ssot
             JOIN control.subscription_service_orders sso ON sso.id = ssot.id
             JOIN control.cost_object co on sso.cost_object_id = co.id
             LEFT JOIN assets.asset a ON co.id = a.cost_object_id
             LEFT JOIN control.customer c ON co.customer_id = c.id
             LEFT JOIN assets.asset_status asts ON a.status_id = asts.id
             LEFT JOIN device_policy.order_downpayment odp ON odp.order_id = a.order_id AND is_buyout = 1

    WHERE (c.id = ? OR c.customer_head_id = ?)

      AND DATE(ssot.termination_date) >= ?
      AND DATE(ssot.termination_date) <= ?
    GROUP BY sso.cost_object_id, a.id, ssot.termination_date
    ORDER BY ssot.termination_date DESC
`;

export const consumptionQueryString = `
SELECT co.code
     , co.name
     , co.employee_no
     , co.benefit_mobile
     , co.benefit_mobile_ceiling
     , SUM(CAST(p.tax_report = 1 AS SIGNED INTEGER) * ir.amount)               AS tax_report_amount
     , SUM(CAST(p.price_type = 'S' AS SIGNED INTEGER) * ir.amount)             AS subscription_amount
     , SUM(CAST(p.price_type = 'O' AS SIGNED INTEGER) * ir.amount)             AS one_time_amount
     , SUM(CAST(p.price_type NOT IN ('S', 'O') AS SIGNED INTEGER) * ir.amount) AS traffic_amount
     , SUM(ir.salary_deduction_amount)                                         AS deduction_amount
     , SUM(ir.amount)                                                          AS total_amount
     , GROUP_CONCAT(DISTINCT (pc.name) ORDER BY pc.name ASC SEPARATOR ', ')    AS emne

FROM control.invoice_row ir

         LEFT JOIN control.product p
                   ON ir.product_id = p.id
         LEFT JOIN control.product_group pg
                   ON p.product_group_id = pg.id
         LEFT JOIN control.product_category pc
                   ON pg.product_category_id = pc.id


         LEFT JOIN control.cost_object co
                   ON ir.cost_object_id = co.id

         LEFT JOIN control.invoice i
                   ON ir.invoice_id = i.id
         INNER JOIN control.customer c
                    ON c.id = co.customer_id

         LEFT JOIN control.customer_product cp
                   ON p.id = cp.product_id
                       AND co.salary_deduction_profile_id = cp.salary_deduction_profile_id


WHERE (c.id = ? OR c.customer_head_id = ?)

  AND DATE(i.date) >= ?
  AND DATE(i.date) <= ?
  AND ir.amount != 0
  AND co.type != 'C'

GROUP BY co.code
       , co.name
       , co.employee_no
       , co.benefit_mobile
       , co.benefit_mobile_ceiling

`;

export const salaryDeductionUsageQueryString = `
 SELECT co.name
     , co.employee_no
     , co.benefit_mobile
     , co.benefit_mobile_ceiling
     , d.code                                                                                               AS department_code
     , d.name                                                                                               AS department_name
     , SUM(ir.salary_deduction_amount) + co.fixed_salary_deduction_amount                                   AS amount
     , SUM(IF(ir.product_id = 2141, ir.vat_amount, ir.salary_deduction_amount / ir.amount * ir.vat_amount)) AS vat
     , COUNT(*)                                                                                             AS posts

FROM invoice_row ir

         INNER JOIN cost_object co
                    ON ir.cost_object_id = co.id

         INNER JOIN invoice i
                    ON ir.invoice_id = i.id
         INNER JOIN customer c
                    ON c.id = co.customer_id

         LEFT JOIN department d
                   ON d.id = co.department_id

WHERE (c.id = ? OR c.customer_head_id = ?)
  AND DATE(i.date) >= ?
  AND DATE(i.date) <= ?
  AND (co.employee_no IS NOT NULL AND TRIM(co.employee_no) != '')
  AND (ir.salary_deduction_amount != 0 OR co.fixed_salary_deduction_amount > 0)
  AND i.vendor_id != 1

GROUP BY co.name
       , co.employee_no
       , co.benefit_mobile
       , co.benefit_mobile_ceiling
       , co.fixed_salary_deduction_amount
       , d.code
       , d.name

HAVING SUM(ir.salary_deduction_amount) + co.fixed_salary_deduction_amount > 0

ORDER BY co.name
`;

export const taxAdvantageQueryString = `
SELECT name
     , employee_no
     , salary_deduction_amount + salary_deduction_amount_vat          AS salary_deduction_amount
     , content_service_amount
     , amount - salary_deduction_amount - salary_deduction_amount_vat AS benefit_amount
     , amount
     , amount - amount_ex_mva                                         AS vat
     , benefit_mobile

FROM (SELECT co.employee_no
           , co.name
           , co.benefit_mobile
           , SUM(ir.amount + CAST(p.vat = 1 AS SIGNED INTEGER) * ir.amount * 0.25)      AS amount
           , SUM(ir.amount)                                                               AS amount_ex_mva
           , SUM(ir.salary_deduction_amount)                                              AS salary_deduction_amount
           , SUM(CAST(p.vat = 1 AS SIGNED INTEGER) * ir.salary_deduction_amount * 0.25) AS salary_deduction_amount_vat
           , SUM(IF(p.tax_report = 1, (ir.amount - ir.salary_deduction_amount) +
                                      CAST(p.vat = 1 AS SIGNED INTEGER) * (ir.amount - ir.salary_deduction_amount) *
                                      0.25, 0))                                         AS content_service_amount
           , COUNT(DISTINCT co.id)                                                        AS cost_elements

      FROM control.invoice_row ir

               LEFT JOIN control.product p
                         ON ir.product_id = p.id
               LEFT JOIN control.product_group pg
                         ON p.product_group_id = pg.id
               LEFT JOIN control.product_category pc
                         ON pg.product_category_id = pc.id


               LEFT JOIN control.cost_object co
                         ON ir.cost_object_id = co.id

               LEFT JOIN control.invoice i
                         ON ir.invoice_id = i.id
               INNER JOIN control.customer c
                          ON c.id = co.customer_id

               LEFT JOIN control.department d
                         ON d.id = co.department_id

      WHERE (c.id = ? OR c.customer_head_id = ?)

        AND YEAR(i.date) = ?
        AND (co.employee_no IS NOT NULL OR co.benefit_mobile = 'F')

      GROUP BY co.employee_no, co.name, c.org_no

      ORDER BY SUM(ir.amount) DESC) AS x
`;
