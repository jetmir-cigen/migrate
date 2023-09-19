import { BaseTextTemplate } from './Base.TT';

export class AppGenerateAccessCodeSmsTextTemplate extends BaseTextTemplate {
  public static readonly code = 'APP_GENERATE_ACCESS_CODE_SMS';

  constructor(
    public text: {
      accessCode: string;
      duration: string;
      userPhoneNumber: string;
    },
  ) {
    super('SMS');
  }
}
