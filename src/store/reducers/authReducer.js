import {
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_STARTED,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REGISTER_ERROR,
  AUTH_REGISTER_STARTED,
  AUTH_REGISTER_SUCCESS,
  SET_AUTH,
  SET_USER,
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
  if (action.type === SET_AUTH) {
    return {
      ...state,
      isAuthentificated: action.payload,
    };
  }
  if (action.type === SET_USER) {
    return {
      ...state,
      user: {
        id: action.payload.id,
        email: action.payload.email,
        isActivated: action.payload.activated,
      },
    };
  }
  if (action.type === AUTH_LOGOUT) {
    return {
      isAuthentificated: false,
      user: { ...state.user, id: null, email: null, isActivated: null },
      accessToken: null,
      msg: null,
    };
  }
  return state;
}
