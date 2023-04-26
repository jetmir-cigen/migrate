declare global {
  namespace Express {
    interface RegularUser {
      id: number;
      role: 'user';
    }
    interface ManagerUser {
      id: number;
      role: 'manager';
    }
    interface AdminUser {
      id: number;
      role: 'admin';
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
