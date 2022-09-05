import axios from "axios";
const API_URL = "http://127.0.0.1:8080/api";
const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (!token) return config;
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    let isRefreshFailed = false;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      // чтобы избежать зацикливания при повторной попытке авторизации добавили флаг обработки
      originalRequest._retry = true;
      try {
        // если не авторизован, то пробуем получить новый accessToken
        const response = await axios.get(`${API_URL}/auth/refresh`, {
          withCredentials: true,
        });
        // записываем новый accessToken в localStorage
        localStorage.setItem("token", response.data.accessToken);
        console.log("Original request: ", originalRequest);
        // повторяем запрос пользователя
        return $api.request(originalRequest);
      } catch (error) {
        // если не удалось получить новый accessToken, то перенаправляем на страницу авторизации
        console.log("Not authorized");
        console.log(error);
        if (error.code !== "ERR_NETWORK") isRefreshFailed = true;
      }
    }
    error.isRefreshFailed = isRefreshFailed;
    throw error;
  }
);
export { $api };
