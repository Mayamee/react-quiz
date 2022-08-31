import { $api } from "../http/axiosRequests";

export default class AuthService {
  static login(email, password) {
    return $api.post("auth/login", {
      email,
      password,
    });
  }
  static register(email, password) {
    return $api.post("auth/registration", { email, password });
  }
  static logout() {
    return $api.get("auth/logout");
  }
  static checkAuth() {
    return $api.get("auth/refresh");
  }
}
