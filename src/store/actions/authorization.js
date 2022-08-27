import AuthService from "../../services/AuthService";

export const authLogin = (email, password) => async (dispatch) => {
  const res = await AuthService.login(email, password);
};
export const authRegister = (email, password) => async (dispatch) => {
  const res = AuthService.register(email, password);
};
export const authLogout = () => async (dispatch) => {
  const res = AuthService.logout();
};
//TODO make axios auth instanses {login, passwd}
