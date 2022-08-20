import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_NOT_FOUND,
  FETCH_QUIZ_END,
  FETCH_QUIZ_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  quizes: [],
  isLoading: true,
  error: null,
  results: {},
  isQuizFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
};
export function quizReducer(state = initialState, action) {
  if (action.type === FETCH_QUIZES_START) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === FETCH_QUIZES_SUCCESS) {
    return {
      ...state,
      quizes: action.payload,
      isLoading: false,
    };
  }
  if (action.type === FETCH_QUIZES_ERROR) {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  }
  if (action.type === FETCH_QUIZES_NOT_FOUND) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === FETCH_QUIZ_END) {
    return {
      ...state,
      isQuizFinished: true,
    };
  }
  if (action.type === FETCH_QUIZ_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      quiz: action.payload,
    };
  }
  return state;
}
