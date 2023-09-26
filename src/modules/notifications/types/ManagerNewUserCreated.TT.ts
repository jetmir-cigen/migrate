import { BaseTextTemplate } from './Base.TT';

export class ManagerNewUserCreated extends BaseTextTemplate {
  public static readonly code = 'MANAGER_NEW_USER_CREATED';

  constructor(
    public text: {
      userPhoneNumber: string;
      newPassword: string;
    },
  ) {
    super();
  }
}
