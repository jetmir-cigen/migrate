import { BaseTextTemplate } from './Base.TT';

export class CostObjectAwarenessSmsWithDeadlineTextTemplate extends BaseTextTemplate {
  public static readonly code = 'COST_OBJECT_AWARENESS_SMS_WITH_DEADLINE';

  constructor(
    public text: {
      link: string;
      amount: string;
      deadline: string;
    },
  ) {
    super('SMS');
  }
}
