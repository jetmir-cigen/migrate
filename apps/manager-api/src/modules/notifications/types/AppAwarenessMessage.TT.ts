import { BaseTextTemplate } from './Base.TT';

export class AppAwarenessMessageTextTemplate extends BaseTextTemplate {
  public static readonly code = 'APP_AWARENESS_MESSAGE';

  constructor(
    public text: {
      customerName: string;
    },
  ) {
    super();
  }
}
