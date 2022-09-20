import { $api } from "../http/axiosRequests";

export default class AuthService {
  static login(email, password) {
    return $api.post("auth/login", {
      email,
      password,
    });
  }
  static register(email, username, password) {
    return $api.post("auth/registration", { email, username, password });
  }
  static logout() {
    return $api.get("auth/logout");
  }
  static checkAuth() {
    return $api.get("auth/refresh");
  }
}
