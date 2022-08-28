import axios from "axios";
const API_URL = "http://127.0.0.1:8080/api/quiz/";
const AUTH_URL = "http://127.0.0.1:8080/api/auth/";

export const axiosQuiz = axios.create({
  baseURL: API_URL,
});
//TODO ??? withCreds
export const $axiosAuth = axios.create({
  baseURL: AUTH_URL,
  withCredentials: true,
});
