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
