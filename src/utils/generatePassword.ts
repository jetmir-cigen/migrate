export const generateRandomPassword = (length = 8): string => {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = lowercaseChars.toUpperCase();
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  let password = '';

  // At least one lowercase
  password += lowercaseChars.charAt(
    Math.floor(Math.random() * lowercaseChars.length),
  );

  // At least one uppercase
  password += uppercaseChars.charAt(
    Math.floor(Math.random() * uppercaseChars.length),
  );

  // At least one number
  password += numberChars.charAt(
    Math.floor(Math.random() * numberChars.length),
  );

  // At least one special character
  password += specialChars.charAt(
    Math.floor(Math.random() * specialChars.length),
  );

  // Fill rest of password
  for (let i = password.length; i < length; i++) {
    const charset =
      lowercaseChars + uppercaseChars + numberChars + specialChars;
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return password;
};
