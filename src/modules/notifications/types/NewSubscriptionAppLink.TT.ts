import { BaseTextTemplate } from './Base.TT';

export class NewSubscriptionAppLinkTextTemplate extends BaseTextTemplate {
  public static readonly code = 'NEW_SUBSCRIPTION_APP_LINK';

  constructor() {
    super('SMS');
  }
}
