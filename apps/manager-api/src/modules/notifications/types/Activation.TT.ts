import { BaseTextTemplate } from './Base.TT';

export class ActivationTextTemplate extends BaseTextTemplate {
  public static readonly code = 'ACTIVATION';

  constructor(
    public subject: {
      companyName: string;
    },
    public text: {
      userName: string;
      companyName: string;
      dealerLastName: string;
      dealerEmail: string;
      dealerPhoneNumber: string;
      formUrl: string;
      customerName: string;
    },
  ) {
    super();
  }
}
