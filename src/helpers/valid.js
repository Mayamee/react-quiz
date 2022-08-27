export const checkObjectPropertyDeepByPath = (obj, path) => {
  if (path.length === 0) {
    return true;
  }
  const [key, ...rest] = path;
  if (typeof obj[key] === "undefined") {
    return false;
  }
  return checkObjectPropertyDeepByPath(obj[key], rest);
};

export const validateFormFields = (formFields = []) =>
  formFields.reduce((isValid, field) => isValid && field.isValid, true);
