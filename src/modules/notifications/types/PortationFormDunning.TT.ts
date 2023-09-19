import { BaseTextTemplate } from './Base.TT';

export class PortationFormDunningTextTemplate extends BaseTextTemplate {
  public static readonly code = 'PORTATION_FORM_DUNNING';

  constructor(
    public text: {
      companyName: string;
      link: string;
    },
  ) {
    super('SMS');
  }
}
