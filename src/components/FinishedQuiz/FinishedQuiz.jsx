import classes from "./FinishedQuiz.module.scss";

const FinishedQuiz = () => (
  <div className={classes.FinishedQuiz}>
    <ul>
      <li>
        <strong>1.</strong>
        &nbsp;Какой тип данных объекта в JavaScript?
        <i className={"fa fa-times " + classes.error} />
      </li>

      <li>
        <strong>2.</strong>
        &nbsp;Какой тип данных объекта в JavaScript?
        <i className={"fa fa-check " + classes.success} />
      </li>
      <p>Правильно 4 из 10</p>
      <div>
        <button>Повторить</button>
      </div>
    </ul>
  </div>
);

export default FinishedQuiz;
