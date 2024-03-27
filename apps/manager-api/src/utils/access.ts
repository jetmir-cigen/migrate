import { IUser, UserRoles } from '@skytech/auth';

export const isDepartmentAdmin = (user: IUser) => {
  return (
    user.role === UserRoles.DEPARTMENT_HEAD ||
    user.role === UserRoles.DEPARTMENT_HEAD_CORP
  );
};
