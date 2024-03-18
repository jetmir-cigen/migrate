import { BaseTextTemplate } from './Base.TT';

export class DealerNewEcomOrderTextTemplate extends BaseTextTemplate {
  public static readonly code = 'DEALER_NEW_ECOM_ORDER';

  constructor(
    public subject: {
      orderId: string;
    },
    public text: {
      orderId: string;
    },
  ) {
    super();
  }
}
