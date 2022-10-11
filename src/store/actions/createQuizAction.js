import { checkObjectPropertyDeepByPath } from '../../helpers/valid'
import { QuizService } from '../../services/QuizService'
import { ADD_QUESTION_TO_QUIZ, QUIZ_CREATOR_RESET } from './actionTypes'
import { authLogout } from './authorization'
import { getRandomHash } from '../../helpers/random'
export const addQuestionToQuiz = (question) => ({
  type: ADD_QUESTION_TO_QUIZ,
  payload: question,
})
export const createQuiz = (touchInputValue) => async (dispatch, getState) => {
  const state = getState().createQuiz
  const {
    user: { id, email },
  } = getState().auth
  const payload = {
    title: touchInputValue || 'Мой тест',
    body: state.quiz,
  }
  try {
    const ownerInfo = { userId: id, name: email }
    const payloadBackend = { ...payload, ownerInfo }
    await QuizService.createQuiz(payloadBackend)
  } catch (error) {
    console.log(error)
    if (error.isRefreshFailed) {
      dispatch(authLogout())
    }
    if (checkObjectPropertyDeepByPath(error, ['response', 'data', 'status'])) {
      console.log(error.response.data.status)
    } else {
      console.log(error)
    }
  } finally {
    dispatch(resetQuiz())
  }
}

export const resetQuiz = () => ({
  type: QUIZ_CREATOR_RESET,
})
