import classes from "./Button.module.scss";

const Button = ({ btnType, onClick, disabled, children }) => {
  const cls = [classes.Button, classes[btnType]];
  return (
    <button
      type="button"
      onClick={onClick}
      className={cls.join(" ")}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
