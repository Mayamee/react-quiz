import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Nodata from '../../components/Nodata/Nodata'
import ThreeLinesLoader from '../../components/UI/ThreeLinesLoader/ThreeLinesLoader'
import PageContainer from '../../components/UI/styled/PageContainer/PageContainer'
import { connect } from 'react-redux'
import { fetchQuizById, quizAnswerClick, resetQuiz } from '../../store/actions/quizActions'
import { Box } from '@mui/material'

const Quiz = ({
  isAuth,
  results,
  isQuizFinished,
  activeQuestion,
  answerState,
  quiz,
  title,
  isLoading,
  fetchQuizById,
  quizAnswerClick,
  resetQuiz,
}) => {
  const params = useParams()
  useEffect(() => {
    const { id } = params
    fetchQuizById(id)
    return resetQuiz
  }, [isAuth])

  const getQuiz = () => {
    if (isQuizFinished) {
      return <FinishedQuiz results={results} quiz={quiz} onRetry={resetQuiz} />
    }
    if (!quiz) {
      return <Nodata />
    }
    if (quiz.length === 0) {
      return <Nodata />
    }

    return (
      <ActiveQuiz
        answers={quiz[activeQuestion].answers}
        question={quiz[activeQuestion].question}
        onAnswerClick={quizAnswerClick}
        quizLength={quiz.length}
        answerNumber={activeQuestion + 1}
        state={answerState}
      />
    )
  }
  return (
    <PageContainer
      id="quiz-page-wrapper"
      sx={{
        '& > div': {
          height: '100%',
        },
      }}
    >
      {isLoading && (
        <Box
          id="loader-box"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ThreeLinesLoader />
        </Box>
      )}
      {!isLoading && (
        <div className={classes.Quiz}>
          <div className={classes.QuizWrapper}>
            <h1>{title}</h1>
            {getQuiz()}
          </div>
        </div>
      )}
    </PageContainer>
  )
}
const mapStateToProps = (state) => ({
  results: state.quiz.results,
  isQuizFinished: state.quiz.isQuizFinished,
  activeQuestion: state.quiz.activeQuestion,
  answerState: state.quiz.answerState,
  quiz: state.quiz.quiz?.body,
  title: state.quiz.quiz?.title,
  isLoading: state.quiz.isLoading,
  isAuth: state.auth.isAuthentificated,
})
const mapDispatchToProps = (dispatch) => ({
  fetchQuizById: (id) => dispatch(fetchQuizById(id)),
  quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
  resetQuiz: () => dispatch(resetQuiz()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
