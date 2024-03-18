import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
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
