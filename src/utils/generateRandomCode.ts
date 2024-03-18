type Options = {
  useUpperCaseChar?: boolean;
  useNumbers?: boolean;
  useSpecialChar?: boolean;
  allCaps?: boolean;
};

export const generateRandomCode = (
  length = 8,
  options: Options = {
    useNumbers: true,
    useSpecialChar: true,
    useUpperCaseChar: true,
    allCaps: false,
  },
): string => {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = lowercaseChars.toUpperCase();
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  let charset = '';

  let password = '';

  // At least one lowercase
  if (!options.allCaps) {
    charset += lowercaseChars;
    password += lowercaseChars.charAt(
      Math.floor(Math.random() * lowercaseChars.length),
    );
  }

  // At least one uppercase
  if (options.useUpperCaseChar) {
    charset += uppercaseChars;
    password += uppercaseChars.charAt(
      Math.floor(Math.random() * uppercaseChars.length),
    );
  }

  // At least one number
  if (options.useNumbers) {
    charset += numberChars;
    password += numberChars.charAt(
      Math.floor(Math.random() * numberChars.length),
    );
  }

  // At least one special character
  if (options.useSpecialChar) {
    charset += specialChars;
    password += specialChars.charAt(
      Math.floor(Math.random() * specialChars.length),
    );
  }

  // Fill rest of password
  for (let i = password.length; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return password;
};
