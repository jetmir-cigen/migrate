import { BaseTextTemplate } from './Base.TT';

export class InjuryReportFormFilledForManagerTextTemplate extends BaseTextTemplate {
  public static readonly code = 'INJURY_REPORT_FORM_FILLED_FOR_MANAGER';

  constructor(
    public subject: {
      employeeName: string;
    },
    public text: {
      userName: string;
      employeeName: string;
      assetName: string;
      url: string;
      customerName: string;
    },
  ) {
    super('EMAIL');
  }
}
