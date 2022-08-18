import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_NOT_FOUND,
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
