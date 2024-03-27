export * from './accounting-report.query';
export * from './consumption-report.query';
export * from './get-setup-export-settings.query';
export * from './new-number-orders.query';
export * from './off-boarding-report.query';
export * from './report-group-by-employee-no.query';
export * from './report-group-by-order.query';
export * from './salary-deduction-usage-report.query';
export * from './tax-advantage-report.query';

export type QueryFilter = {
  customerId: number;
  customerHeadId: number;
  fromDate: string;
  toDate: string;
  isGlobal?: boolean;
};
