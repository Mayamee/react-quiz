import { ADD_QUESTION_TO_QUIZ, QUIZ_CREATOR_RESET } from '../actions/actionTypes'

const initialState = {
  quiz: [],
}

export function createQuizReducer(state = initialState, action) {
  if (action.type === ADD_QUESTION_TO_QUIZ) {
    return {
      ...state,
      quiz: [...state.quiz, action.payload],
    }
  }
  if (action.type === QUIZ_CREATOR_RESET) {
    return {
      ...state,
      quiz: [],
    }
  }
  return state
}
