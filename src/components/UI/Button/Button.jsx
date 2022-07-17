import classes from "./Button.module.scss";

const Button = (props) => {
  const cls = [classes.Button, classes[props.btnType]];
  return (
    <button
      onClick={props.onClick}
      className={cls.join(" ")}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
