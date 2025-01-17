export abstract class BaseTextTemplate {
  type: 'EMAIL' | 'SMS' | 'SYSTEM';
  static code: string;
  text: Record<string, string>;
  subject?: Record<string, string>;
}
