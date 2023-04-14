declare global {
  namespace Express {
    interface RegularUser {
      uid: number;
      role: 'user';
    }
    interface ManagerUser {
      uid: number;
      role: 'manager';
    }
    interface AdminUser {
      uid: number;
      role: 'admin';
    }

    type User = RegularUser | ManagerUser | AdminUser;

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
