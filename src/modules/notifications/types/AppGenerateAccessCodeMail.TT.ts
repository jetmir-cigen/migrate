import { BaseTextTemplate } from './Base.TT';

export class AppGenerateAccessCodeMailTextTemplate extends BaseTextTemplate {
  public static readonly code = 'APP_GENERATE_ACCESS_CODE_MAIL';

  constructor(
    public text: {
      accessCode: string;
      duration: string;
      userPhoneNumber: string;
    },
  ) {
    super('EMAIL');
  }
}
