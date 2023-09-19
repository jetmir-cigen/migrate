import { BaseTextTemplate } from './Base.TT';

export class DealerDeviceOrderDeliverNoAddressTextTemplate extends BaseTextTemplate {
  public static readonly code = 'DEALER_DEVICE_ORDER_DELIVER_NO_ADDRESS';

  constructor() {
    super('SMS');
  }
}
