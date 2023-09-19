import { BaseTextTemplate } from './Base.TT';

export class DeviceOrderRejectedTextTemplate extends BaseTextTemplate {
  public static readonly code = 'DEVICE_ORDER_REJECTED';

  constructor() {
    super('SMS');
  }
}
