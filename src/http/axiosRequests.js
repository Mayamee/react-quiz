import axios from "axios";
const API_URL = "http://127.0.0.1:8080/api/quiz/";
const AUTH_URL = "http://127.0.0.1:8080/api/auth/";

export const axiosQuiz= axios.create({
  baseURL: API_URL,
});

export const axiosAuth = axios.create({
  baseURL: AUTH_URL,
});

function retryAxiosWrapper(AxiosInstance, { retryCount = 0, retryDelay = 0 }) {
  AxiosInstance.retryCount = retryCount;
  AxiosInstance.retryDelay = retryDelay;
  AxiosInstance.interceptors.response.use(
    (response) => {
      AxiosInstance.retryCount = 0;
      return response;
    },
    async (error) => {
      const { config, code } = error;
      if (code === "ERR_NETWORK" && AxiosInstance.retryCount > 0) {
        await new Promise((resolve) =>
          setTimeout(resolve, AxiosInstance.retryDelay)
        );
        AxiosInstance.retryCount--;
        return AxiosInstance(config);
      }
      AxiosInstance.retryCount = 0;
      return Promise.reject(error);
    }
  );
  return AxiosInstance;
}
