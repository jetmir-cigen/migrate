import { BaseTextTemplate } from './Base.TT';

export class DealerAccessCodeGeneratedTextTemplate extends BaseTextTemplate {
  public static readonly code = 'DEALER_ACCESS_CODE_GENERATED';

  constructor(
    public text: {
      accessCode: string;
      durationMinutes: string;
      phoneNumber: string;
    },
  ) {
    super();
  }
}
