type Options = {
  useUpperCaseChar?: boolean;
  useNumbers?: boolean;
  useSpecialChar?: boolean;
};

export const generateRandomCode = (
  length = 8,
  options: Options = {
    useNumbers: true,
    useSpecialChar: true,
    useUpperCaseChar: true,
  },
): string => {
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
  if (options.useUpperCaseChar) {
    password += uppercaseChars.charAt(
      Math.floor(Math.random() * uppercaseChars.length),
    );
  }

  // At least one number
  if (options.useNumbers) {
    password += numberChars.charAt(
      Math.floor(Math.random() * numberChars.length),
    );
  }

  // At least one special character
  if (options.useSpecialChar) {
    password += specialChars.charAt(
      Math.floor(Math.random() * specialChars.length),
    );
  }

  // Fill rest of password
  for (let i = password.length; i < length; i++) {
    const charset = lowercaseChars + uppercaseChars + numberChars;
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return password;
};
