import axios from "axios";





const apiAxios = axios.create({
  baseURL: `${import.meta.env.VITE_MAIN_API_URL}`,
  withCredentials: false,
});

export default apiAxios;
