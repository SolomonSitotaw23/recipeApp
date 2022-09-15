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

export const validateComment = (value) => {
  if (!value) {
    return "please fill your Comment";
  }

  return true;
};

export const validateSearch = (value) => {
  if (!value) {
    return "please fill Search keyword";
  }

  return true;
};

export const validateName = (value) => {
  if (!value) {
    return "please fill your name";
  }
  if (value.length < 4) {
    return "your name is too short";
  }
  return true;
};

export const validateConfirmPass = (value) => {
  if (!value) {
    return "please fill your password again";
  }

  return true;
};

export const validateTitle = (value) => {
  if (!value) {
    return "please fill recipe Title";
  }
  if (value.length < 3) {
    return "title is too short";
  }
  return true;
};

export const validateDescription = (value) => {
  if (!value) {
    return "please fill Description";
  }
  if (value.length < 10) {
    return "Description is too short";
  }
  return true;
};

export const validateTimeItTakes = (value) => {
  if (!value) {
    return "please fill time it takes to cook";
  }
  const regex = /^[0-9]?\d:[0-5]\d$/;

  if (!regex.test(value)) {
    return "please fill valid minute in minutes:seconds format eg. 03:40 ";
  }
  if (value.length > 5) {
    return "no food takes this much minute is it for your grand children";
  }

  return true;
};
