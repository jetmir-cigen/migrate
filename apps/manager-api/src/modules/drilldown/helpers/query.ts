import { DrillDownServiceType } from '@skytech/manager/modules/drilldown/dto';

export const filterCondition = (period: number, year: number) =>
  period <= 0
    ? `AND YEAR(ir.date) = ${year}`
    : `AND (YEAR(ir.date) = ${year} AND MONTH(ir.date) = ${period})`;

export const getOrgFilter = (
  frameAgreementId: number,
  customerHeadId: number,
  customerId: number,
) => {
  if (frameAgreementId) {
    return ` AND c.customer_head_frame_agreement_id = ${frameAgreementId} `;
  }
  if (customerHeadId) {
    return ` AND c.customer_head_id = ${customerHeadId} `;
  }
  return ` AND c.id = ${customerId} `;
};

export const getTypes = (type: DrillDownServiceType, typeId: number) => {
  const frameAgreementId =
    type === DrillDownServiceType.FRAME_AGREEMENT ? typeId : null;
  const customerHeadId =
    type === DrillDownServiceType.CUSTOMER_HEAD ? typeId : null;
  const customerId = type === DrillDownServiceType.CUSTOMER ? typeId : null;
  return { frameAgreementId, customerHeadId, customerId };
};
