export interface ISendNotification {
  sender: string;
  emails?: string[];
  numbers?: INumber[];
  message: string;
  subject?: string;
  type: string;
  code: string;
  isPrivate?: boolean;
  response?: string;
  userId: number;
  customerId: number;
}

export interface INumber {
  countryId: number;
  number: string;
}

export interface ISendBulkNotification {
  sender: string;
  type: string;
  code: string;
  isPrivate?: boolean;
  userId: number;
  receivers: {
    number?: INumber;
    email?: string;
    text: string;
    subject?: string;
    customerId: number;
  }[];
  response?: string;
}
