import classes from "./FinishedQuiz.module.scss";

const FinishedQuiz = (props) => {
  const countResults = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === "success") {
      total++;
    }
    return total;
  }, 0);
  console.log(props.results);
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          console.log(quizItem);
          const cls = [
            "fa",
            props.results[quizItem.id] === "success" ? "fa-check" : "fa-times",
            classes[props.results[quizItem.id]],
          ];
          return (
            <li key={index}>
              <strong>{index + 1}</strong>.&nbsp;
              {quizItem.question}
              <i className={cls.join(" ")} />
            </li>
          );
        })}
      </ul>
      <p>
        Правильно {countResults} из {props.quiz.length}
      </p>
      <div>
        <button onClick={props.onRetry}>Повторить</button>
      </div>
    </div>
  );
};
export default FinishedQuiz;
