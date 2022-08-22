import { ADD_QUESTION_TO_QUIZ } from "../actions/actionTypes";

const initialState = {
  quiz: [],
};

export function createQuizReducer(state = initialState, action) {
  if (action.type === ADD_QUESTION_TO_QUIZ) {
    return {
      ...state,
      quiz: [...state.quiz, action.payload],
    };
  }
  return state;
}
