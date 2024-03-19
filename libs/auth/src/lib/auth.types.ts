import { Request } from 'express';

export const UserRoles = {
  ADMIN: 'admin',
  CUSTOMER_HEAD_ADMIN: 'customer_head_admin',
  CUSTOMER_ADMIN: 'customer_admin',
  DEPARTMENT_HEAD: 'department_head',
  DEPARTMENT_HEAD_CORP: 'department_head_corp',
  MOBILE_USER: 'mobile_user',
  SELLER: 'seller',
  MANAGEMENT: 'management',
  DEALER: 'dealer',
  REPORT_USER: 'report_user',
  IT_USER: 'it_user',
  FINANCING_AGENT: 'financing_agent',
} as const;

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

export interface IUser {
  uid: number;
  cid: number;
  chid: number;
  wlid: number;
  role: UserRole;
}

export interface IAuthToken {
  jwt: string;
  expiresAt: Date;
}

export const SUPER_ADMIN_USERS_GROUP = [
  UserRoles.ADMIN,
  UserRoles.CUSTOMER_HEAD_ADMIN,
];

export const ADMIN_USERS_GROUP = [
  ...SUPER_ADMIN_USERS_GROUP,
  UserRoles.CUSTOMER_ADMIN,
];

export const DEPARTMENT_USERS_GROUP = [
  UserRoles.DEPARTMENT_HEAD,
  UserRoles.DEPARTMENT_HEAD_CORP,
];

export interface IRequestWithUser extends Request {
  user: IUser;

  authToken: IAuthToken;
}
