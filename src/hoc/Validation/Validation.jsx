import React from "react";
import validator from "./Validator";

const Validation = ({ rules, children: item }) => {
  return React.cloneElement(item, {
    validate: (itemValue) =>
      [].concat(rules).reduce((isValid, rule) => {
        return isValid && validator(rule, itemValue);
      }, true),
  });
};

export default Validation;
