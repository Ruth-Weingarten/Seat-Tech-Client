import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
let onUnauthorized = () => { };
export const setUnauthorized = (func: () => void) => {
  onUnauthorized = func;
}
api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
  },
  function (error) {

    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  function (response) {

    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      if (!error.config?.url?.includes('login')) {
        localStorage.removeItem('token')
        onUnauthorized();
      }
    }
    return Promise.reject(error);
  }
);
