import { $api } from "../http/axiosRequests";

export class QuizService {
  static getQuizes() {
    return $api.get("quiz");
  }
  static getQuizById(id) {
    return $api.get(`quiz/${id}`);
  }
  static createQuiz(payload) {
    return $api.post("quiz", payload);
  }
  static getMyQuizes() {
    return $api.get("quiz/my");
  }
  static deleteQuizById(id) {
    return $api.delete(`quiz/${id}`);
  }
}
