import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({ schema: 'view', name: 'view.customer' })
export class CustomerViewEntity {
  @ViewColumn({ name: 'id' })
  id: number;

  @ViewColumn({ name: 'name' })
  name: string;

  @ViewColumn({ name: 'status' })
  status: string;

  @ViewColumn({ name: 'org_no' })
  orgNo: string;

  @ViewColumn({ name: 'address1' })
  address1: string;

  @ViewColumn({ name: 'address2' })
  address2: string;

  @ViewColumn({ name: 'zip' })
  zip: string;

  @ViewColumn({ name: 'city' })
  city: string;

  @ViewColumn({ name: 'billing_address1' })
  billingAddress1: string;

  @ViewColumn({ name: 'billing_address2' })
  billingAddress2: string;

  @ViewColumn({ name: 'billing_zip' })
  billingZip: string;

  @ViewColumn({ name: 'billing_city' })
  billingCity: string;

  @ViewColumn({ name: 'locale' })
  locale: string;

  @ViewColumn({ name: 'whitelabel_id' })
  whitelabelId: number;

  @ViewColumn({ name: 'whitelabel_name' })
  whitelabelName: string;

  @ViewColumn({ name: 'customer_head_id' })
  customerHeadId: number;

  @ViewColumn({ name: 'customer_head_name' })
  customerHeadName: string;

  @ViewColumn({ name: 'head_customer_id' })
  headCustomerId: number;

  @ViewColumn({ name: 'customer_head_frame_agreement_id' })
  customerHeadFrameAgreementId: number;

  @ViewColumn({ name: 'customer_head_frame_agreement_name' })
  customerHeadFrameAgreementName: string;

  @ViewColumn({ name: 'currency' })
  currency: string;
}
