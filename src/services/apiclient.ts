// import axios, {
//     AxiosInstance,
//     AxiosRequestConfig,
//     AxiosResponse,
// } from "axios";

// const apiClient: AxiosInstance = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE_URL,
//     timeout: 10000,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// // 🔐 Request interceptor (token auto add)
// apiClient.interceptors.request.use(
//     (config: AxiosRequestConfig) => {
//         const token = localStorage.getItem("token");
//         if (token && config.headers) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// // ❌ Response interceptor (global error)
// apiClient.interceptors.response.use(
//     (response: AxiosResponse) => response.data,
//     (error) => {
//         console.error(
//             "API Error:",
//             error.response?.status,
//             error.response?.data
//         );
//         return Promise.reject(error);
//     }
// );

// export default apiClient;
