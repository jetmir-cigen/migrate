import { BaseTextTemplate } from './Base.TT';

export class TerminationFormDunnignTextTemplate extends BaseTextTemplate {
  public static readonly code = 'TERMINATION_FORM_DUNNING';

  constructor(
    public text: {
      companyName: string;
      link: string;
    },
  ) {
    super('SMS');
  }
}
