import axios from "axios";

const API_URL = "http://127.0.0.1:8080/api/quiz/";

export default axios.create({
  baseURL: API_URL,
});
