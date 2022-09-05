import { CACHE_QUIZ } from "../actions/actionTypes";

const initialState = {
  cached: [],
};

export function cacheReducer(state = initialState, action) {
  if (action.type === CACHE_QUIZ) {
    return {
      ...state,
      cached: state.cached.concat(action.payload),
    };
  }
  return state;
}
