import classes from "./Input.module.scss";
import { getRandomHash } from "../../../helpers/random";
import { useContext } from "react";
import { ValidationContext } from "../../../Validation/Validation";
const Input = ({ label, type, onChange, value }) => {
  const validate = useContext(ValidationContext);
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
