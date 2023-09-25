import { BaseTextTemplate } from './Base.TT';

export class ResaleListingNewOrderTextTemplate extends BaseTextTemplate {
  public static readonly code = 'RESALE_LISTING_NEW_ORDER';

  constructor(
    public subject: {
      userName: string;
    },
    public text: {
      userName: string;
      productName: string;
      price: string;
      employeeNo: string;
      userPhoneNumber: string;
      userEmail: string;
    },
  ) {
    super();
  }
}
