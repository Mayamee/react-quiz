import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_NOT_FOUND,
  FETCH_QUIZ_END,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  QUIZ_FINISHED,
  QUIZ_NEXT_QUESTION,
  QUIZ_RESET,
  CLEAR_QUIZES,
} from "./actionTypes";
import { QuizService } from "../../services/QuizService";
import QuizDTO from "../../dtos/QuizDTO";

export const fetchQuizes =
  ({ self } = { self: false }) =>
  async (dispatch, getState) => {
    dispatch(fetchQuizesStart());
    try {
      let response;
      console.log(self);
      response = self
        ? await QuizService.getMyQuizes()
        : await QuizService.getQuizes();

      if (response.data.data.length === 0) {
        return dispatch(fetchQuizesNotFound());
      }
      const quizes = response.data.data.map(
        (question) => new QuizDTO(question)
      );
      console.log({ quizes });
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

export const getQuizFromCacheById = (id) => (dispatch, getState) => {
  const { cached } = getState().cache;
  dispatch(fetchQuizesStart());
  const quiz = cached.find((quiz) => quiz.id === id);
  if (quiz) {
    dispatch(fetchQuizSuccess(quiz));
  } else {
    dispatch(fetchQuizEnd());
  }
};

export const fetchQuizById = (id) => async (dispatch) => {
  dispatch(fetchQuizesStart());
  if (!id) return dispatch(fetchQuizEnd());
  try {
    const response = await QuizService.getQuizById(id);
    if (response.data.data.length === 0) {
      console.info("No data");
      return dispatch(fetchQuizesNotFound());
    }
    const data = response.data.data;
    const quiz = {
      title: data.title,
      body: data.body,
    };
    dispatch(fetchQuizSuccess(quiz));
  } catch (error) {
    console.log(error);
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
export const quizAnswerClick = (answerId) => {
  return (dispatch, getState) => {
    const state = getState().quiz;
    const isQuizFinished = (state) =>
      state.activeQuestion + 1 >= state.quiz?.body.length;
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === "success") {
        return;
      }
    }
    const checkNextQuestion = () => {
      const timeout = setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }
        clearTimeout(timeout);
      }, 1000);
    };
    const question = state.quiz?.body[state.activeQuestion];
    const results = state.results;
    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }
      dispatch(quizSetState({ [answerId]: "success" }, results));

      checkNextQuestion();
    } else {
      results[question.id] = "error";
      dispatch(quizSetState({ [answerId]: "error" }, results));
      checkNextQuestion();
    }
  };
};

export const quizSetState = (answerState, results) => {
  return {
    type: QUIZ_SET_STATE,
    payload: {
      answerState,
      results,
    },
  };
};
export const finishQuiz = () => ({
  type: QUIZ_FINISHED,
});
export const quizNextQuestion = (activeQuestion) => ({
  type: QUIZ_NEXT_QUESTION,
  payload: activeQuestion,
});

export const resetQuiz = () => ({
  type: QUIZ_RESET,
});

export const clearQuizes = () => ({
  type: CLEAR_QUIZES,
});
