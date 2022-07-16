import classes from "./AnswerItem.module.scss";

const AnswerItem = (props) => {
  const classesOfAnswer = [classes.AnswerItem];
  if (props.state) {
    classesOfAnswer.push(classes[props.state]);
  }
  return (
    <li
      className={classesOfAnswer.join(" ")}
      onClick={() => {
        props.onAnswerClick(props.answer.id);
      }}
    >
      {props.answer.text}
    </li>
  );
};
export default AnswerItem;
