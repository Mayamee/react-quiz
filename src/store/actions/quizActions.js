import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_NOT_FOUND,
  FETCH_QUIZ_END,
  FETCH_QUIZ_SUCCESS,
} from "./actionTypes";
import { axiosQuiz } from "../../http/axiosRequests";

export const fetchQuizes = () => async (dispatch) => {
  dispatch(fetchQuizesStart());
  const reqOptions = {
    method: "GET",
  };
  try {
    const response = await axiosQuiz.request(reqOptions);
    if (response.data.data.length === 0) {
      return dispatch(fetchQuizesNotFound());
    }
    const quizes = response.data.data.map((question, index) => {
      return {
        id: question.id,
        name: question.title,
      };
    });
    dispatch(fetchQuizesSuccess(quizes));
  } catch (error) {
    dispatch(fetchQuizesError(error));
  }
};

export const fetchQuizesStart = () => {
  return {
    type: FETCH_QUIZES_START,
  };
};
export const fetchQuizesSuccess = (quizes) => {
  return {
    type: FETCH_QUIZES_SUCCESS,
    payload: quizes,
  };
};

export const fetchQuizesError = (error) => {
  console.error(error);
  return {
    type: FETCH_QUIZES_ERROR,
    payload: error,
  };
};
export const fetchQuizesNotFound = () => {
  return {
    type: FETCH_QUIZES_NOT_FOUND,
  };
};

export const fetchQuizById = (id) => async (dispatch) => {
  dispatch(fetchQuizesStart());
  if (!id) return dispatch(fetchQuizEnd());
  const reqOptions = {
    url: `${id}`,
    method: "GET",
  };
  try {
    const response = await axiosQuiz.request(reqOptions);
    if (response.data.data.length === 0) {
      console.info("No data");
      return dispatch(fetchQuizesNotFound());
    }
    const quiz = response.data.data.body;
    // this.setState({ quiz, isLoading: false });
    dispatch(fetchQuizSuccess(quiz));
  } catch (error) {
    dispatch(fetchQuizEnd());
  }
};

export const fetchQuizEnd = () => ({
  type: FETCH_QUIZ_END,
});
export const fetchQuizSuccess = (quiz) => ({
  type: FETCH_QUIZ_SUCCESS,
  payload: quiz,
});
