import { BaseTextTemplate } from './Base.TT';

export class InjuryReportAssetUnderRepairTextTemplate extends BaseTextTemplate {
  public static readonly code = 'INJURY_REPORT_ASSET_UNDER_REPAIR';

  constructor(
    public subject: {
      assetDescription: string;
    },
    public text: {
      userName: string;
      customerName: string;
    },
  ) {
    super('EMAIL');
  }
}
