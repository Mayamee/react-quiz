import AuthService from '../../services/AuthService'
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
} from './actionTypes'

export const authLogin = (email, password) => async (dispatch) => {
  try {
    dispatch(authLoginStarted())
    const res = await AuthService.login(email, password)
    const { data } = res
    localStorage.setItem('token', data.accessToken)
    dispatch(authLoginSuccess(data.accessToken))
    dispatch(setUser(data))
    dispatch(setAuth(true))
  } catch (error) {
    if (error.code === 'ERR_BAD_REQUEST') {
      dispatch(authLoginError(error.response.data.message))
    } else if (error.code === 'ERR_NETWORK') {
      dispatch(authLoginError('Network is unreachable'))
    }
  }
}
export const authRegister = (email, username, password) => async (dispatch) => {
  try {
    dispatch(authRegisterStarted())
    const res = await AuthService.register(email, username, password)
    const { data } = res
    localStorage.setItem('token', data.accessToken)
    dispatch(authRegisterSuccess(data.accessToken))
    dispatch(setUser(data))
    dispatch(setAuth(true))
  } catch (error) {
    if (error.code === 'ERR_BAD_REQUEST') {
      dispatch(authRegisterError(error.response.data.message))
    } else if (error.code === 'ERR_NETWORK') {
      dispatch(authRegisterError('Network is unreachable'))
    }
  }
}
export const authLogout = () => async (dispatch) => {
  try {
    await AuthService.logout()
    localStorage.removeItem('token')
    dispatch(authLogoutState())
  } catch (error) {
    console.error(error)
  }
}
export const authLogoutState = () => ({
  type: AUTH_LOGOUT,
})

//TODO make axios auth instanses {login, passwd}

export const authLoginStarted = () => ({
  type: AUTH_LOGIN_STARTED,
})

export const authLoginSuccess = (responseData) => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: responseData,
})

export const authLoginError = (msg) => ({
  type: AUTH_LOGIN_ERROR,
  payload: msg,
})

export const authRegisterStarted = () => ({
  type: AUTH_REGISTER_STARTED,
})

export const authRegisterSuccess = (responseData) => ({
  type: AUTH_REGISTER_SUCCESS,
  payload: responseData,
})

export const authRegisterError = (msg) => ({
  type: AUTH_REGISTER_ERROR,
  payload: msg,
})

export const authCheck = () => async (dispatch) => {
  //TODO setLoading <==
  console.log('cheching auth')
  try {
    const res = await AuthService.checkAuth()
    const { data } = res
    localStorage.setItem('token', data.accessToken)
    dispatch(setUser(data))
    dispatch(setAuth(true))
  } catch (error) {
    if (error.isRefreshFailed) {
      dispatch(authLogout())
    }
    console.log(error)
  }
  // finally {
  //TODO setLoading <==
  // }
}

export const setAuth = (isAuth) => ({
  type: SET_AUTH,
  payload: isAuth,
})
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
})
