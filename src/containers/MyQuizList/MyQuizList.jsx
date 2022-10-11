import { useEffect } from 'react'
import { connect } from 'react-redux'
import Nodata from '../../components/Nodata/Nodata'
import { clearQuizes, fetchQuizEnd, fetchQuizes } from '../../store/actions/quizActions'
import PageContainer from '../../components/UI/styled/PageContainer/PageContainer'
import QuizItemsList from '../../components/QuizItemsList/QuizItemsList'
import ThreeLinesLoader from '../../components/UI/ThreeLinesLoader/ThreeLinesLoader'

const MyQuizList = ({ quizes, isLoading, user, isAuth, fetchQuizes, stopLoad, clearQuizes }) => {
  useEffect(() => {
    if (isAuth) {
      fetchQuizes()
    } else {
      stopLoad()
    }
    return clearQuizes
  }, [isAuth])

  if (isLoading) {
    return (
      <PageContainer
        id="app-page-container"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ThreeLinesLoader />
      </PageContainer>
    )
  }
  if (quizes.length === 0) {
    return (
      <PageContainer
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Nodata iconColor="#000" isShowButton={false} />
      </PageContainer>
    )
  }

  return (
    <PageContainer id="app-page-container" sx={{ padding: 3 }}>
      <QuizItemsList isAuth={isAuth} user={user} quizes={quizes} />
    </PageContainer>
  )
}

const mapStateToProps = (state) => {
  return {
    quizes: state.quiz.quizes,
    isLoading: state.quiz.isLoading,
    user: state.auth.user,
    isAuth: state.auth.isAuthentificated,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizes: () => dispatch(fetchQuizes({ self: true })),
    stopLoad: () => dispatch(fetchQuizEnd()),
    clearQuizes: () => dispatch(clearQuizes()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyQuizList)
