import { BaseTextTemplate } from './Base.TT';

export class InjuryReportFormCreatedTextTemplate extends BaseTextTemplate {
  public static readonly code = 'INJURY_REPORT_FORM_CREATED';

  constructor(
    public subject: {
      assetName: string;
    },
    public text: {
      userName: string;
      assetName: string;
      url: string;
      customerName: string;
    },
  ) {
    super();
  }
}
