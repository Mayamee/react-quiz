import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_NOT_FOUND,
} from "../actions/actionTypes";

const initialState = {
  quizes: [],
  isLoading: true,
  error: null,
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
  return state;
}
