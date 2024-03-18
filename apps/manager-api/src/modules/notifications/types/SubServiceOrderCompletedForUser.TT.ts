import { BaseTextTemplate } from './Base.TT';

export class SubServiceOrderCompletedForUserTextTemplate extends BaseTextTemplate {
  public static readonly code = 'SUB_SERVICE_ORDER_COMPLETED_FOR_USER';

  constructor(
    public text: {
      serviceName: string;
    },
  ) {
    super();
  }
}
