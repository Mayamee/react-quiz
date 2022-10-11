import { createContext } from 'react'
import validator from './validator'

export const ValidationContext = createContext(null)

export const Validation = ({ rules, children }) => (
  <ValidationContext.Provider
    value={(itemValue) =>
      [].concat(rules).reduce((isValid, rule) => {
        return isValid && validator(rule, itemValue)
      }, true)
    }
  >
    {children}
  </ValidationContext.Provider>
)
