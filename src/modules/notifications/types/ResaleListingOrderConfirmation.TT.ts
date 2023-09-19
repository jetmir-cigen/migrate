import { BaseTextTemplate } from './Base.TT';

export class ResaleListingOrderConfirmationTextTemplate extends BaseTextTemplate {
  public static readonly code = 'RESALE_LISTING_ORDER_CONFIRMATION';

  constructor(
    public text: {
      userName: string;
      productName: string;
      price: string;
    },
  ) {
    super('EMAIL');
  }
}
