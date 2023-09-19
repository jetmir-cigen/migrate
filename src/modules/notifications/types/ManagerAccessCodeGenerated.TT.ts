import { BaseTextTemplate } from './Base.TT';

export class ManagerAccessCodeGeneratedTextTemplate extends BaseTextTemplate {
  public static readonly code = 'MANAGER_ACCESS_CODE_GENERATED';

  constructor(
    public text: {
      accessCode: string;
      durationMinutes: string;
      phoneNumber: string;
    },
  ) {
    super('SMS');
  }
}
