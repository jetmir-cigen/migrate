import { generateRandomCode } from './generateRandomCode';

export const generateRandomPassword = (length = 8): string =>
  generateRandomCode(length);
