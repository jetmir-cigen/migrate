import { BaseTextTemplate } from './Base.TT';

export class DeviceOrderManagerApprovalNeededTextTemplate extends BaseTextTemplate {
  public static readonly code = 'DEVICE_ORDER_MANAGER_APPROVAL_NEEDED';

  constructor(
    public text: {
      managerName: string;
    },
  ) {
    super();
  }
}
