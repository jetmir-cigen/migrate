import { BaseTextTemplate } from './Base.TT';

export class InjuryReportApprovedByManagerTextTemplate extends BaseTextTemplate {
  public static readonly code = 'INJURY_REPORT_APPROVED_BY_MANAGER';

  constructor(
    public text: {
      userName: string;
      assetName: string;
      appUrl: string;
      customerName: string;
    },
  ) {
    super('EMAIL');
  }
}
