import classes from './FinishedQuiz.module.scss'
import { Button as MuiButton, ButtonGroup } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const FinishedQuiz = (props) => {
  const navigate = useNavigate()
  const countResults = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++
    }
    return total
  }, 0)
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          const cls = [
            'fa',
            props.results[quizItem.id] === 'success' ? 'fa-check' : 'fa-times',
            classes[props.results[quizItem.id]],
          ]
          return (
            <li key={index}>
              <strong>{index + 1}</strong>.&nbsp;
              {quizItem.question}
              <i className={cls.join(' ')} />
            </li>
          )
        })}
      </ul>
      <p>
        Правильно {countResults} из {props.quiz.length}
      </p>
      <ButtonGroup>
        <MuiButton variant="contained" onClick={props.onRetry}>
          Повторить
        </MuiButton>

        <MuiButton variant="contained" onClick={() => navigate('/')}>
          Перейти в список тестов
        </MuiButton>
      </ButtonGroup>
    </div>
  )
}
export default FinishedQuiz
