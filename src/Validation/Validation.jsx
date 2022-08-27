import React from "react";
import { createContext } from "react";
import validator from "./Validator";

export const ValidationContext = createContext(null);

const Validation = ({ rules, children }) => (
  <ValidationContext.Provider
    value={(itemValue) =>
      [].concat(rules).reduce((isValid, rule) => {
        return isValid && validator(rule, itemValue);
      }, true)
    }
  >
    {children}
  </ValidationContext.Provider>
);

export default Validation;
