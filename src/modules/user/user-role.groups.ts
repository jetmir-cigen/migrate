import { UserRolesENUM } from './user-roles.enum';

export const SUPER_ADMIN_USERS_GROUP = [
  UserRolesENUM.ADMIN,
  UserRolesENUM.CUSTOMER_HEAD_ADMIN,
];

export const ADMIN_USERS_GROUP = [
  ...SUPER_ADMIN_USERS_GROUP,
  UserRolesENUM.CUSTOMER_ADMIN,
];

export const DEPARTMENT_USERS_GROUP = [
  UserRolesENUM.DEPARTMENT_HEAD,
  UserRolesENUM.DEPARTMENT_HEAD_CORP,
];
