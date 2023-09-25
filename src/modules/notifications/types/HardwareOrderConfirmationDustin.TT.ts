import { BaseTextTemplate } from './Base.TT';

export class HardwareOrderConfirmationDustinTextTemplate extends BaseTextTemplate {
  public static readonly code = 'HARDWARE_ORDER_CONFIRMATION_DUSTIN';

  constructor(
    public text: {
      userName: string;
    },
  ) {
    super();
  }
}
