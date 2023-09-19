import { BaseTextTemplate } from './Base.TT';

export class TerminationTextTemplate extends BaseTextTemplate {
  public static readonly code = 'TERMINATION';

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
    super('EMAIL');
  }
}
