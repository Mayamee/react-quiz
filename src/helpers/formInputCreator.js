export const createValidationInputField = (
  label = "Empty",
  validationRules = [],
  type = "text",
  value = ""
) => ({
  type,
  label,
  value,
  validationRules,
});
