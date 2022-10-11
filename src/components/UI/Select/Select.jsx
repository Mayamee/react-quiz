import classes from './Select.module.scss'
import { getRandomHash } from '../../../helpers/random'
const Select = ({ label, value, options, onChange }) => {
  const htmlFor = `${label}-${getRandomHash(5)}`
  return (
    <div className={classes.Select}>
      <label htmlFor={htmlFor}>{label}</label>
      <select id={htmlFor} value={value} onChange={onChange}>
        {options.map((option, index) => {
          return (
            <option key={option.value + index} value={option.value}>
              {option.text}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Select
