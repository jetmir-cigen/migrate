import { BaseTextTemplate } from './Base.TT';

export class CostObjectAwarenessSmsNoDeadlineTextTemplate extends BaseTextTemplate {
  public static readonly code = 'COST_OBJECT_AWARENESS_SMS_NO_DEADLINE';

  constructor(
    public text: {
      link: string;
      amount: string;
    },
  ) {
    super();
  }
}
