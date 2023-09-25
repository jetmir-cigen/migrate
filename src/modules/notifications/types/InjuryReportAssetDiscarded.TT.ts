import { BaseTextTemplate } from './Base.TT';

export class InjuryReportAssetDiscardedTextTemplate extends BaseTextTemplate {
  public static readonly code = 'INJURY_REPORT_ASSET_DISCARDED';

  constructor(
    public subject: {
      assetDescription: string;
    },
    public text: {
      userName: string;
      assetDescription: string;
      customerName: string;
    },
  ) {
    super();
  }
}
