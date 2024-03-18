import { BaseTextTemplate } from './Base.TT';

export class DealerDeviceOrderCompleteTextTemplate extends BaseTextTemplate {
  public static readonly code = 'DEALER_DEVICE_ORDER_COMPLETE';

  constructor(
    public text: {
      estimatedDelivery: string;
    },
  ) {
    super();
  }
}
