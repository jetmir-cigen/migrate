export const sql = `
-- query_name = find_active_numbers
SELECT MAX(combined.name)                                                            as name,
       MAX(combined.country_id)                                                      as country_id,
       combined.phone_number                                                         as phone_number,
       MAX(combined.department)                                                      as department,
       MAX(combined.salary_deduction_profile)                                        as salary_deduction_profile,
       MAX(CASE WHEN combined.is_on_phone_book IS NOT NULL THEN 'Yes' ELSE 'No' END) as is_on_phone_book,
       MAX(combined.group_name)                                                      as group_name
FROM (SELECT co.name,
             co.country_id,
             co.code  AS phone_number,
             d.name   as department,
             sdp.name as salary_deduction_profile,
             'No'     as is_on_phone_book,
             NULL     as group_name
      FROM cost_object co
               JOIN department d ON d.id = co.department_id
               LEFT JOIN salary_deduction_profile sdp ON sdp.id = co.salary_deduction_profile_id
               INNER JOIN view.active_mobile_user amu ON amu.id = co.id
               INNER JOIN view.manager_access_department mad ON mad.department_id = amu.department_id
      WHERE mad.user_id = 9061

      UNION

      SELECT name,
             country_id,
             phone_number,
             NULL,
             NULL,
             'Yes',
             NULL
      FROM sms_phone_book
      WHERE user_id = 9061

      UNION

      SELECT sms_group_number.name,
             sms_group_number.country_id,
             sms_group_number.number AS phone_number,
             NULL,
             NULL,
             'No',
             sms_group.name          as group_name
      FROM sms_group_number
               JOIN sms_group ON sms_group_number.group_id = sms_group.id
      WHERE sms_group.user_id = 9061) AS combined
         LEFT JOIN sms_phone_book pb ON combined.phone_number = pb.phone_number
GROUP BY phone_number;`;
