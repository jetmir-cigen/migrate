import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({ name: 'view.invoice_row' })
export class InvoiceRowViewEntity {
  @ViewColumn()
  id: number;

  @ViewColumn()
  amount: number;

  @ViewColumn({ name: 'salary_deduction_amount' })
  salaryDeductionAmount: number;

  @ViewColumn()
  quantity: number;

  @ViewColumn({ name: 'from_period' })
  fromPeriod: string;

  @ViewColumn({ name: 'to_period' })
  toPeriod: string;

  @ViewColumn({ name: 'peak_volume' })
  peakVolume: number;

  @ViewColumn({ name: 'off_peak_volume' })
  offPeakVolume: number;

  @ViewColumn()
  text: string;

  @ViewColumn({ name: 'product_id' })
  productId: number;

  @ViewColumn({ name: 'product_name' })
  productName: string;

  @ViewColumn({ name: 'price_type' })
  priceType: string;

  @ViewColumn({ name: 'product_group_id' })
  productGroupId: number;

  @ViewColumn({ name: 'product_group_name' })
  productGroupName: string;

  @ViewColumn({ name: 'product_category_id' })
  productCategoryId: number;

  @ViewColumn({ name: 'product_category_name' })
  productCategoryName: string;

  @ViewColumn({ name: 'cost_object_id' })
  costObjectId: number;

  @ViewColumn({ name: 'cost_object_name' })
  costObjectName: string;

  @ViewColumn({ name: 'cost_object_type' })
  costObjectType: string;

  @ViewColumn()
  date: Date;

  @ViewColumn({ name: 'vendor_id' })
  vendorId: number;

  @ViewColumn({ name: 'department_id' })
  departmentId: number;

  @ViewColumn({ name: 'customer_id' })
  customerId: number;

  @ViewColumn({ name: 'customer_name' })
  customerName: string;

  @ViewColumn({ name: 'customer_head_id' })
  customerHeadId: number;

  @ViewColumn({ name: 'customer_head_name' })
  customerHeadName: string;

  @ViewColumn({ name: 'customer_head_frame_agreement_id' })
  customerHeadFrameAgreementId: number;

  @ViewColumn({ name: 'customer_head_frame_agreement_name' })
  customerHeadFrameAgreementName: string;
}
