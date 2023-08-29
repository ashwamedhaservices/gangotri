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

// Pan card validation 

export const isValidPanNumber = (value) => {
  return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
      .test(value);
}

export const panNumberValidation = (value) =>{
  if(!isValidPanNumber(value)){
    return 'Enter valid pan card number';
  }
  return '';
}

// Account Number validation
export const isValidAccountNo = (value) => {
  return /^[0-9]{9,18}/.test(value);
}

export const accountNoValidation = (value) => {
  if (value.isEmpty) {
    return 'Please Enter Account Number';
  } if (!isValidAccountNo(value)) {
    return 'Please Enter Valid Account Number';
  }
  return '';
}

// IFSC Validation
export const isValidIfsc = (value) => {
  return /^[A-Z]{4}0[A-Z0-9]{6}/.test(value);
}

export const ifscValidation = (value) => {
  if (value.isEmpty) {
    return 'Please Enter IFSC';
  }  if (!isValidIfsc(value)) {
    return 'Please Enter valid IFSC';
  }
  return '';
}