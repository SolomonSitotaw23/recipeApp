export const validatePass = (value) => {
  if (!value) {
    return "pleas fill your password";
  }
  if (value.length < 6) {
    return "password must be more than 6 characters";
  }
  return true;
};
export const validateEmail = (value) => {
  if (!value) {
    return "pleas fill your email";
  }
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return "please fill a valid email";
  }
  return true;
};
export const validateName = (value) => {
  if (!value) {
    return "pleas fill your name";
  }
  if (value.length < 4) {
    return "your name is too short";
  }
  return true;
};
export const validateConfirmPass = (value) => {
  if (!value) {
    return "pleas fill your password again";
  }

  return true;
};
