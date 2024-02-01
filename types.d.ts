import { UserRolesENUM } from '@/modules/user/user-roles.enum';

declare global {
  enum UserRoles {
    ADMIN = 'admin',
    CUSTOMER_HEAD_ADMIN = 'customer_head_admin',
    CUSTOMER_ADMIN = 'customer_admin',
    DEPARTMENT_HEAD = 'department_head',
    DEPARTMENT_HEAD_CORP = 'department_head_corp',
    MOBILE_USER = 'mobile_user',
    SELLER = 'seller',
    MANAGEMENT = 'management',
    DEALER = 'dealer',
    REPORT_USER = 'report_user',
    IT_USER = 'it_user',
    FINANCING_AGENT = 'financing_agent',
  }

  namespace Express {
    interface GenericUser {
      uid: number;
      cid: number;
      chid: number;
      wlid: number;
      role: UserRolesENUM;
    }

    interface RegularUser extends GenericUser {
      id: number;
      role: UserRolesENUM.USER;
    }
    interface ManagerUser extends GenericUser {
      id: number;
      role: UserRolesENUM.MANAGER;
    }
    interface AdminUser extends GenericUser {
      id: number;
      role: UserRolesENUM.ADMIN;
    }
    interface CustomerAdminUser extends GenericUser {
      id: number;
      role: UserRolesENUM.CUSTOMER_ADMIN;
    }

    type User = RegularUser | ManagerUser | AdminUser | CustomerAdminUser;

    type AuthUser = {
      iss: string;
      aud: string;
      uid: number;
      coid: number;
      cid: number;
      chid: number;
      wlid: number;
      role: 'admin' | 'manager' | 'user' | 'customer_admin';
      iom: false;
      iat: number;
      exp: number;
    };

    interface AuthToken {
      jwt: t.StringJWT;
      expiresAt: Date;
    }

    interface Request {
      authToken?: AuthToken | null;
      user?: User;
    }
  }
}

export {};
