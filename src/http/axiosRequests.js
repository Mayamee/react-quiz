import axios from "axios";
const API_URL = "http://127.0.0.1:8080/api/quiz/";
const AUTH_URL = "http://127.0.0.1:8080/api/auth/";

export const axiosQuiz = axios.create({
  baseURL: API_URL,
});
export const $axiosAuth = axios.create({
  baseURL: AUTH_URL,
  withCredentials: true,
});

$axiosAuth.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  return config;
});
$axiosAuth.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      // чтобы избежать зацикливания при повторной попытке авторизации добавили флаг обработки
      originalRequest._retry = true;
      try {
        // если не авторизован, то пробуем получить новый accessToken
        const response = await axios.get(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        // записываем новый accessToken в localStorage
        localStorage.setItem("token", response.data.accessToken);
        console.log("Original request: ", originalRequest);
        // повторяем запрос пользователя
        return $axiosAuth.request(originalRequest);
      } catch (error) {
        // если не удалось получить новый accessToken, то перенаправляем на страницу авторизации
        console.log("Not authorized");
      }
    }
    throw error;
  }
);
