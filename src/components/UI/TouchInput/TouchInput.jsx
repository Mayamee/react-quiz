import classes from "./TouchInput.module.scss";

const TouchInput = ({ touchInputValue, touchInputonChangeHandler }) => {
  return (
    <div className={classes.TouchInput}>
      <textarea
        wrap="soft"
        rows={1}
        className={classes.TextArea}
        placeholder="Мой тест"
        value={touchInputValue}
        onChange={({ target }) => {
          touchInputonChangeHandler(target, target.value);
        }}
      />
    </div>
  );
};

export default TouchInput;
