import { BaseTextTemplate } from './Base.TT';

export class ManagerPasswordGenerated extends BaseTextTemplate {
  public static readonly code = 'MANAGER_PASSWORD_GENERATED';

  constructor(
    public text: {
      userPhoneNumber: string;
      newPassword: string;
    },
  ) {
    super('SMS');
  }
}
