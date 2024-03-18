import { BaseTextTemplate } from './Base.TT';

export class AuthorizationTextTemplate extends BaseTextTemplate {
  public static readonly code = 'AUTHORIZATION';

  constructor(
    public subject: {
      userNumber: string;
    },
    public text: {
      customerName: string;
      userNumber: string;
      userName: string;
      organizationNumber: string;
    },
  ) {
    super();
  }
}
