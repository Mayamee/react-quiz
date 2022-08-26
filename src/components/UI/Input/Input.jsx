import classes from "./Input.module.scss";
import { getRandomHash } from "../../../helpers/random";
const Input = ({ label, type, onChange, value, validate }) => {
  const inputType = type || "text";
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${getRandomHash(5)}`;
  return (
    <div className={cls.join(" ")}>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        id={htmlFor}
        type={inputType}
        value={value}
        onChange={(event) =>
          onChange(event.target.value, validate(event.target.value))
        }
      />
    </div>
  );
};

export default Input;
