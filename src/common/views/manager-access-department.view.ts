import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  expression: `
    create or replace
    algorithm = UNDEFINED view \`view\`.\`manager_access_department\` as
    select
        \`u\`.\`id\` as \`user_id\`,
        \`u\`.\`username\` as \`username\`,
        \`u\`.\`first_name\` as \`first_name\`,
        \`u\`.\`last_name\` as \`last_name\`,
        \`view\`.\`d\`.\`id\` as \`department_id\`,
        \`view\`.\`d\`.\`name\` as \`department_name\`,
        \`view\`.\`d\`.\`customer_id\` as \`customer_id\`,
        \`view\`.\`d\`.\`customer_name\` as \`customer_name\`,
        \`view\`.\`d\`.\`customer_head_id\` as \`customer_head_id\`,
        \`view\`.\`d\`.\`customer_head_name\` as \`customer_head_name\`
    from
        (((\`user\` \`u\`
    join \`usergroup\` \`ug\` on
        ((\`ug\`.\`id\` = \`u\`.\`usergroup_id\`)))
    join \`view\`.\`customer\` \`c\` on
        ((\`view\`.\`c\`.\`id\` = \`u\`.\`customer_id\`)))
    left join \`view\`.\`department\` \`d\` on
        ((((\`ug\`.\`name\` = 'admin')
            and (\`view\`.\`d\`.\`customer_head_id\` = \`view\`.\`c\`.\`customer_head_id\`))
            or ((\`ug\`.\`name\` = 'customer_head_admin')
                and (\`view\`.\`d\`.\`customer_head_id\` = \`view\`.\`c\`.\`customer_head_id\`))
                or ((\`ug\`.\`name\` = 'customer_admin')
                    and (\`u\`.\`customer_id\` = \`view\`.\`d\`.\`customer_id\`))
                    or ((\`ug\`.\`name\` = 'department_head_corp')
                        and (\`view\`.\`d\`.\`customer_head_id\` = \`view\`.\`c\`.\`customer_head_id\`))
                        or ((\`ug\`.\`name\` = 'department_head')
                            and ((\`view\`.\`d\`.\`user_id\` = \`u\`.\`id\`)
                                or (\`view\`.\`d\`.\`deputy_user_id\` = \`u\`.\`id\`))))))
    where
        ((\`ug\`.\`name\` in ('department_head', 'department_head_corp', 'customer_admin', 'customer_head_admin', 'admin'))
            and (\`view\`.\`c\`.\`status\` in (1, 5)))
  `,
  schema: 'view',
  name: 'view.manager_access_department',
})
export class ManagerAccessDepartmentView {
  // View columns
  @ViewColumn({ name: 'user_id' })
  userId: number;

  @ViewColumn({ name: 'username' })
  username: string;

  @ViewColumn({ name: 'first_name' })
  firstName: string;

  @ViewColumn({ name: 'last_name' })
  lastName: string;

  @ViewColumn({ name: 'department_id' })
  departmentId: number;

  @ViewColumn({ name: 'department_name' })
  departmentName: string;

  @ViewColumn({ name: 'customer_id' })
  customerId: number;

  @ViewColumn({ name: 'customer_name' })
  customerName: string;

  @ViewColumn({ name: 'customer_head_id' })
  customerHeadId: number;

  @ViewColumn({ name: 'customer_head_name' })
  customerHeadName: string;
}
