import { axiosAuth } from "../http/axiosRequests";

export default class AuthService {
  static login(email, password) {
    return axiosAuth.post("/registration", {
      email,
      password,
    });
  }
  static register(email, password) {
    return axiosAuth.post("/registration", {
      email,
      password,
    });
  }
  static logout() {
    return axiosAuth.get("/logout");
  }
}
