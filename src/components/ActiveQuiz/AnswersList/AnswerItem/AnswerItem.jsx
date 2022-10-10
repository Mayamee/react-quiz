import { ListItem } from "@mui/material";
import classes from "./AnswerItem.module.scss";

const AnswerItem = ({ answer, state, onAnswerClick }) => {
  const classesOfAnswer = [classes.AnswerItem];
  if (state) {
    classesOfAnswer.push(classes[state]);
  }
  return (
    <ListItem
      className={classesOfAnswer.join(" ")}
      onClick={onAnswerClick.bind(null, answer.id)}
    >
      {answer.text}
    </ListItem>
  );
};
export default AnswerItem;
