export function createControl(config, validation) {
  return {
    ...config,
    valid: !validation,
    touched: false,
    value: "",
    validation,
  };
}
export function validateControl(value, validation = null) {
  if (validation === null) {
    return true;
  }
  let isValid = true;
  if (validation.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (validation.email) {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isValid = pattern.test(value) && isValid;
  }
  if (validation.minLength) {
    isValid = value.length >= validation.minLength && isValid;
  }
  if (validation.maxLength) {
    isValid = value.length <= validation.maxLength && isValid;
  }
  return isValid;
}
export function validateForm(formControls) {
  let isFormValid = true;
  for (let control in formControls) {
    if (formControls.hasOwnProperty(control)) {
      isFormValid = formControls[control].valid && isFormValid;
    }
  }
  return isFormValid;
}
