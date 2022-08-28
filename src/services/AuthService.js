import { $axiosAuth } from "../http/axiosRequests";

export default class AuthService {
  static login(email, password) {
    return $axiosAuth.post(
      "/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
  }
  static register(email, password) {
    return $axiosAuth.post(
      "/registration",
      { email, password },
      {
        withCredentials: true,
      }
    );
  }
  static logout() {
    return $axiosAuth.get("/logout");
  }
  static checkAuth() {
    return $axiosAuth.get("/refresh", {
      withCredentials: true,
    });
  }
}
//TODO разобраться с COOKIES
//TODO код не рабочий
