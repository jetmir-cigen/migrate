import { BaseTextTemplate } from './Base.TT';

export class DealerDeviceOrderDeliverWithAddressTextTemplate extends BaseTextTemplate {
  public static readonly code = 'DEALER_DEVICE_ORDER_DELIVER_WITH_ADDRESS';

  constructor(
    public text: {
      address: string;
    },
  ) {
    super('SMS');
  }
}
