import { BaseTextTemplate } from './Base.TT';

export class TerminationFormFilledTextTemplate extends BaseTextTemplate {
  public static readonly code = 'TERMINATION_FORM_FILLED';

  constructor(
    public subject: {
      companyName: string;
      employeePhoneNumber: string;
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
