import { BaseTextTemplate } from './Base.TT';

export class SMSTestTextTemplate extends BaseTextTemplate {
  public static readonly code = 'SMS_TEST';

  constructor(
    public text: {
      userName: string;
    },
  ) {
    super();
  }
}
