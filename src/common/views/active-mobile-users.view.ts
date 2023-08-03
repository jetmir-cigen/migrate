import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  expression: `
    create or replace
    algorithm = UNDEFINED view \`view\`.\`active_mobile_user\` as
    select
        \`co\`.\`id\` as \`id\`,
        \`co\`.\`country_id\` as \`country_id\`,
        \`co\`.\`code\` as \`phone_number\`,
        \`co\`.\`name\` as \`name\`,
        \`co\`.\`email\` as \`email\`,
        \`co\`.\`employee_no\` as \`employee_no\`,
        if((\`co\`.\`locale\` is null),
        \`view\`.\`c\`.\`locale\`,
        \`co\`.\`locale\`) as \`locale\`,
        \`co\`.\`benefit_mobile\` as \`benefit_type\`,
        \`co\`.\`device_policy_id\` as \`device_policy_id\`,
        \`co\`.\`salary_deduction_profile_id\` as \`salary_deduction_profile_id\`,
        \`co\`.\`hidden\` as \`is_hidden\`,
        \`co\`.\`app_message\` as \`app_message\`,
        \`co\`.\`mass_message_recipient\` as \`mass_message_recipient\`,
        \`co\`.\`fixed_salary_deduction_amount\` as \`fixed_salary_deduction_amount\`,
        \`co\`.\`fixed_salary_deduction_comment\` as \`fixed_salary_deduction_comment\`,
        \`co\`.\`created\` as \`created_date\`,
        \`creator\`.\`id\` as \`creator_user_id\`,
        concat(\`creator\`.\`first_name\`, ' ', \`creator\`.\`last_name\`) as \`creator_name\`,
        \`co\`.\`last_update\` as \`edited_date\`,
        \`editor\`.\`id\` as \`editor_user_id\`,
        concat(\`editor\`.\`first_name\`, ' ', \`editor\`.\`last_name\`) as \`editor_name\`,
        \`view\`.\`c\`.\`id\` as \`customer_id\`,
        \`view\`.\`c\`.\`name\` as \`customer_name\`,
        \`view\`.\`c\`.\`status\` as \`customer_status\`,
        \`view\`.\`c\`.\`whitelabel_id\` as \`whitelabel_id\`,
        \`wl\`.\`name\` as \`whitelabel_name\`,
        \`view\`.\`c\`.\`customer_head_id\` as \`customer_head_id\`,
        \`view\`.\`c\`.\`customer_head_name\` as \`customer_head_name\`,
        \`d\`.\`id\` as \`department_id\`,
        \`d\`.\`code\` as \`department_code\`,
        \`d\`.\`name\` as \`department_name\`
    from
        (((((\`cost_object\` \`co\`
    join \`view\`.\`customer\` \`c\` on
        ((\`view\`.\`c\`.\`id\` = \`co\`.\`customer_id\`)))
    join \`department\` \`d\` on
        ((\`d\`.\`id\` = \`co\`.\`department_id\`)))
    join \`whitelabel\` \`wl\` on
        ((\`view\`.\`c\`.\`whitelabel_id\` = \`wl\`.\`id\`)))
    left join \`user\` \`creator\` on
        ((\`co\`.\`created_user_id\` = \`creator\`.\`id\`)))
    left join \`user\` \`editor\` on
        ((\`co\`.\`edited_user_id\` = \`editor\`.\`id\`)))
    where
        ((\`co\`.\`type\` = 'M')
            and (\`co\`.\`mobile_user\` = 1))
  `,
  schema: 'view',
  name: 'view.active_mobile_user',
})
export class ActiveMobileUserView {
  // View columns
  @ViewColumn({ name: 'id' })
  id: number;

  @ViewColumn({ name: 'country_id' })
  countryId: number;

  @ViewColumn({ name: 'phone_number' })
  phoneNumber: string;

  @ViewColumn({ name: 'name' })
  name: string;

  @ViewColumn({ name: 'email' })
  email: string;

  @ViewColumn({ name: 'employee_no' })
  employeeNo: string;

  @ViewColumn({ name: 'locale' })
  locale: string;

  @ViewColumn({ name: 'benefit_type' })
  benefitType: string;

  @ViewColumn({ name: 'device_policy_id' })
  devicePolicyId: number;

  @ViewColumn({ name: 'salary_deduction_profile_id' })
  salaryDeductionProfileId: number;

  @ViewColumn({ name: 'is_hidden' })
  isHidden: boolean;

  @ViewColumn({ name: 'app_message' })
  appMessage: string;

  @ViewColumn({ name: 'mass_message_recipient' })
  massMessageRecipient: string;

  @ViewColumn({ name: 'fixed_salary_deduction_amount' })
  fixedSalaryDeductionAmount: number;

  @ViewColumn({ name: 'fixed_salary_deduction_comment' })
  fixedSalaryDeductionComment: string;

  @ViewColumn({ name: 'created_date' })
  createdDate: Date;

  @ViewColumn({ name: 'creator_user_id' })
  creatorUserId: number;

  @ViewColumn({ name: 'creator_name' })
  creatorName: string;

  @ViewColumn({ name: 'edited_date' })
  editedDate: Date;

  @ViewColumn({ name: 'editor_user_id' })
  editorUserId: number;

  @ViewColumn({ name: 'editor_name' })
  editorName: string;

  @ViewColumn({ name: 'customer_id' })
  customerId: number;

  @ViewColumn({ name: 'customer_name' })
  customerName: string;

  @ViewColumn({ name: 'customer_status' })
  customerStatus: number;

  @ViewColumn({ name: 'whitelabel_id' })
  whitelabelId: number;

  @ViewColumn({ name: 'whitelabel_name' })
  whitelabelName: string;

  @ViewColumn({ name: 'customer_head_id' })
  customerHeadId: number;

  @ViewColumn({ name: 'customer_head_name' })
  customerHeadName: string;

  @ViewColumn({ name: 'department_id' })
  departmentId: number;

  @ViewColumn({ name: 'department_code' })
  departmentCode: string;

  @ViewColumn({ name: 'department_name' })
  departmentName: string;
}
