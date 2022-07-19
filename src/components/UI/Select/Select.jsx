import classes from "./Select.module.scss";
import { getRandomHash } from "../../../helpers/random";
const Select = (props) => {
  const htmlFor = `${props.label}-${getRandomHash(5)}`;
  return (
    <div className={classes.Select}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <select id={htmlFor} value={props.value} onChange={props.onChange}>
        {props.options.map((option, index) => {
          return (
            <option key={option.value + index} value={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
