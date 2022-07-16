import classes from "./AnswersList.module.scss";
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = (props) => (
  <ul className={classes.AnswersList}>
    {props.answers.map((answer, index) => {
      return <AnswerItem answer={answer} key={index} />;
    })}
  </ul>
);

export default AnswersList;
