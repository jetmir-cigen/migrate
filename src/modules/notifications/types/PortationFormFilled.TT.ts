import { BaseTextTemplate } from './Base.TT';

export class PortationFormFilledTextTemplate extends BaseTextTemplate {
  public static readonly code = 'PORTATION_FORM_FILLED';

  constructor(
    public subject: {
      companyName: string;
      employeeName: string;
    },
    public text: {
      employeeName: string;
      companyName: string;
      url: string;
    },
  ) {
    super();
  }
}
