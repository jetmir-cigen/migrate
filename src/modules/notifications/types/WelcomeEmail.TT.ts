import { BaseTextTemplate } from './Base.TT';

export class WelcomeEmailTextTemplate extends BaseTextTemplate {
  public static readonly code = 'WELCOME_EMAIL';

  constructor(
    public text: {
      username: string;
    },
  ) {
    super('EMAIL');
  }
}
