import { UserRolesENUM } from '@/modules/user/user-roles.enum';

export const isDepartmentAdmin = (user: Express.GenericUser) => {
  return [
    UserRolesENUM.DEPARTMENT_HEAD,
    UserRolesENUM.DEPARTMENT_HEAD_CORP,
  ].includes(user.role);
};
