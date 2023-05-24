export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export const isValidUserName = (username) => {
  const re = /^[a-zA-Z0-9._-]{3,20}$/;
  return re.test(String(username));
}

export const isValidPassword = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(String(password));
}

export const isValidMobileNumber = (mobile_number) => {
  // Examples: 9876543210, 09876543210, 919876543210
  // const re = /^(0|91)?[6-9][0-9]{9}$/;
  // Examples: 9876543210
  const re = /[6-9][0-9]{9}$/;
  return re.test(mobile_number);
}