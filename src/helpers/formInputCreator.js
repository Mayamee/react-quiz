export const createValidationInputField = (
  label = "Empty",
  validationRules = [],
  type = "text",
  value = "",
  isValid = false,
  touched = false
) => ({
  type,
  label,
  value,
  validationRules,
  isValid,
  touched,
});
