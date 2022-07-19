import classes from "./Input.module.scss";
import { getRandomHash } from "../../../helpers/random";
const Input = (props) => {
  const inputType = props.type || "text";
  const cls = [classes.Input];
  const isInvalid = ({ valid, touched, shouldValidate }) => {
    return !valid && shouldValidate && touched;
  };

  const htmlFor = `${inputType}-${getRandomHash(5)}`;
  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(" ")}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        id={htmlFor}
        type={inputType}
        value={props.value}
        onChange={props.onChange}
      />
      {isInvalid(props) ? <span>{props.errorMessage}</span> : null}
    </div>
  );
};

export default Input;
