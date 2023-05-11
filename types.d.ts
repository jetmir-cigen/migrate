declare global {
  enum UserRoles {
    ADMIN = 'admin',
    MANAGER = 'manager',
    USER = 'user',
  }

  namespace Express {
    interface GenericUser {
      uid: number;
      cid: number;
      chid: number;
      wlid: number;
      role: UserRoles;
    }

    interface RegularUser extends GenericUser {
      id: number;
      role: UserRoles.USER;
    }
    interface ManagerUser extends GenericUser {
      id: number;
      role: UserRoles.MANAGER;
    }
    interface AdminUser extends GenericUser {
      id: number;
      role: UserRoles.ADMIN;
    }

    type User = RegularUser | ManagerUser | AdminUser;

    type AuthUser = {
      iss: string;
      aud: string;
      uid: number;
      coid: number;
      cid: number;
      chid: number;
      wlid: number;
      role: 'admin' | 'manager' | 'user';
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
