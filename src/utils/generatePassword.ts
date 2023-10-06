export const generateRandomPassword = (length = 8): string => {
  const characters = {
    // object of letters, numbers & symbols
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
  };
  const staticPassword = Object.values(characters).join(''); // joining all characters
  let randomPassword = '';
  const excludeDuplicate = false;

  for (let i = 0; i < length; i++) {
    // getting random character from the static password
    const randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      /**
       * if randomPassword doesn't contain the current random character or randomChar is equal
       * to space " " then add random character to randomPassword else decrement i by -1
       */
      !randomPassword.includes(randomChar) || randomChar === ' '
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }
  return randomPassword;
};
