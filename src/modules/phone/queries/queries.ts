export const findAllActiveNumbersQuery = `
SELECT co.id,
       co.name,
       co.country_id,
       co.code                                    AS phone_number,
       CONCAT(IFNULL(co.country_id, ''), co.code) AS full_phone_number,
       d.id                                       AS department_id,
       d.name                                     AS department_name,
       sdp.id                                     AS salary_deduction_profile_id,
       sdp.name                                   AS salary_deduction_profile_name,
       'NO'                                       AS is_on_phone_book,
       NULL                                       AS group_id,
       NULL                                       AS group_name
FROM cost_object co
         JOIN department d ON d.id = co.department_id
         LEFT JOIN salary_deduction_profile sdp ON sdp.id = co.salary_deduction_profile_id
         INNER JOIN view.active_mobile_user amu ON amu.id = co.id
         INNER JOIN view.manager_access_department mad ON mad.department_id = amu.department_id
WHERE mad.user_id = ?

UNION

SELECT id,
       name,
       country_id,
       phone_number,
       CONCAT(IFNULL(country_id, ''), phone_number) AS full_phone_number,
       NULL,
       NULL,
       NULL,
       NULL,
       'YES',
       NULL,
       NULL
FROM sms_phone_book
WHERE user_id = ?

UNION

SELECT sms_group_number.id,
       sms_group_number.name,
       sms_group_number.country_id,
       sms_group_number.number                                                  AS phone_number,
       CONCAT(IFNULL(sms_group_number.country_id, ''), sms_group_number.number) AS full_phone_number,
       NULL,
       NULL,
       NULL,
       NULL,
       'NO',
       sms_group.id                                                             AS group_id,
       sms_group.name                                                           AS group_name
FROM sms_group_number
         JOIN sms_group ON sms_group_number.group_id = sms_group.id
WHERE sms_group.user_id = ?`;
