import { BaseTextTemplate } from './Base.TT';

export class EcomPolicyOrderManagerApprovedTextTemplate extends BaseTextTemplate {
  public static readonly code = 'ECOM_POLICY_ORDER_MANAGER_APPROVED';

  constructor() {
    super('SMS');
  }
}
