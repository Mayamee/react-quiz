import classes from "./ActiveQuiz.module.scss";
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = ({
  answerNumber,
  question,
  quizLength,
  state,
  answers,
  onAnswerClick,
}) => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>{answerNumber}.</strong>
          &nbsp;{question}
        </span>
        <small>
          {answerNumber} из {quizLength}
        </small>
      </p>
      <AnswersList
        state={state}
        answers={answers}
        onAnswerClick={onAnswerClick}
      />
    </div>
  );
};

export default ActiveQuiz;
