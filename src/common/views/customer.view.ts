import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  schema: 'view',
  name: 'view.customer',
  expression: `
    SELECT
      c.id AS id,
      c.name AS name,
      c.customer_status AS status,
      c.org_no AS orgNo,
      c.address1 AS address1,
      c.address2 AS address2,
      c.zip AS zip,
      c.city AS city,
      c.billing_address1 AS billingAddress1,
      c.billing_address2 AS billingAddress2,
      c.billing_zip AS billingZip,
      c.billing_city AS billingCity,
      c.locale AS locale,
      c.whitelabel_id AS whitelabelId,
      wl.name AS whitelabelName,
      ch.id AS customerHeadId,
      ch.name AS customerHeadName,
      ch.corporate_customer_id AS headCustomerId,
      ch.customer_head_frame_agreement_id AS customerHeadFrameAgreementId,
      chfg.name AS customerHeadFrameAgreementName,
      ctr.currency AS currency
    FROM customer c
    JOIN customer_head ch ON c.customer_head_id = ch.id
    LEFT JOIN customer_head_frame_agreement chfg ON ch.customer_head_frame_agreement_id = chfg.id
    JOIN whitelabel wl ON c.whitelabel_id = wl.id
    JOIN country ctr ON c.country_id = ctr.id
  `,
})
export class ViewCustomerEntity {
  @ViewColumn()
  id: number;

  @ViewColumn()
  name: string;

  @ViewColumn()
  status: string;

  @ViewColumn()
  orgNo: string;

  @ViewColumn()
  address1: string;

  @ViewColumn()
  address2: string;

  @ViewColumn()
  zip: string;

  @ViewColumn()
  city: string;

  @ViewColumn()
  billingAddress1: string;

  @ViewColumn()
  billingAddress2: string;

  @ViewColumn()
  billingZip: string;

  @ViewColumn()
  billingCity: string;

  @ViewColumn()
  locale: string;

  @ViewColumn()
  whitelabelId: number;

  @ViewColumn()
  whitelabelName: string;

  @ViewColumn()
  customerHeadId: number;

  @ViewColumn()
  customerHeadName: string;

  @ViewColumn()
  headCustomerId: number;

  @ViewColumn()
  customerHeadFrameAgreementId: number;

  @ViewColumn()
  customerHeadFrameAgreementName: string;

  @ViewColumn()
  currency: string;
}
