import React from "react";
import { createContext } from "react";
import validator from "./Validator";

export const ShareContext = createContext(null);

const Validation = ({ rules, children: item }) => (
  <ShareContext.Provider
    value={(itemValue) =>
      [].concat(rules).reduce((isValid, rule) => {
        return isValid && validator(rule, itemValue);
      }, true)
    }
  >
    {item}
  </ShareContext.Provider>
);

export default Validation;
