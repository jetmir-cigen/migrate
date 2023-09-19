import { BaseTextTemplate } from './Base.TT';

export class EcomPolicyOrderManagerApprovalNeededTextTemplate extends BaseTextTemplate {
  public static readonly code = 'ECOM_POLICY_ORDER_MANAGER_APPROVAL_NEEDED';

  constructor(
    public text: {
      userName: string;
      employeeName: string;
      url: string;
    },
  ) {
    super('SMS');
  }
}
