import { BaseTextTemplate } from './Base.TT';

export class DeviceOrderManagerNewOrderTextTemplate extends BaseTextTemplate {
  public static readonly code = 'DEVICE_ORDER_MANAGER_NEW_ORDER';

  constructor(
    public text: {
      userName: string;
      employeeName: string;
    },
  ) {
    super();
  }
}
