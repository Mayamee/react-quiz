import { checkObjectPropertyDeepByPath } from "../../helpers/valid";
import { axiosQuiz } from "../../http/axiosRequests";
import { ADD_QUESTION_TO_QUIZ, QUIZ_CREATOR_RESET } from "./actionTypes";

export const addQuestionToQuiz = (question) => ({
  type: ADD_QUESTION_TO_QUIZ,
  payload: question,
});
export const createQuiz = (touchInputValue) => async (dispatch, getState) => {
  const state = getState().createQuiz;
  const payload = {
    title: touchInputValue || "Мой тест",
    body: state.quiz,
  };
  const reqOptions = {
    method: "POST",
    data: payload,
  };
  try {
    await axiosQuiz.request(reqOptions);
  } catch (error) {
    if (checkObjectPropertyDeepByPath(error, ["response", "data", "status"])) {
      console.log(error.response.data.status);
    } else {
      console.log(error);
    }
  } finally {
    dispatch(resetQuiz());
  }
};

export const resetQuiz = () => ({
  type: QUIZ_CREATOR_RESET,
});
