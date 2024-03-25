import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  expression: `
    create or replace
    algorithm = UNDEFINED view \`view\`.\`manager_access_customer\` as
    select
        \`u\`.\`id\` as \`user_id\`,
        \`u\`.\`username\` as \`username\`,
        \`u\`.\`first_name\` as \`first_name\`,
        \`u\`.\`last_name\` as \`last_name\`,
        \`view\`.\`ac\`.\`id\` as \`customer_id\`,
        \`view\`.\`ac\`.\`name\` as \`customer_name\`,
        \`view\`.\`ac\`.\`customer_head_id\` as \`customer_head_id\`,
        \`view\`.\`ac\`.\`customer_head_name\` as \`customer_head_name\`
    from
        (((\`user\` \`u\`
    join \`usergroup\` \`ug\` on
        ((\`ug\`.\`id\` = \`u\`.\`usergroup_id\`)))
    join \`view\`.\`customer\` \`c\` on
        ((\`view\`.\`c\`.\`id\` = \`u\`.\`customer_id\`)))
    left join \`view\`.\`customer\` \`ac\` on
        ((((\`ug\`.\`name\` = 'admin')
            and (\`view\`.\`ac\`.\`customer_head_id\` = \`view\`.\`c\`.\`customer_head_id\`))
            or ((\`ug\`.\`name\` = 'customer_head_admin')
                and (\`view\`.\`ac\`.\`customer_head_id\` = \`view\`.\`c\`.\`customer_head_id\`))
                or ((\`ug\`.\`name\` = 'customer_admin')
                    and (\`u\`.\`customer_id\` = \`view\`.\`ac\`.\`id\`)))))
    where
        ((\`ug\`.\`name\` in ('customer_admin', 'customer_head_admin', 'admin'))
            and (\`view\`.\`c\`.\`status\` in (1, 5)))
  `,
  schema: 'view',
  name: 'view.manager_access_department',
})
export class ManagerAccessCustomerView {
  // View columns
  @ViewColumn({ name: 'user_id' })
  userId: number;

  @ViewColumn({ name: 'username' })
  username: string;

  @ViewColumn({ name: 'first_name' })
  firstName: string;

  @ViewColumn({ name: 'last_name' })
  lastName: string;

  @ViewColumn({ name: 'customer_id' })
  customerId: number;

  @ViewColumn({ name: 'customer_name' })
  customerName: string;

  @ViewColumn({ name: 'customer_head_id' })
  customerHeadId: number;

  @ViewColumn({ name: 'customer_head_name' })
  customerHeadName: string;
}
