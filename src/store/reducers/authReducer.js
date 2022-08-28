import {
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_STARTED,
  AUTH_LOGIN_SUCCESS,
  AUTH_REGISTER_ERROR,
  AUTH_REGISTER_STARTED,
  AUTH_REGISTER_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  isAuthentificated: false,
  user: {
    id: null,
    email: null,
    isActivated: null,
  },
  accessToken: null,
  msg: null,
};

export function authReducer(state = initialState, action) {
  if (action.type === AUTH_LOGIN_STARTED) {
    return { ...state, msg: "Login Started" };
  }
  if (action.type === AUTH_LOGIN_SUCCESS) {
    return {
      ...state,
      isAuthentificated: true,
      user: {
        id: action.payload.id,
        email: action.payload.email,
        isActivated: action.payload.activated,
      },
      accessToken: action.payload.accessToken,
      msg: "Login Success",
    };
  }
  if (action.type === AUTH_LOGIN_ERROR) {
    return {
      ...state,
      msg: `${action.payload}`,
    };
  }
  if (action.type === AUTH_REGISTER_STARTED) {
    return { ...state, msg: "Register Started" };
  }
  if (action.type === AUTH_REGISTER_SUCCESS) {
    return {
      ...state,
      isAuthentificated: true,
      user: {
        id: action.payload.id,
        email: action.payload.email,
        isActivated: action.payload.activated,
      },
      accessToken: action.payload.accessToken,
      msg: "Register Success",
    };
  }
  if (action.type === AUTH_REGISTER_ERROR) {
    return {
      ...state,
      msg: `${action.payload}`,
    };
  }
  return state;
}
