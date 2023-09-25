import { BaseTextTemplate } from './Base.TT';

export class AssetReturnDunningTextTemplate extends BaseTextTemplate {
  public static readonly code = 'ASSET_RETURN_DUNNING';

  constructor(
    public text: {
      assetDescription: string;
      companyName: string;
    },
  ) {
    super();
  }
}
