import validator from "./validator";

export const validate = (rules, value) =>
  [].concat(rules).reduce((isValid, rule) => {
    return isValid && validator(rule, value);
  }, true);
