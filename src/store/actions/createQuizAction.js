import { checkObjectPropertyDeepByPath } from '../../helpers/valid'
import { QuizService } from '../../services/QuizService'
import { ADD_QUESTION_TO_QUIZ, QUIZ_CREATOR_RESET } from './actionTypes'
import { authLogout } from './authorization'
export const addQuestionToQuiz = (question) => ({
  type: ADD_QUESTION_TO_QUIZ,
  payload: question,
})
export const createQuiz = (touchInputValue, logo) => async (dispatch, getState) => {
  const state = getState().createQuiz
  const formData = new FormData()
  formData.append('title', touchInputValue || 'Мой тест')
  formData.append('body', JSON.stringify(state.quiz))
  formData.append('logo', logo)
  try {
    await QuizService.createQuiz(formData)
  } catch (error) {
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
