import axios from "axios";
import { BASE_URL } from "./api";

// ✅ Global default — applies to ALL axios calls everywhere
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "ngrok-skip-browser-warning": "true",
    },
});

// 🔐 token auto attach (optional)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;


// import axios from "axios";

// const api = axios.create({
//     baseURL: "https://maya-phonogramic-dayton.ngrok-free.dev",
//     withCredentials: true, // 🔥 IMPORTANT if backend uses cookies
// });

// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("access_token");

//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     // OPTIONAL: if backend expects role header
//     config.headers["x-user-role"] = "instructor";

//     return config;
// });

// export default api;


// import axios from "axios";

// const api = axios.create({
//     baseURL: "https://maya-phonogramic-dayton.ngrok-free.dev",
//     withCredentials: true, // 🔥 REQUIRED for cookie auth
// });

// export default api;

