// types for table 'user'
export interface SqlTableUser {
  id: number | null;
  usergroup_id: number;
  customer_id: number | null;
  username: string | null;
  password: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  reset_token: string | null;
  reset_timeout: Date | null;
  invoice_account_id: number | null;
  seller: number;
  salesboss: number;
  country_id: number;
  locale: string | null;
  inactive: number;
  email_cc: string | null;
  email_bcc: string | null;
  adminsecretcode: string | null;
  has_frame_agreement_access: number | null;
}

// types for query 'find_users'
export type SqlQueryFindUsersInput = null;
export interface SqlQueryFindUsersOutput {
  id: SqlTableUser['id'];
  username: SqlTableUser['username'];
}
