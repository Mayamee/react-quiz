import AnswerItem from "./AnswerItem/AnswerItem";
import { List } from "@mui/material";

const AnswersList = (props) => {
  return (
    <List>
      {props.answers.map((answer, index) => {
        return (
          <AnswerItem
            answer={answer}
            state={props.state ? props.state[answer.id] : null}
            key={index}
            onAnswerClick={props.onAnswerClick}
          />
        );
      })}
    </List>
  );
};

export default AnswersList;
